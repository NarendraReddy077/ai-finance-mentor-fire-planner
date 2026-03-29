from pydantic import BaseModel, Field
from typing import Optional, List

class FinancialGoal(BaseModel):
    name: str = Field(..., description="Name of the goal, e.g., House, Car")
    amount: float = Field(..., description="Target corpus required for this goal")
    years_to_goal: int = Field(..., description="Years left to achieve the goal")

class UserFinancials(BaseModel):
    age: int = Field(..., ge=18, le=100)
    monthly_income: float = Field(..., ge=0)
    monthly_expenses: float = Field(..., ge=0)
    existing_savings: float = Field(0.0, description="Total current savings and investments")
    risk_appetite: str = Field("medium", description="low, medium, or high")
    goals: List[FinancialGoal] = Field(default_factory=list)

class FirePlanOutput(BaseModel):
    savings_rate: float
    fire_corpus: float
    emergency_fund: float
    years_to_fire: int
    sip_recommendations: list
    asset_allocation: dict
    ai_mentor_summary: str
