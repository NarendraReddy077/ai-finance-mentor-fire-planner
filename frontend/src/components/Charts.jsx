import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Charts({ allocation }) {
  if (!allocation) return null;

  const data = {
    labels: ['Equity', 'Debt', 'Gold'],
    datasets: [
      {
        label: 'Allocation %',
        data: [allocation.equity || 70, allocation.debt || 20, allocation.gold || 10],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)', // Emerald 500
          'rgba(59, 130, 246, 0.8)', // Blue 500
          'rgba(245, 158, 11, 0.8)', // Amber 500
        ],
        borderColor: [
          'rgba(16, 185, 129, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(245, 158, 11, 1)',
        ],
        borderWidth: 1,
        hoverOffset: 4
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'rgba(255, 255, 255, 0.7)',
          padding: 20,
          font: {
            family: "'Inter', sans-serif",
            size: 13
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#fff',
        bodyColor: '#cbd5e1',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        cornerRadius: 8,
      }
    }
  };

  return (
    <div className="flex justify-center items-center p-4">
      <div className="w-full max-w-xs aspect-square relative">
        <Doughnut data={data} options={options} />
        {/* Center Text Wrapper */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-[-2rem]">
            <span className="text-3xl font-bold text-white drop-shadow-md pb-1">100%</span>
            <span className="text-xs text-slate-400 tracking-wider">PORTFOLIO</span>
        </div>
      </div>
    </div>
  );
}
