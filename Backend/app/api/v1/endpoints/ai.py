from fastapi import APIRouter

from app.services.ai_service import generate_district_brief, recommend_redistribution

router = APIRouter()


@router.post("/district-brief")
async def district_brief() -> dict:
    return generate_district_brief()


@router.post("/redistribution")
async def redistribution_recommendation() -> dict:
    return recommend_redistribution()


@router.post("/optimize-nurses")
async def optimize_nurses() -> dict:
    return {
        "status": "success",
        "recommendation": "Redistributed 8 high-risk follow-ups across 3 available nurses. Route optimized to reduce travel time by 23%.",
        "actions": [
            "Reassigned 3 high-risk patients from Sr. Lakshmi Devi to Sr. Jyothi",
            "Optimized village route for Sr. Revathi: Bheemunipatnam → Tagarapuvalasa",
            "Deployed Sr. Sunitha for fever surveillance in Rushikonda",
        ],
        "confidence": 0.87,
    }


@router.post("/rebalance-doctors")
async def rebalance_doctors() -> dict:
    return {
        "status": "success",
        "recommendation": "Shift 12 pending reviews from Dr. Kavya Menon to Dr. Rajesh Kumar (currently absent but returning). Deploy Dr. Ananya Iyer for emergency overflow.",
        "actions": [
            "Move 8 chronic disease reviews to Dr. Prakash Rao",
            "Assign 4 pediatric follow-ups to Dr. Meera Shah",
            "Schedule Dr. Nikhil Reddy for evening shift coverage",
        ],
        "confidence": 0.82,
    }


@router.post("/analyze-load")
async def analyze_load() -> dict:
    return {
        "status": "success",
        "analysis": {
            "overloaded": ["Dr. Kavya Menon (138% capacity)", "Dr. Prakash Rao (121% capacity)"],
            "underutilized": ["Dr. Ananya Iyer (65 patients, 45 capacity)", "Dr. Nikhil Reddy (74 patients, 40 capacity)"],
            "suggestion": "Rebalance 12 reviews from Kavya to Ananya. Move 4 pediatric cases to Meera.",
        },
        "confidence": 0.85,
    }
