import json
import re
import asyncio
import httpx

from app.core.config import settings

GEMINI_API_KEY = settings.gemini_api_key or ""
GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent"


async def call_gemini(prompt: str, retries: int = 3) -> str:
    last_err = None
    for attempt in range(retries):
        try:
            async with httpx.AsyncClient(timeout=60.0) as client:
                resp = await client.post(
                    GEMINI_URL,
                    params={"key": GEMINI_API_KEY},
                json={
                    "contents": [{"parts": [{"text": prompt}]}],
                    "generationConfig": {
                        "temperature": 0.7,
                        "maxOutputTokens": 2048,
                        "thinkingConfig": {"thinkingBudget": 0},
                    },
                },
                )
                if resp.status_code == 429:
                    wait = 2 ** (attempt + 1)
                    await asyncio.sleep(wait)
                    continue
                resp.raise_for_status()
                data = resp.json()
                return data["candidates"][0]["content"]["parts"][0]["text"]
        except httpx.HTTPStatusError as e:
            last_err = e
            if attempt < retries - 1:
                await asyncio.sleep(2 ** attempt)
            continue
    raise last_err or Exception("Gemini API failed after retries")


async def call_gemini_json(prompt: str) -> dict:
    try:
        raw = await call_gemini(prompt)
    except Exception as e:
        return {"error": str(e), "text": "AI service temporarily unavailable. Please try again."}
    text = raw.strip()
    if text.startswith("```"):
        first_nl = text.index("\n")
        text = text[first_nl + 1:]
    if text.endswith("```"):
        text = text[:-3]
    text = text.strip()
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        match = re.search(r'\{[\s\S]*\}', text)
        if match:
            try:
                return json.loads(match.group())
            except json.JSONDecodeError:
                pass
        return {"text": raw}
