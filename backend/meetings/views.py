import os
import hashlib
import json
import hmac

import requests

APP_NAME = "MentoringHub"
API_KEY = os.environ.get("API_KEY")
API_SECRET = os.environ.get("API_SECRET")
MEET_SERVER_URL = os.environ.get("MEET_SERVER_URL")


def send_request(body, method: str) -> dict:
    b = json.dumps(body)
    hash = hmac.new(API_SECRET.encode("utf-8"), b.encode("utf-8"), hashlib.sha256)
    signature = hash.hexdigest()
    headers = {
        "Content-Type": "application/json",
        "API-KEY": API_KEY,
        "HASH-SIGNATURE": signature,
    }
    response = requests.post(
        f"{MEET_SERVER_URL}/auth/{method}",
        headers=headers,
        json=body,
    )
    if response.status_code != 200:
        return f"Unable to get data from method: {method}"
    data = response.json()
    return data


def check_room_active(room_id: str) -> dict:
    room_detail = {
        "room_id": room_id,
    }
    res = send_request(room_detail, "room/isRoomActive")
    return res


def create_room(room_info: dict) -> dict:
    try:
        room_create_res = send_request(room_info, "room/create")
        return {"status": room_create_res["status"], "msg": room_create_res["msg"]}
    except Exception as e:
        return False


def get_join_token(room_id: str, user_info: dict) -> dict:
    getJoinTokenReq = {
        "room_id": room_id,
        "user_info": user_info,
    }

    room_create_res = send_request(
        getJoinTokenReq,
        "room/getJoinToken",
    )
    return {
        "status": room_create_res["status"] or False,
        "token": room_create_res["token"],
    }


def init_room_info(
    room_id: str,
    room_title: str = APP_NAME,
    empty_timeout: int = 60 * 60 * 2,
    **kwargs,
) -> dict:
    """
    Parameters
    ----------
    **kwargs: dict
        "room_feature" = {
            "allow_webcams": bool,
            "mute_on_start": False,
            "allow_screen_share": True,
            "allow_recording": False,
            "allow_rtmp": False,
            "admin_only_webcams": False,
            "allow_view_other_webcams": True,
            "allow_view_other_users_list": True,
            "allow_polls": True,
        }
        Dictionary to change the feature of room

        default_lock_settings = {
            "lock_microphone": True,
            "lock_screen_sharing": True,
            "lock_webcam": True,
            "lock_chat_file_share": True,
            "lock_chat_send_message": True,
        }
        Dictionary to lock the room setting
    """
    room_features = {
        "allow_webcams": True,
        "mute_on_start": False,
        "allow_screen_share": True,
        "allow_recording": False,
        "allow_rtmp": False,
        "admin_only_webcams": False,
        "allow_view_other_webcams": True,
        "allow_view_other_users_list": True,
        "allow_polls": True,
        "room_duration": 0,
        "chat_features": {
            "allow_chat": True,
            "allow_file_upload": True,
            "max_file_size": 50,
            "allowed_file_types": ["jpg", "png", "zip"],
        },
        "shared_note_pad_features": {"allowed_shared_note_pad": True},
        "whiteboard_features": {"allowed_whiteboard": True},
        "external_media_player_features": {"allowed_external_media_player": True},
        "waiting_room_features": {"is_active": True},
        "breakout_room_features": {"is_allow": True, "allowed_number_rooms": 6},
        "display_external_link_features": {
            "is_allow": True,
        },
    }
    default_lock_settings = {
        "lock_microphone": True,
        "lock_screen_sharing": True,
        "lock_webcam": True,
        "lock_chat_file_share": True,
        "lock_chat_send_message": True,
    }
    room_features.update(dict(kwargs.get("room_features") or {}))
    default_lock_settings.update(dict(kwargs.get("default_lock_settings") or {}))
    room_info = {
        "room_id": room_id,
        "empty_timeout": empty_timeout,
        "metadata": {
            "room_title": room_title,
            "welcome_message": f"Welcome to {APP_NAME}!<br /> To share microphone click mic icon from bottom left side.",
            # webhook_url: "http://example.com",
            "room_features": room_features,
            # "default_lock_settings": default_lock_settings,
        },
    }
    return room_info


def init_user_info(
    user_name: str,
    user_id: str,
    user_type: str = "admin",
):
    user_info = {
        "is_admin": (user_type == "admin") or False,
        "name": user_name,
        "user_id": user_id,
    }
    return user_info
