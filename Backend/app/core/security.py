from datetime import datetime, timedelta, timezone
from typing import Any, Optional

from jose import jwt

from app.core.config import settings


def create_access_token(subject: str, role: str, expires_minutes: Optional[int] = None) -> str:
    expires_delta = timedelta(minutes=expires_minutes or settings.access_token_expire_minutes)
    expire = datetime.now(timezone.utc) + expires_delta
    payload: dict[str, Any] = {"sub": subject, "role": role, "exp": expire}
    return jwt.encode(payload, settings.jwt_secret, algorithm=settings.jwt_algorithm)
