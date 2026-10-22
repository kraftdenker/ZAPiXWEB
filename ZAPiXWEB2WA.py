#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ZAPiXWEB2WA.py — ZAPiXWEB export → Android WhatsApp layout converter.

Receives a ZAPiXWEB .zip export (produced by SPIZAPiXWEB.js in the browser
console of WhatsApp Web) plus its .sha512.txt hash file and produces:

  <out>/msgstore.db   — Android message database (msgstore.db layout)
  <out>/wa.db         — Android contacts database (wa.db layout, wa_contacts)
  <out>/Media/...     — decrypted media in the modern Android WhatsApp
                        directory structure:
                          Media/WhatsApp Images/
                          Media/WhatsApp Video/
                          Media/WhatsApp Audio/
                          Media/WhatsApp Voice Notes/
                          Media/WhatsApp Animated Gifs/
                          Media/WhatsApp Documents/
                          Media/WhatsApp Stickers/
  <out>/raw/          — the zip's original files, extracted untouched
                        (userAccount.json, contacts.json, chats.json,
                         Chat <jid>.json, album_metadata_*.json,
                         Attachment ... media files, FAILED_*.json, ...)

Usage:
  python3 ZAPiXWEB2WA.py ZAPiXWEB_<user>.zip [output_dir]

  The hash file must sit next to the zip and be named
  ZAPiXWEB_<user>.sha512.txt (the exact name the browser script writes).
  Its format is:  <hex sha512> ?SHA512*<zip filename>

Dependencies: Python 3.8+ and pycryptodome (pip install pycryptodome).
Only the standard library is used otherwise.
"""

import base64
import hashlib
import json
import os
import re
import shutil
import sqlite3
import sys
import zipfile

from Crypto.Cipher import AES
from Crypto.Protocol.KDF import HKDF

APP_VERSION = "ZAPiXWEB2WA 1.0"

# WhatsApp Web message type word → Android msgstore.db message_type value.
MTYPE = {
    "chat": 0, "image": 1, "ptt": 2, "audio": 2, "video": 3, "vcard": 4,
    "location": 5, "gp2": 7, "e2e_notification": 7, "notification": 7,
    "notification_template": 7, "protocol": 7, "document": 9, "sticker": 20,
    "live_location": 16, "gif": 13, "revoked": 15, "poll_creation": 66,
    "poll": 66, "poll_vote": 46, "call_log": 90, "status": 116,
    "template": 45, "interactive": 45, "ciphertext": 0, "unknown": 0,
    "rich_response": 0,
}

JID_TYPE = {
    "s.whatsapp.net": 0, "g.us": 1, "lid": 18,
    "newsletter": 21, "bot": 26, "broadcast": 0,
}

# HKDF-SHA256 "info" strings (must match the browser's WACryptoHkdf exactly).
INFO_BY_TYPE = {
    "image": b"WhatsApp Image Keys",
    "sticker": b"WhatsApp Image Keys",
    "video": b"WhatsApp Video Keys",
    "gif": b"WhatsApp Video Keys",
    "audio": b"WhatsApp Audio Keys",
    "ptt": b"WhatsApp Audio Keys",
    "document": b"WhatsApp Document Keys",
}
INFO_BY_PREFIX = [("image/", b"WhatsApp Image Keys"),
                  ("video/", b"WhatsApp Video Keys"),
                  ("audio/", b"WhatsApp Audio Keys")]
INFO_DEFAULT = b"WhatsApp Document Keys"

EXT = {
    "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp",
    "image/gif": "gif", "image/bmp": "bmp", "image/tiff": "tiff",
    "video/mp4": "mp4", "video/3gpp": "3gp", "video/quicktime": "mov",
    "video/webm": "webm", "video/x-msvideo": "avi",
    "audio/ogg": "ogg", "audio/mpeg": "mp3", "audio/mp4": "m4a",
    "audio/aac": "aac", "audio/amr": "amr", "audio/wav": "wav",
    "audio/opus": "opus", "audio/webm": "weba",
    "application/pdf": "pdf", "text/plain": "txt", "application/zip": "zip",
    "text/markdown": "md", "text/html": "html", "text/csv": "csv",
    "application/json": "json", "text/x-vcard": "vcf",
    "application/msword": "doc",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation": "pptx",
}

MEDIA_DIRS = {
    "image": "WhatsApp Images",
    "sticker": "WhatsApp Stickers",
    "video": "WhatsApp Video",
    "gif": "WhatsApp Video",
    "audio": "WhatsApp Audio",
    "ptt": "WhatsApp Voice Notes",
    "document": "WhatsApp Documents",
}

MEDIA_PREFIX = {
    "image": "IMG", "sticker": "IMG", "video": "VID", "gif": "VID",
    "audio": "AUD", "ptt": "PTT", "document": "DOC",
}

MSGSTORE_SCHEMA = """
CREATE TABLE jid(_id INTEGER PRIMARY KEY, user TEXT, server TEXT, agent INTEGER DEFAULT 0, device INTEGER DEFAULT 0, type INTEGER DEFAULT 0, raw_string TEXT);
CREATE TABLE jid_map(jid_row_id INTEGER, lid_row_id INTEGER);
CREATE TABLE chat(_id INTEGER PRIMARY KEY, jid_row_id INTEGER, subject TEXT, created_timestamp INTEGER, sort_timestamp INTEGER, display_message_row_id INTEGER, archived INTEGER DEFAULT 0, account_jid_row_id INTEGER, participation_status INTEGER);
CREATE TABLE message(_id INTEGER PRIMARY KEY, chat_row_id INTEGER, from_me INTEGER, key_id TEXT, sender_jid_row_id INTEGER, timestamp INTEGER, received_timestamp INTEGER, message_type INTEGER, text_data TEXT, status INTEGER, sort_id INTEGER, starred INTEGER DEFAULT 0, broadcast INTEGER DEFAULT 0, source TEXT DEFAULT 'cache');
CREATE TABLE message_media(_id INTEGER PRIMARY KEY, message_row_id INTEGER, chat_row_id INTEGER, file_path TEXT, file_size INTEGER, file_length INTEGER, mime_type TEXT, width INTEGER, height INTEGER, media_duration INTEGER, direct_path TEXT, file_hash TEXT, enc_file_hash TEXT, original_file_hash TEXT, media_key BLOB, media_key_timestamp INTEGER, message_url TEXT, media_caption TEXT, media_name TEXT);
CREATE TABLE message_thumbnail(message_row_id INTEGER, thumbnail BLOB);
CREATE TABLE message_album(message_row_id INTEGER, image_count INTEGER, video_count INTEGER, expected_image_count INTEGER, expected_video_count INTEGER);
CREATE TABLE message_association(child_message_row_id INTEGER, parent_message_row_id INTEGER, association_type INTEGER);
CREATE TABLE message_quoted(message_row_id INTEGER, key_id TEXT, text_data TEXT, message_type INTEGER, parent_message_chat_row_id INTEGER, chat_row_id INTEGER);
CREATE TABLE message_mentions(_id INTEGER PRIMARY KEY, message_row_id INTEGER, jid_row_id INTEGER);
CREATE TABLE message_add_on(_id INTEGER PRIMARY KEY, parent_message_row_id INTEGER, sender_jid_row_id INTEGER, from_me INTEGER, timestamp INTEGER, message_add_on_type INTEGER);
CREATE TABLE message_add_on_reaction(message_add_on_row_id INTEGER, reaction TEXT);
CREATE TABLE message_poll(message_row_id INTEGER, selectable_options_count INTEGER, poll_type INTEGER, end_time INTEGER, hide_participant_names INTEGER, allow_add_option INTEGER, correct_option_id INTEGER);
CREATE TABLE message_poll_option(_id INTEGER PRIMARY KEY, message_row_id INTEGER, option_name TEXT, option_hash TEXT, vote_total INTEGER);
CREATE TABLE message_text(message_row_id INTEGER, description TEXT, page_title TEXT, url TEXT);
CREATE TABLE message_location(message_row_id INTEGER, chat_row_id INTEGER, latitude REAL, longitude REAL, place_name TEXT, place_address TEXT, url TEXT, live_location_share_duration INTEGER);
CREATE TABLE message_event(message_row_id INTEGER, is_canceled INTEGER, name TEXT, description TEXT, location_latitude REAL, location_longitude REAL, location_name TEXT, location_address TEXT, join_link TEXT, start_time INTEGER, chat_row_id INTEGER, end_time INTEGER);
CREATE TABLE message_add_on_poll_vote(message_add_on_row_id INTEGER, sender_timestamp INTEGER);
CREATE TABLE receipt_user(message_row_id INTEGER, receipt_user_jid_row_id INTEGER, receipt_timestamp INTEGER, read_timestamp INTEGER, played_timestamp INTEGER);
CREATE TABLE message_link(_id INTEGER PRIMARY KEY, message_row_id INTEGER, link_index INTEGER);
CREATE TABLE message_add_on_pin_in_chat(message_add_on_row_id INTEGER, sender_timestamp INTEGER, expiry_duration_in_secs INTEGER, pin_in_chat_state INTEGER);
CREATE TABLE call_log(_id INTEGER PRIMARY KEY, jid_row_id INTEGER, from_me INTEGER, timestamp INTEGER, video_call INTEGER, duration INTEGER, call_result INTEGER, bytes_transferred INTEGER, call_id TEXT, is_joinable_group_call INTEGER DEFAULT 0, group_jid_row_id INTEGER DEFAULT 0, call_type INTEGER DEFAULT 0, call_creator_device_jid_row_id INTEGER DEFAULT 0);
CREATE TABLE group_participant_user(_id INTEGER PRIMARY KEY, group_jid_row_id INTEGER, user_jid_row_id INTEGER, rank INTEGER, pending INTEGER DEFAULT 0, add_timestamp INTEGER);
CREATE TABLE group_past_participant_user(_id INTEGER PRIMARY KEY, group_jid_row_id INTEGER, user_jid_row_id INTEGER, is_leave INTEGER, timestamp INTEGER);
CREATE TABLE wawf_album_metadata(_id INTEGER PRIMARY KEY AUTOINCREMENT, chat_row_id INTEGER, album_header_msg_id INTEGER, album_json TEXT);
"""

WADB_SCHEMA = """
CREATE TABLE wa_contacts(_id INTEGER PRIMARY KEY AUTOINCREMENT, jid TEXT UNIQUE, display_name TEXT, wa_name TEXT, given_name TEXT, family_name TEXT, status TEXT, number TEXT, is_whatsapp_user INTEGER DEFAULT 1);
CREATE TABLE wa_chats(_id INTEGER PRIMARY KEY AUTOINCREMENT, jid TEXT, name TEXT, created_timestamp INTEGER, sort_timestamp INTEGER, last_read_timestamp INTEGER, unread_count INTEGER, archived INTEGER DEFAULT 0, pinned INTEGER DEFAULT 0);
"""


def _die(msg, code=1):
    print(f"[!] {msg}", file=sys.stderr)
    sys.exit(code)


def _warn(msg):
    print(f"[i] {msg}", file=sys.stderr)


# --------------------------------------------------------------------------
# Step 1 — integrity (SHA-512) verification
# --------------------------------------------------------------------------

def find_hash_file(zip_path):
    base = os.path.basename(zip_path)
    cand = os.path.join(os.path.dirname(zip_path), base + ".sha512.txt")
    if os.path.isfile(cand):
        return cand
    d = os.path.dirname(zip_path)
    try:
        for name in os.listdir(d):
            if name.endswith(".sha512.txt") and name.startswith("ZAPiXWEB_"):
                return os.path.join(d, name)
    except OSError:
        pass
    return None


def verify_integrity(zip_path):
    """Verify the zip against its SHA-512 hash file.

    Returns (actual_hex, expected_hex, hash_file_path).
    Exits on mismatch (the export may have been tampered with).
    """
    hfile = find_hash_file(zip_path)
    if not hfile:
        _die(f"Hash file not found next to {zip_path}. "
             "Expected a ZAPiXWEB_*.sha512.txt file in the same folder.")

    with open(hfile, "r", encoding="utf-8", errors="replace") as f:
        content = f.read().strip()

    # Format produced by SPIZAPiXWEB.js:  "<hex> ?SHA512*ZAPiXWEB_<user>.zip"
    m = re.match(r"^\s*([0-9a-fA-F]{128})\s*(?:\?SHA512\*\s*(\S+))?", content)
    if not m:
        _die(f"Hash file {hfile} does not contain a 128-hex-char SHA-512 digest.")
    expected = m.group(1).lower()
    named_zip = m.group(2)

    actual = hashlib.sha512(open(zip_path, "rb").read()).hexdigest()
    if actual != expected:
        _die(
            "INTEGRITY CHECK FAILED\n"
            f"    expected: {expected}\n"
            f"    actual:   {actual}\n"
            "The ZIP file does not match the recorded hash. It may have been "
            "modified after extraction. Aborting."
        )
    if named_zip and named_zip != os.path.basename(zip_path):
        _warn(f"Hash file names '{named_zip}' but the file given is "
              f"'{os.path.basename(zip_path)}' (hash still matches).")
    return actual, expected, hfile


# --------------------------------------------------------------------------
# Step 2 — unzip
# --------------------------------------------------------------------------

def extract_zip(zip_path, raw_dir):
    os.makedirs(raw_dir, exist_ok=True)
    names = []
    with zipfile.ZipFile(zip_path) as zf:
        bad = zf.testzip()
        if bad is not None:
            _die(f"Corrupt entry in zip: {bad}")
        for info in zf.infolist():
            if info.is_dir():
                continue
            target = os.path.join(raw_dir, os.path.basename(info.filename))
            with zf.open(info) as src, open(target, "wb") as dst:
                dst.write(src.read())
            names.append(os.path.basename(info.filename))
    return names


# --------------------------------------------------------------------------
# Small helpers
# --------------------------------------------------------------------------

def load_json_file(path):
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except (OSError, ValueError) as e:
        _warn(f"Could not read {os.path.basename(path)}: {e}")
        return None


def norm_jid(jid):
    """Normalize a jid to its phone-number form when it is known to be a phone.

    `@lid` jids are kept as-is (they are a distinct addressing form); a numeric
    user part under a phone server is normalized to `@s.whatsapp.net`."""
    if not jid or not isinstance(jid, str):
        return None
    jid = jid.strip()
    if "@" not in jid:
        return jid
    user, srv = jid.rsplit("@", 1)
    if user.isdigit() and srv in ("s.whatsapp.net", "whatsapp.net"):
        # a numeric user under a phone server is the phone jid
        return f"{user}@s.whatsapp.net"
    return jid


def sanitize(name):
    name = re.sub(r'[<>:"/\\|?*\x00-\x1f]', "_", str(name)).strip()
    return name[:150] or "unknown"


def mime_ext(mime):
    if not mime:
        return "bin"
    mime = mime.split(";")[0].strip().lower()
    if mime in EXT:
        return EXT[mime]
    parts = mime.split("/")
    return parts[-1].replace("+", "")[:8] or "bin"


def media_dir_for(mtype, mime):
    t = (mtype or "").lower()
    if t in MEDIA_DIRS:
        return MEDIA_DIRS[t]
    mime = (mime or "").lower()
    if mime.startswith("image/"):
        return "WhatsApp Images"
    if mime.startswith("video/"):
        return "WhatsApp Video"
    if mime.startswith("audio/"):
        return "WhatsApp Voice Notes" if t == "ptt" else "WhatsApp Audio"
    return "WhatsApp Documents"


# --------------------------------------------------------------------------
# Media crypto (WhatsApp Web scheme: HKDF-SHA256(salt=32×0) → AES-CBC,
# 10-byte HMAC trailer)
# --------------------------------------------------------------------------

def hkdf_expand_salt32(media_key, info, length=112):
    prk = hashlib.sha256(b"\x00" * 32 + media_key).digest()
    t = okm = b""
    i = 1
    while len(okm) < length:
        t = hashlib.sha256(t + info + bytes([i])).digest()
        okm += t
        i += 1
    return okm[:length]


def info_string(mtype, mime):
    t = (mtype or "").lower()
    if t in INFO_BY_TYPE:
        return INFO_BY_TYPE[t]
    m = (mime or "").lower()
    for pre, inf in INFO_BY_PREFIX:
        if m.startswith(pre):
            return inf
    return INFO_DEFAULT


def decrypt_media(ciphertext, media_key_b64, mtype, mime):
    """Return (plaintext, sha256_hex, size) or None on any failure."""
    try:
        key = base64.b64decode(media_key_b64)
    except Exception:
        return None
    if not ciphertext or len(ciphertext) <= 10 or not key:
        return None
    exp = hkdf_expand_salt32(key, info_string(mtype, mime), 112)
    iv, cipher_key = exp[:16], exp[16:48]
    body = ciphertext[:-10]
    if len(body) % 16:
        return None
    try:
        pt = AES.new(cipher_key, AES.MODE_CBC, iv).decrypt(body)
    except Exception:
        return None
    if not pt:
        return None
    pad = pt[-1]
    if 1 <= pad <= 16:
        pt = pt[:-pad]
    return pt, hashlib.sha256(pt).hexdigest(), len(pt)


def pad_block(data, block=16):
    """PKCS7 padding (same as the browser side)."""
    padlen = block - (len(data) % block)
    return data + bytes([padlen]) * padlen


# --------------------------------------------------------------------------
# Converter
# --------------------------------------------------------------------------

class Converter:
    def __init__(self, raw_dir, out_dir):
        self.raw = raw_dir
        self.out = out_dir
        self.media_root = os.path.join(out_dir, "Media")
        self.stats = dict(messages=0, media_written=0, media_failed=0,
                          media_missing=0, chats=0, contacts=0, jids=0,
                          jid_maps=0,
                          quotes=0, mentions=0, albums=0, vcards=0, avatars=0)
        self._mention_seq = 0
        self._jid_id = {}
        self._jid_written = set()
        self.phone_name = {}
        self.lid_name = {}
        self.lid_of_phone = {}
        self.chat_name = {}
        self.is_group = {}
        self.attachments = {}
        self.chat_row = {}
        self.owner = None
        self.user_account = None
        self.contacts = []
        self.chats_meta = []
        self._mid_by_full = {}

    # ---- jids ----
    def jid_id(self, raw):
        if not raw:
            return 0
        if raw not in self._jid_id:
            self._jid_id[raw] = len(self._jid_id) + 1
        return self._jid_id[raw]

    def _flush_jids(self, db):
        for raw, rid in list(self._jid_id.items()):
            if rid in self._jid_written:
                continue
            user, srv = (raw.rsplit("@", 1) + [""])[:2] if "@" in raw else (raw, "")
            if "@" not in raw:
                user, srv = raw, ""
            else:
                user, srv = raw.rsplit("@", 1)
            dev = 0
            if ":" in user:
                u, dd = user.split(":", 1)
                user = u
                dev = int(dd) if dd.isdigit() else 0
            ty = JID_TYPE.get(srv, 0)
            if dev > 0:
                ty = 17 if srv == "s.whatsapp.net" else (19 if srv == "lid" else ty)
            db.execute(
                "INSERT INTO jid(_id,user,server,agent,device,type,raw_string) "
                "VALUES(?,?,?,?,?,?,?)", (rid, user, srv, 0, dev, ty, raw))
            self._jid_written.add(rid)
        self.stats["jids"] = len(self._jid_id)

    def _jid_row(self, raw):
        """Return the row id for a jid registered in memory, or None."""
        if not raw:
            return None
        return self._jid_id.get(raw)

    # ---- load ----
    def load(self):
        self.user_account = load_json_file(os.path.join(self.raw, "userAccount.json"))
        self.contacts = load_json_file(os.path.join(self.raw, "contacts.json")) or []
        self.chats_meta = load_json_file(os.path.join(self.raw, "chats.json")) or []

        if self.user_account and isinstance(self.user_account, dict):
            self.owner = norm_jid(self.user_account.get("id"))

        for c in self.contacts:
            if not isinstance(c, dict):
                continue
            i = c.get("id")
            p = c.get("phoneNumber")
            name = c.get("formattedName") or c.get("pushname") or c.get("name")
            # remember the lid -> phone pairing before collapsing to the phone
            if i and i.endswith("@lid") and p:
                self.lid_of_phone.setdefault(p, i)
            if i and i.endswith("@lid") and p:
                i = p
            if i:
                if i.endswith("@lid"):
                    self.lid_name[i] = name
                else:
                    self.phone_name[i] = name
            if p:
                self.phone_name.setdefault(p, name)

        for ch in self.chats_meta:
            if not isinstance(ch, dict):
                continue
            raw = ch.get("id")
            if not raw:
                continue
            self.is_group[raw] = bool(ch.get("isGroup"))
            if ch.get("isGroup") and isinstance(ch.get("groupMetadata"), dict):
                self.chat_name[raw] = ch["groupMetadata"].get("subject")
            elif not ch.get("isGroup"):
                self.chat_name[raw] = ch.get("formattedTitle")
            elif isinstance(ch.get("contact"), dict):
                self.chat_name[raw] = ch["contact"].get("formattedName")

        # Attachment files are named by the *serialized* message id
        # (`Attachment <fromMe>_<chat>_<hash>[_<sender>].<ext>`), which is the
        # `id.$1` of the message.  A `.embedded.` variant is an already-decrypted
        # preview.  Key the map by that serialized id.
        for name in os.listdir(self.raw):
            if name.startswith("Attachment "):
                body = name[len("Attachment "):]
                if ".embedded." in body:
                    ser, _ext = body.split(".embedded.", 1)
                    embedded = True
                else:
                    ser, _dot, _ext = body.rpartition(".")
                    embedded = False
                if ser:
                    self.attachments[ser] = (os.path.join(self.raw, name), embedded)
            elif name.startswith("FAILED_"):
                _warn(f"Media download failure recorded: {name}")

    # ---- names ----
    def display_name(self, jid_raw):
        if not jid_raw:
            return None
        n = norm_jid(jid_raw)
        for cand in dict.fromkeys((n, jid_raw)):
            if cand in self.phone_name and self.phone_name[cand]:
                return self.phone_name[cand]
            if cand in self.lid_name and self.lid_name[cand]:
                return self.lid_name[cand]
        # a sender known only by LID: resolve to the phone name via jid_map data
        if n and n.endswith("@lid"):
            for phone, lid in self.lid_of_phone.items():
                if lid == n and self.phone_name.get(phone):
                    return self.phone_name[phone]
        if jid_raw in self.chat_name and self.chat_name[jid_raw]:
            return self.chat_name[jid_raw]
        return None

    def chat_subject(self, chat_raw):
        if not self.is_group.get(chat_raw):
            return None
        return self.chat_name.get(chat_raw)

    # ---- media ----
    _seq = [0]

    def place_media(self, mtype, mime, data, msg_id, file_name=None):
        subdir = media_dir_for(mtype, mime)
        prefix = MEDIA_PREFIX.get((mtype or "").lower(), "FILE")
        ext = None
        if file_name and "." in file_name:
            cand = file_name.rsplit(".", 1)[-1].strip()
            if cand and cand.lower() != "embedded" and len(cand) <= 10:
                ext = cand
        if not ext:
            ext = mime_ext(mime)
        self._seq[0] += 1
        ts = self._seq[0]
        fname = f"{prefix}-{ts:013d}-WA{msg_id:04d}.{ext}"
        target_dir = os.path.join(self.media_root, subdir)
        os.makedirs(target_dir, exist_ok=True)
        target = os.path.join(target_dir, fname)
        n = 1
        while os.path.exists(target):
            stem, dot, e = target.rpartition(".")
            target = os.path.join(target_dir, f"{stem}_{n}.{e}")
            n += 1
        with open(target, "wb") as f:
            f.write(data)
        return os.path.relpath(target, self.out).replace(os.sep, "/")

    # ---- run ----
    def run(self):
        self.load()

        chat_msgs = {}
        for name in os.listdir(self.raw):
            m = re.match(r"^Chat (.+)\.json$", name)
            if m:
                chat_msgs[m.group(1)] = name

        albums = {}
        for name in os.listdir(self.raw):
            if name.startswith("album_metadata_"):
                data = load_json_file(os.path.join(self.raw, name))
                if isinstance(data, dict):
                    for k, v in data.items():
                        if isinstance(v, dict):
                            albums[k] = v

        if not chat_msgs:
            _die("No chat data found in the export (no 'Chat <jid>.json' files).")

        for raw in chat_msgs:
            self.is_group.setdefault(raw, raw.endswith("@g.us"))
            if raw not in self.chat_name:
                self.chat_name[raw] = self.display_name(raw) or raw

        # collect all message records first (needed for album parent links)
        # record = (chat_raw, mid, msg, fid, ser_id, t)
        #   fid     -> raw message id (dict in the real export, str in fixtures)
        #   ser_id  -> serialized id `id.$1`, the key used for Attachment files
        records = []
        mid = 0
        for raw in sorted(chat_msgs):
            data = load_json_file(os.path.join(self.raw, chat_msgs[raw]))
            if not isinstance(data, list):
                continue
            for msg in data:
                if not isinstance(msg, dict):
                    continue
                mid += 1
                fid = msg.get("id")
                ser_id = None
                if isinstance(fid, dict):
                    ser_id = fid.get("$1") or fid.get("id")
                elif isinstance(fid, str):
                    ser_id = fid
                t = msg.get("t")
                try:
                    t = int(t) if t is not None else None
                except (TypeError, ValueError):
                    t = None
                if t is not None and t < 10**12:
                    t *= 1000  # ZAPiXWEB stores epoch seconds; Android uses ms
                records.append((raw, mid, msg, fid, ser_id, t))

        self._mid_by_full = {}
        for raw, mid, msg, fid, ser_id, t in records:
            if ser_id:
                self._mid_by_full[ser_id] = mid

        os.makedirs(self.out, exist_ok=True)
        msgstore_path = os.path.join(self.out, "msgstore.db")
        wadb_path = os.path.join(self.out, "wa.db")
        for p in (msgstore_path, wadb_path):
            if os.path.exists(p):
                os.remove(p)

        db = sqlite3.connect(msgstore_path)
        db.executescript(MSGSTORE_SCHEMA)

        # ---------------- chats ----------------
        all_chats = sorted(set(list(chat_msgs) + [c.get("id") for c in self.chats_meta
                                                  if isinstance(c, dict) and c.get("id")]))
        for raw in all_chats:
            self.chat_row[raw] = len(self.chat_row) + 1
            db.execute(
                "INSERT INTO chat(_id,jid_row_id,subject,archived,"
                "account_jid_row_id) VALUES(?,?,?,?,?)",
                (self.chat_row[raw], self.jid_id(raw),
                 self.chat_subject(raw), 0, self.jid_id(self.owner) if self.owner else 0))
        self.stats["chats"] = len(self.chat_row)

        # ---------------- messages ----------------
        chat_last_ts = {}
        for raw, mid, msg, fid, ser_id, t in records:
            mtype = (msg.get("type") or "chat").lower()

            # fromMe: explicit flag (dict id) or "true_" prefix (string id)
            from_me = 0
            if isinstance(fid, dict):
                from_me = 1 if fid.get("fromMe") else 0
            elif isinstance(fid, str):
                from_me = 1 if fid.startswith("true_") else 0

            # sender: the id object carries `participant` (group) / `remote`;
            # fall back to the legacy top-level `author` / `from` fields.
            sender_raw = None
            if not from_me:
                if isinstance(fid, dict):
                    sender_raw = fid.get("participant") or fid.get("remote")
                sender_raw = (msg.get("author") or msg.get("from")) or sender_raw
            else:
                sender_raw = (self.owner or msg.get("from")) if raw.endswith("@g.us") \
                    else (self.owner or msg.get("from"))

            sender_row = self.jid_id(norm_jid(sender_raw)) if sender_raw else 0

            body = msg.get("body")
            text = body if mtype in ("chat", "vcard") and body else None

            # quoted
            quoted = None
            qm = msg.get("quotedMsgObj")
            if isinstance(qm, dict) and qm:
                qid = qm.get("id")
                if isinstance(qid, dict):
                    qid = qid.get("_serialized") or qid.get("id")
                if qid or qm.get("body"):
                    quoted = (mid, qid, qm.get("body"),
                              MTYPE.get((qm.get("type") or "chat").lower(), 0),
                              self.chat_row.get(raw, 0))

            # mentions
            mentions = []
            for mj in (msg.get("mentionedJidList") or []):
                if isinstance(mj, dict):
                    mj = mj.get("_serialized")
                if isinstance(mj, str) and mj:
                    mentions.append(mj)

            # media — the real ZAPiXWEB export stores these at the TOP level of
            # the message (mediaKey, mimetype, filehash, encFilehash, size,
            # staticUrl, caption, duration); a fixture may nest them in mediaData.
            mdata = msg.get("mediaData") or {}

            def _g(field, top=None):
                v = mdata.get(field)
                if v is None:
                    v = top if top is not None else msg.get(field)
                return v

            has_media = mtype in ("image", "sticker", "video", "ptt", "audio",
                                  "document") and (mdata.get("mediaKey")
                                                   or msg.get("mediaKey"))
            media = None
            if has_media:
                media = {
                    "type": mtype,
                    "mime": _g("mimetype"),
                    "media_key": _g("mediaKey"),
                    "file_hash": _g("fileSha256", msg.get("filehash")),
                    "enc_file_hash": _g("encFileSha256", msg.get("encFilehash")),
                    "width": _g("width"),
                    "height": _g("height"),
                    "duration": _g("duration"),
                    "url": _g("url", msg.get("staticUrl")),
                    "size": _g("size"),
                    "caption": msg.get("caption") or body,
                    "file_name": _g("fileName"),
                    "ser_id": ser_id,
                }

            key_id = ser_id if ser_id else \
                (fid.get("_serialized") if isinstance(fid, dict) else fid)

            db.execute(
                "INSERT INTO message(_id,chat_row_id,from_me,key_id,"
                "sender_jid_row_id,timestamp,received_timestamp,message_type,"
                "text_data,status,sort_id,starred,broadcast,source) "
                "VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                (mid, self.chat_row.get(raw, 0), from_me, key_id, sender_row,
                 t, t, MTYPE.get(mtype, 0), text, 0, mid, 0,
                 1 if raw.endswith("@broadcast") else 0, "zapixweb"))

            if quoted:
                db.execute(
                    "INSERT INTO message_quoted(message_row_id,key_id,text_data,"
                    "message_type,chat_row_id) VALUES(?,?,?,?,?)", quoted)
                self.stats["quotes"] += 1
            for mj in mentions:
                self._mention_seq += 1
                db.execute(
                    "INSERT INTO message_mentions(_id,message_row_id,jid_row_id) "
                    "VALUES(?,?,?)", (self._mention_seq, mid, self.jid_id(mj)))
            self.stats["mentions"] += len(mentions)
            if text:
                for li, _u in enumerate(re.findall(r"https?://\S+", text)):
                    db.execute("INSERT INTO message_link(_id,message_row_id,"
                               "link_index) VALUES(?,?,?)", (mid * 100 + li, mid, li))

            if media:
                self._write_media_row(db, mid, raw, media)

            # parent (album / HD copy) association
            parent = msg.get("parentMsgKey")
            if isinstance(parent, dict):
                parent = parent.get("_serialized") or parent.get("id")
            if parent and isinstance(parent, str) and parent in self._mid_by_full:
                db.execute(
                    "INSERT INTO message_association(child_message_row_id,"
                    "parent_message_row_id,association_type) VALUES(?,?,?)",
                    (mid, self._mid_by_full[parent], 0))
                self.stats["albums"] += 1

            # album header → children
            if msg.get("isAlbum") and isinstance(fid, str):
                children = (albums.get(fid) or {}).get("childMsgIds") or []
                for child in children:
                    c = self._find_mid(child, raw)
                    if c:
                        db.execute(
                            "INSERT INTO message_association(child_message_row_id,"
                            "parent_message_row_id,association_type) VALUES(?,?,?)",
                            (c, mid, 0))

            if mtype == "vcard" and body:
                self.stats["vcards"] += 1

            if t and t > chat_last_ts.get(raw, 0):
                chat_last_ts[raw] = t

        self.stats["messages"] = mid
        for raw, ts in chat_last_ts.items():
            db.execute("UPDATE chat SET sort_timestamp=? WHERE _id=?",
                       (ts, self.chat_row[raw]))

        # ---------------- jid_map (lid ↔ phone) ----------------
        # ensure both addressing forms exist as jid rows, then map them
        if self.lid_of_phone:
            for phone, lid in self.lid_of_phone.items():
                if not lid:
                    continue
                for raw in (phone, lid):
                    if raw not in self._jid_written:
                        self.jid_id(raw)
        self._flush_jids(db)
        if self.lid_of_phone:
            for phone, lid in self.lid_of_phone.items():
                if not lid:
                    continue
                prow, lrow = self._jid_row(phone), self._jid_row(lid)
                if prow and lrow:
                    db.execute(
                        "INSERT OR IGNORE INTO jid_map(jid_row_id,lid_row_id) "
                        "VALUES(?,?)", (prow, lrow))
            self.stats["jid_maps"] = db.execute(
                "SELECT COUNT(*) FROM jid_map").fetchone()[0]
        db.commit()
        db.close()

        # ---------------- wa.db ----------------
        self._write_wadb(wadb_path, chat_last_ts)

        # ---------------- avatars ----------------
        av = os.path.join(self.out, "raw", "Avatars")
        for name in os.listdir(self.raw):
            if name.startswith("Avatar ") and name.endswith(".jpg"):
                os.makedirs(av, exist_ok=True)
                shutil.copy2(os.path.join(self.raw, name),
                             os.path.join(av, os.path.basename(name)))
                self.stats["avatars"] += 1

        return self.stats

    def _find_mid(self, child_id, chat_raw):
        if child_id in self._mid_by_full:
            return self._mid_by_full[child_id]
        sid = child_id.split("@")[0] if "@" in child_id else child_id
        for full, m in self._mid_by_full.items():
            if full.endswith("_" + sid):
                return m
        return None

    # magic-byte sniffers: ZAPiXWEB stores attachments ALREADY DECRYPTED
    # (the browser script runs crypto.subtle.decrypt before zipping), so a
    # valid media file is recognised by its magic header and written through
    # as-is.  Only if the header does not look like media do we fall back to
    # HKDF/AES-CBC decryption (covers a hypothetical encrypted export).
    _MAGIC = (
        b"\xff\xd8\xff",          # JPEG
        b"\x89PNG",               # PNG
        b"RIFF",                  # WebP / OGG / WAV
        b"ftyp",                  # MP4 / MOV (offset 4)
        b"GIF8",                  # GIF
        b"%PDF",                  # PDF
        b"PK\x03\x04",            # zip/docx/xlsx
        b"OggS",                  # OGG
        b"\x1a\x45\xdf\xa3",      # Opus in Ogg
    )

    @classmethod
    def _looks_decrypted(cls, data):
        if not data:
            return False
        for mag in cls._MAGIC:
            if data.startswith(mag):
                return True
        # MP4 puts 'ftyp' at offset 4
        if len(data) > 8 and data[4:8] == b"ftyp":
            return True
        return False

    def _write_media_row(self, db, mid, chat_raw, m):
        attached = self.attachments.get(m["ser_id"]) if m.get("ser_id") else None
        data = None
        if attached:
            data = open(attached[0], "rb").read()

        file_path = None
        size = m.get("size")
        if data:
            if self._looks_decrypted(data) or attached[1]:
                # already plaintext (the normal ZAPiXWEB case) or an embedded preview
                file_path = self.place_media(m["type"], m.get("mime"), data, mid,
                                             m.get("file_name"))
                size = len(data)
                self.stats["media_written"] += 1
            else:
                # fallback: attempt real decryption (encrypted export)
                dec = decrypt_media(data, m.get("media_key"), m["type"], m.get("mime"))
                if dec is None:
                    self.stats["media_failed"] += 1
                    _warn(f"Message {mid}: media decryption failed.")
                else:
                    pt, _digest, size = dec
                    file_path = self.place_media(m["type"], m.get("mime"), pt, mid,
                                                 m.get("file_name"))
                    self.stats["media_written"] += 1
        else:
            self.stats["media_missing"] += 1

        def b64hex(v):
            if not v:
                return None
            try:
                return base64.b64decode(v).hex()
            except Exception:
                return v

        mk = None
        if m.get("media_key"):
            try:
                mk = base64.b64decode(m["media_key"])
            except Exception:
                mk = None

        db.execute(
            "INSERT INTO message_media(message_row_id,chat_row_id,file_path,"
            "file_size,file_length,mime_type,width,height,media_duration,"
            "direct_path,file_hash,enc_file_hash,media_key,message_url,"
            "media_caption,media_name) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
            (mid, self.chat_row.get(chat_raw, 0), file_path, size, size,
             m.get("mime"), m.get("width"), m.get("height"),
             int(m["duration"]) if m.get("duration") else None, m.get("url"),
             b64hex(m.get("file_hash")), b64hex(m.get("enc_file_hash")), mk,
             m.get("url"), m.get("caption"), m.get("file_name")))

    def _write_wadb(self, path, chat_last_ts):
        wa = sqlite3.connect(path)
        wa.executescript(WADB_SCHEMA)
        seen = set()
        for c in self.contacts:
            if not isinstance(c, dict):
                continue
            cid = c.get("id")
            cph = c.get("phoneNumber")
            # a LID id resolves to its phone jid, so one contact = one row
            if cid and cid.endswith("@lid") and cph:
                cid = cph
            for jraw in {cid, cph} - {None}:
                if not jraw or jraw in seen:
                    continue
                seen.add(jraw)
                num = (cph or "").split("@")[0]
                if not num and jraw.endswith("@s.whatsapp.net"):
                    num = jraw.split("@")[0]
                wa.execute(
                    "INSERT OR IGNORE INTO wa_contacts(jid,display_name,wa_name,"
                    "given_name,status,number) VALUES(?,?,?,?,?,?)",
                    (jraw, c.get("formattedName") or c.get("name"),
                     c.get("pushname"), c.get("shortName"),
                     c.get("textStatusString") or None, num))
        for jraw, nm in self.chat_name.items():
            if self.is_group.get(jraw) or not nm:
                continue
            num = jraw.split("@")[0] if jraw.endswith("@s.whatsapp.net") else ""
            wa.execute("INSERT OR IGNORE INTO wa_contacts(jid,display_name,number) "
                       "VALUES(?,?,?)", (jraw, nm, num))
            wa.execute("UPDATE wa_contacts SET display_name=? WHERE jid=? AND "
                       "(display_name IS NULL OR display_name='')", (nm, jraw))
        if self.owner:
            num = self.owner.split("@")[0] if self.owner.endswith("@s.whatsapp.net") else ""
            wa.execute("INSERT OR IGNORE INTO wa_contacts(jid,display_name,number) "
                       "VALUES(?,?,?)", (self.owner,
                                         self.display_name(self.owner) or "me", num))

        for raw, rowid in self.chat_row.items():
            wa.execute(
                "INSERT INTO wa_chats(jid,name,sort_timestamp,archived) "
                "VALUES(?,?,?,0)",
                (raw, self.chat_name.get(raw), chat_last_ts.get(raw)))
        self.stats["contacts"] = len(seen)
        wa.commit()
        wa.close()


def main(argv):
    if len(argv) < 2:
        print(__doc__)
        return 2
    zip_path = os.path.abspath(argv[1])
    out_dir = os.path.abspath(argv[2]) if len(argv) > 2 else \
        os.path.join(os.path.dirname(zip_path),
                     os.path.basename(zip_path).replace(".zip", "_android"))

    if not os.path.isfile(zip_path):
        _die(f"ZIP file not found: {zip_path}")

    print(f"== {APP_VERSION} ==")
    print(f"[1/4] Verifying integrity of {os.path.basename(zip_path)} ...")
    actual, expected, hfile = verify_integrity(zip_path)
    print(f"      SHA-512 OK: {actual[:32]}... (from {os.path.basename(hfile)})")

    print(f"[2/4] Extracting to {out_dir}/raw ...")
    raw_dir = os.path.join(out_dir, "raw")
    names = extract_zip(zip_path, raw_dir)
    print(f"      {len(names)} file(s) extracted.")

    print(f"[3/4] Building msgstore.db / wa.db / Media/ ...")
    conv = Converter(raw_dir, out_dir)
    stats = conv.run()

    print("[4/4] Done.")
    print(f"      messages  : {stats['messages']:,} "
          f"(chats {stats['chats']}, jids {stats['jids']})")
    if stats.get("jid_maps"):
        print(f"      lid↔phone : {stats['jid_maps']} mapping(s)")
    print(f"      contacts  : {stats['contacts']:,} (wa.db)")
    print(f"      media     : {stats['media_written']:,} written, "
          f"{stats['media_failed']} decryption failures, "
          f"{stats['media_missing']} missing from export")
    print(f"      quotes    : {stats['quotes']}   mentions: {stats['mentions']}   "
          f"albums: {stats['albums']}   vcards: {stats['vcards']}")
    print(f"      avatars   : {stats['avatars']}")
    print(f"      output    : {out_dir}")
    print(f"        - msgstore.db  (Android message store)")
    print(f"        - wa.db        (Android contacts store)")
    print(f"        - Media/       (Android media layout)")
    print(f"        - raw/         (original export files)")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
