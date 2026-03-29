import math

def calculate_fire_corpus(annual_expenses: float, inflation_rate: float = 0.06, years_to_fire: int = 15) -> float:
    # Future expenses adjusted for inflation
    future_annual_expenses = annual_expenses * ((1 + inflation_rate) ** years_to_fire)
    # The 25x rule based on future inflated expenses
    return future_annual_expenses * 25.0

def calculate_asset_allocation(age: int, risk_appetite: str = "medium") -> dict:
    # Basic 100 - age rule
    equity_percentage = 100 - age
    
    # Adjust based on risk appetite
    if risk_appetite == "high":
        equity_percentage += 10
    elif risk_appetite == "low":
        equity_percentage -= 10
        
    # Cap between 20% and 90%
    equity_percentage = max(20, min(90, equity_percentage))
    debt_percentage = 100 - equity_percentage - 5 # 5% for Gold/Alternative
    
    return {
        "Equity": equity_percentage,
        "Debt": debt_percentage,
        "Gold": 5
    }

def calculate_sip_goal(future_cost: float, annual_return: float, years: int) -> float:
    """Calculates monthly SIP needed to reach future_cost"""
    if years <= 0:
        return 0.0
    
    monthly_rate = (annual_return / 100) / 12
    total_months = years * 12
    
    if monthly_rate == 0:
        return future_cost / total_months
    
    # Future Value of SIP formula inverted
    sip_amount = (future_cost * monthly_rate) / (((1 + monthly_rate) ** total_months - 1) * (1 + monthly_rate))
    return round(sip_amount, 2)

def generate_financial_plan(inputs) -> dict:
    """Core logic runner"""
    annual_expenses = inputs.monthly_expenses * 12
    savings_rate = 0.0
    if inputs.monthly_income > 0:
        savings_rate = ((inputs.monthly_income - inputs.monthly_expenses) / inputs.monthly_income) * 100
    
    emergency_fund = inputs.monthly_expenses * 6
    
    # Simple estimate of years to FIRE
    investable_per_year = (inputs.monthly_income - inputs.monthly_expenses) * 12
    fire_corpus = calculate_fire_corpus(annual_expenses)
    
    # A very rough approximation of Years to FIRE
    # How long to reach corpus with current savings + existing corpus at 10% average return?
    current_corpus = inputs.existing_savings
    monthly_investment = inputs.monthly_income - inputs.monthly_expenses
    avg_annual_return = 0.10
    monthly_rate = avg_annual_return / 12
    
    years_to_fire = 0
    if monthly_investment > 0:
        # Solve for n: FV = P((1+r)^n - 1)/r * (1+r) + PV(1+r)^n
        # Iterative approach for simplicity
        months = 0
        while current_corpus < fire_corpus and months < 1200: # Max 100 years
            current_corpus = current_corpus * (1 + monthly_rate) + monthly_investment
            months += 1
            # Adjust FIRE target slightly for inflation each year
            if months % 12 == 0:
                fire_corpus *= 1.06
        years_to_fire = months // 12

    allocation = calculate_asset_allocation(inputs.age, inputs.risk_appetite)
    
    return {
        "savings_rate": round(savings_rate, 2),
        "fire_corpus": round(fire_corpus, 2),
        "emergency_fund": emergency_fund,
        "years_to_fire": years_to_fire,
        "asset_allocation": allocation,
        "monthly_investment_capability": monthly_investment
    }
