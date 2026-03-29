from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

import os

# Load environment variables FIRST
load_dotenv()

from input_module import UserFinancials, FirePlanOutput
from finance_engine import generate_financial_plan
from goal_planner import plan_goals
from ai_advisor import generate_financial_advice

app = FastAPI(title="FIRE Planner AI Mentor API")

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "up", "service": "FIRE Planner Backend"}

@app.post("/calculate-plan", response_model=FirePlanOutput)
def calculate_plan(inputs: UserFinancials):
    # Core Finance Engine calculations
    plan_summary = generate_financial_plan(inputs)
    
    # Goal-based SIP calculations
    sips = plan_goals(inputs.goals, inputs.risk_appetite)
    
    # AI Mentor Text Generation
    # We pass the input values dictionary to keep it simple for string formatting
    mentor_summary = generate_financial_advice(
        inputs.model_dump(), 
        plan_summary, 
        sips
    )
    
    # Assemble Final Output
    return FirePlanOutput(
        savings_rate=plan_summary.get("savings_rate", 0),
        fire_corpus=plan_summary.get("fire_corpus", 0),
        emergency_fund=plan_summary.get("emergency_fund", 0),
        years_to_fire=plan_summary.get("years_to_fire", 0),
        sip_recommendations=sips,
        asset_allocation=plan_summary.get("asset_allocation", {}),
        ai_mentor_summary=mentor_summary
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)
