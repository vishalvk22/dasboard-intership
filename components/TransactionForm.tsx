'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function TransactionForm() {
  const [transaction, setTransaction] = useState({ amount: '', date: '', description: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transaction.amount || !transaction.date || !transaction.description) {
      setError('All fields are required');
      return;
    }
    if (isNaN(Number(transaction.amount)) || Number(transaction.amount) <= 0) {
      setError('Amount must be a positive number');
      return;
    }
    const res = await fetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transaction),
    });
    if (res.ok) {
      setTransaction({ amount: '', date: '', description: '' });
      setError('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-2">
      <Input
        type="number"
        placeholder="Amount"
        value={transaction.amount}
        onChange={(e) => setTransaction({ ...transaction, amount: e.target.value })}
      />
      <Input
        type="date"
        value={transaction.date}
        onChange={(e) => setTransaction({ ...transaction, date: e.target.value })}
      />
      <Input
        type="text"
        placeholder="Description"
        value={transaction.description}
        onChange={(e) => setTransaction({ ...transaction, description: e.target.value })}
      />
      {error && <p className="text-red-500">{error}</p>}
      <Button type="submit">Add Transaction</Button>
    </form>
  );
}