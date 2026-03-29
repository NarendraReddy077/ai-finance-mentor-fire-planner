from finance_engine import calculate_sip_goal

def plan_goals(goals, risk_appetite: str) -> list:
    """Takes a list of FinancialGoal objects and returns SIP requirements"""
    recommended_sips = []
    
    # Expected returns based on risk appetite (blended portfolio return)
    expected_returns = {
        "low": 8.0,
        "medium": 12.0,
        "high": 15.0
    }
    
    expected_return = expected_returns.get(risk_appetite, 10.0)
    
    for goal in goals:
        # Simplistic assumption: goals < 3 years get 6-7% debt return, > 3 years get equity blended return
        annual_return = 7.0 if goal.years_to_goal <= 3 else expected_return
        
        # We need to inflate the goal amount first. Assume 6% inflation
        inflated_cost = goal.amount * ((1 + 0.06) ** goal.years_to_goal)
        
        sip = calculate_sip_goal(
            future_cost=inflated_cost, 
            annual_return=annual_return, 
            years=goal.years_to_goal
        )
        
        recommended_sips.append({
            "name": goal.name,
            "original_amount": goal.amount,
            "inflated_amount": round(inflated_cost, 2),
            "years": goal.years_to_goal,
            "monthly_sip": sip,
            "expected_return_rate": annual_return
        })
        
    return recommended_sips
