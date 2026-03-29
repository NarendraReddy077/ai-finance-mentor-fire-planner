import React, { useState } from 'react';
import axios from 'axios';
import FinanceForm from './components/FinanceForm';
import Dashboard from './components/Dashboard';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resultData, setResultData] = useState(null);

  const handleGeneratePlan = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://127.0.0.1:8000/calculate-plan', formData);
      setResultData(response.data);
    } catch (err) {
      console.error("Error generating plan:", err);
      setError("Failed to generate plan. Please ensure the backend server is running on port 8000.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResultData(null);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-slate-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] text-foreground font-sans selection:bg-primary/30">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <header className="mb-12 text-center">
          <div className="inline-block mb-3 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium tracking-wide">
            AI-Powered Money Mentor
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-600">
            FIRE Path Planner
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Achieve Financial Independence. Retire Early. Generate a personalized roadmap tailored to your specific goals and risk appetite using advanced financial modeling and AI.
          </p>
        </header>

        <main>
          {error && (
            <div className="mb-8 p-4 bg-destructive/20 border border-destructive/50 rounded-lg text-red-200 text-center text-sm">
              {error}
            </div>
          )}

          {!resultData ? (
            <div className="glass-card rounded-2xl p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <FinanceForm onSubmit={handleGeneratePlan} isLoading={loading} />
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
              <Dashboard data={resultData} onReset={handleReset} />
            </div>
          )}
        </main>
      </div>
      <footer className="mt-20 py-8 text-center text-slate-500 border-t border-white/5 text-sm">
        FIRE Planner AI Mentor © {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default App;
