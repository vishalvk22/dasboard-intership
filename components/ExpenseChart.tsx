'use client';

import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function ExpenseChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchChartData();
  }, []);

  const fetchChartData = async () => {
    const res = await fetch('/api/transactions/chart');
    const data = await res.json();
    setChartData(data);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Monthly Expenses</h2>
      <BarChart width={600} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="expense" fill="#8884d8" />
      </BarChart>
    </div>
  );
}