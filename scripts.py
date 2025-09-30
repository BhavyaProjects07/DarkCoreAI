# -*- coding: utf-8 -*-
"""
Google Drive Uploader using OAuth (for personal Gmail)
→ Uploads files into a shared folder using your own 2TB Gmail storage.
→ No service account needed.
"""

import os
import pickle
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
from google.auth.transport.requests import Request


# ---------------------------------------------
# 1️⃣ Setup
# ---------------------------------------------
SCOPES = ["https://www.googleapis.com/auth/drive.file"]
CLIENT_SECRET_FILE = "client_secret.json"   # Must exist in same folder
TOKEN_PICKLE = "token.pickle"               # Saves your login session
FILE_PATH = "ProjectOverview.pdf"           # Local file to upload
FOLDER_ID = "1zTFYn--0axUmDGm5jZHV84eOND4FPamC"  # Target Drive folder

# ---------------------------------------------
# 2️⃣ Auth Flow
# ---------------------------------------------
creds = None

# Reuse saved token if available
if os.path.exists(TOKEN_PICKLE):
    with open(TOKEN_PICKLE, "rb") as token:
        creds = pickle.load(token)

# If no valid token, run browser login
if not creds or not creds.valid:
    if creds and creds.expired and creds.refresh_token:
        creds.refresh(Request())
    else:
        flow = InstalledAppFlow.from_client_secrets_file(CLIENT_SECRET_FILE, SCOPES)
        creds = flow.run_local_server(port=0)
    # Save token for future use
    with open(TOKEN_PICKLE, "wb") as token:
        pickle.dump(creds, token)
    print("New token.pickle saved for future runs.")

# ---------------------------------------------
# 3️⃣ Build Drive API Client
# ---------------------------------------------
service = build("drive", "v3", credentials=creds)

# ---------------------------------------------
# 4️⃣ Upload File
# ---------------------------------------------
if not os.path.exists(FILE_PATH):
    raise FileNotFoundError(f"File not found: {FILE_PATH}")

file_metadata = {"name": os.path.basename(FILE_PATH), "parents": [FOLDER_ID]}
media = MediaFileUpload(FILE_PATH, resumable=True)

print("Uploading:", FILE_PATH)
try:
    uploaded_file = (
        service.files()
        .create(body=file_metadata, media_body=media, fields="id, name, webViewLink, webContentLink")
        .execute()
    )
    print("Upload successful!")
    print("File name:", uploaded_file["name"])
    print("File ID:", uploaded_file["id"])
    print("Web view link:", uploaded_file["webViewLink"])
    print("Direct download link:", uploaded_file["webContentLink"])
except Exception as e:
    print("Upload failed:", str(e))
