import os
from google import genai
from typing import Dict, Any

# gemini model
client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY", ""))

def generate_financial_advice(user_inputs: dict, plan_summary: Dict[str, Any], goals: list) -> str:
    """Uses Gemini to generate personalized FIRE mentor text"""
    
    prompt = f"""
    You are an expert personal finance mentor helping an Indian user plan for early retirement (FIRE).
    
    User Profile:
    Age: {user_inputs.get('age')}
    Monthly Income: ₹{user_inputs.get('monthly_income')}
    Monthly Expenses: ₹{user_inputs.get('monthly_expenses')}
    Current Savings: ₹{user_inputs.get('existing_savings')}
    Risk Appetite: {user_inputs.get('risk_appetite')}
    
    Calculated Plan:
    Savings Rate: {plan_summary.get('savings_rate')}%
    FIRE Target Corpus: ₹{plan_summary.get('fire_corpus')}
    Emergency Fund Needed: ₹{plan_summary.get('emergency_fund')}
    Estimated Years to FIRE: {plan_summary.get('years_to_fire')} years
    
    Goals:
    {goals}
    
    Based on the above, write an encouraging but realistic 3-4 paragraph assessment of their path to financial independence. 
    Include warnings if they are undersaving (savings rate < 30%), and highlight their timeline. Suggest concrete actions.
    Format your response in simple markdown (no HTML).
    """
    
    try:
        if not os.environ.get("GEMINI_API_KEY"):
            return "⚠️ Gemini API key not found. Please add it to your .env file to unlock AI mentor advice!"
            
        response = client.models.generate_content(model='gemini-2.5-flash', contents=prompt)
        return response.text
    except Exception as e:
        return f"Error connecting to AI mentor: {str(e)}"
