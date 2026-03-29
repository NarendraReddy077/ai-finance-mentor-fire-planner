import React, { useState } from 'react';
import { PlusCircle, Trash2, ArrowRight, Loader2 } from 'lucide-react';

export default function FinanceForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    age: 30,
    monthly_income: 100000,
    monthly_expenses: 50000,
    existing_savings: 500000,
    risk_appetite: 'medium',
    goals: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'risk_appetite' ? value : Number(value)
    }));
  };

  const addGoal = () => {
    setFormData((prev) => ({
      ...prev,
      goals: [...prev.goals, { name: '', amount: 0, years_to_goal: 5 }]
    }));
  };

  const updateGoal = (index, field, value) => {
    const newGoals = [...formData.goals];
    newGoals[index][field] = field === 'name' ? value : Number(value);
    setFormData({ ...formData, goals: newGoals });
  };

  const removeGoal = (index) => {
    const newGoals = formData.goals.filter((_, i) => i !== index);
    setFormData({ ...formData, goals: newGoals });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-emerald-400">Personal Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label htmlFor="age">Current Age</label>
            <input type="number" id="age" name="age" required min="18" max="100" value={formData.age} onChange={handleChange} />
          </div>
          <div className="flex flex-col">
            <label htmlFor="risk_appetite">Risk Appetite</label>
            <select id="risk_appetite" name="risk_appetite" required value={formData.risk_appetite} onChange={handleChange} className="bg-slate-900 border border-white/20 rounded-md px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all [&>option]:bg-slate-900">
              <option value="low">Low (Conservative)</option>
              <option value="medium">Medium (Balanced)</option>
              <option value="high">High (Aggressive)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white/5 h-px w-full my-8"></div>

      <div>
        <h2 className="text-2xl font-bold mb-4 text-emerald-400">Financial Overview (₹)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col">
            <label htmlFor="monthly_income">Monthly Income</label>
            <input type="number" id="monthly_income" name="monthly_income" required min="1" value={formData.monthly_income} onChange={handleChange} />
          </div>
          <div className="flex flex-col">
            <label htmlFor="monthly_expenses">Monthly Expenses</label>
            <input type="number" id="monthly_expenses" name="monthly_expenses" required min="1" value={formData.monthly_expenses} onChange={handleChange} />
          </div>
          <div className="flex flex-col">
            <label htmlFor="existing_savings">Existing Savings/Investments</label>
            <input type="number" id="existing_savings" name="existing_savings" required min="0" value={formData.existing_savings} onChange={handleChange} />
          </div>
        </div>
      </div>

      <div className="bg-white/5 h-px w-full my-8"></div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-emerald-400">Specific Financial Goals</h2>
          <button type="button" onClick={addGoal} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-teal-500/10 text-teal-400 hover:bg-teal-500/20 hover:-translate-y-0.5 transition-all text-sm font-medium">
            <PlusCircle size={16} /> Add Goal
          </button>
        </div>
        
        {formData.goals.length === 0 ? (
          <p className="text-slate-500 text-sm italic py-4">No specific goals added yet. FIRE logic will still apply.</p>
        ) : (
          <div className="space-y-4">
            {formData.goals.map((goal, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-4 items-end p-4 bg-slate-800/50 rounded-lg border border-white/5 animate-in slide-in-from-top-2">
                <div className="flex-1 w-full">
                  <label>Goal Name</label>
                  <input type="text" required value={goal.name} placeholder="e.g. Car, House" onChange={(e) => updateGoal(index, 'name', e.target.value)} className="w-full" />
                </div>
                <div className="flex-1 w-full">
                  <label>Target Amount (₹)</label>
                  <input type="number" required min="1" value={goal.amount || ''} onChange={(e) => updateGoal(index, 'amount', e.target.value)} className="w-full" />
                </div>
                <div className="w-full md:w-32">
                  <label>Years Left</label>
                  <input type="number" required min="1" value={goal.years_to_goal || ''} onChange={(e) => updateGoal(index, 'years_to_goal', e.target.value)} className="w-full" />
                </div>
                <button type="button" onClick={() => removeGoal(index)} className="p-2.5 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-md transition-colors" title="Remove goal">
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="pt-6">
        <button type="submit" disabled={isLoading} className="w-full py-4 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:shadow-lg hover:shadow-emerald-500/25 text-white font-bold text-lg hover:-translate-y-0.5 transition-all flex justify-center items-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none">
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" size={24} /> Generating Plan...
            </>
          ) : (
            <>
              Generate FIRE Plan <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
