from typing import Optional
from fastapi import Depends, Header, HTTPException
from jose import jwt, JWTError

from app.core.config import settings


def get_current_user(authorization: Optional[str] = Header(None)) -> dict:
    if not authorization:
        return {"role": "district_officer", "sub": "default-user"}

    token = authorization.replace("Bearer ", "")
    try:
        payload = jwt.decode(token, settings.jwt_secret, algorithms=[settings.jwt_algorithm])
        return {"role": payload.get("role", "district_officer"), "sub": payload.get("sub", "unknown")}
    except JWTError:
        return {"role": "district_officer", "sub": "default-user"}


def require_district_officer(user: dict = Depends(get_current_user)) -> dict:
    if user["role"] != "district_officer":
        raise HTTPException(status_code=403, detail="District officer access required")
    return user


def require_doctor_or_above(user: dict = Depends(get_current_user)) -> dict:
    if user["role"] not in ["district_officer", "medical_officer", "doctor"]:
        raise HTTPException(status_code=403, detail="Doctor access or above required")
    return user


def require_nurse_or_above(user: dict = Depends(get_current_user)) -> dict:
    if user["role"] not in ["district_officer", "medical_officer", "doctor", "nurse"]:
        raise HTTPException(status_code=403, detail="Nurse access or above required")
    return user
