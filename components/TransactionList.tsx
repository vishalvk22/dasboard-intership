// 'use client';

// import { useEffect, useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';

// export default function TransactionList() {
//   const [transactions, setTransactions] = useState([]);
//   const [editId, setEditId] = useState(null);
//   const [editTransaction, setEditTransaction] = useState({ amount: '', date: '', description: '' });

//   useEffect(() => {
//     fetchTransactions();
//   }, []);

//   const fetchTransactions = async () => {
//     const res = await fetch('/api/transactions');
//     const data = await res.json();
//     setTransactions(data);
//   };

//   const handleDelete = async (id: string) => {
//     await fetch(`/api/transactions?id=${id}`, { method: 'DELETE' });
//     fetchTransactions();
//   };

//   const handleEdit = (transaction: any) => {
//     setEditId(transaction._id);
//     setEditTransaction(transaction);
//   };

//   const handleUpdate = async (e: React.FormEvent) => {
//     e.preventDefault();
//     await fetch(`/api/transactions?id=${editId}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(editTransaction),
//     });
//     setEditId(null);
//     setEditTransaction({ amount: '', date: '', description: '' });
//     fetchTransactions();
//   };

//   return (
//     <div className="mb-4">
//       <h2 className="text-xl font-semibold mb-2">Transactions</h2>
//       <ul>
//         {transactions.map((t) => (
//           <li key={t._id} className="flex space-x-2 mb-2">
//             {editId === t._id ? (
//               <form onSubmit={handleUpdate} className="flex space-x-2">
//                 <Input
//                   type="number"
//                   value={editTransaction.amount}
//                   onChange={(e) => setEditTransaction({ ...editTransaction, amount: e.target.value })}
//                 />
//                 <Input
//                   type="date"
//                   value={editTransaction.date}
//                   onChange={(e) => setEditTransaction({ ...editTransaction, date: e.target.value })}
//                 />
//                 <Input
//                   type="text"
//                   value={editTransaction.description}
//                   onChange={(e) => setEditTransaction({ ...editTransaction, description: e.target.value })}
//                 />
//                 <Button type="submit">Save</Button>
//               </form>
//             ) : (
//               <>
//                 <span>{t.amount} - {t.date} - {t.description}</span>
//                 <Button onClick={() => handleEdit(t)}>Edit</Button>
//                 <Button onClick={() => handleDelete(t._id)}>Delete</Button>
//               </>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Transaction {
  _id: string;
  amount: string;
  date: string;
  description: string;
}

export default function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editTransaction, setEditTransaction] = useState<Transaction>({
    _id: '',
    amount: '',
    date: '',
    description: '',
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const res = await fetch('/api/transactions');
    const data = await res.json();
    setTransactions(data);
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/transactions?id=${id}`, { method: 'DELETE' });
    fetchTransactions();
  };

  const handleEdit = (transaction: Transaction) => {
    setEditId(transaction._id);
    setEditTransaction(transaction);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/transactions?id=${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editTransaction),
    });
    setEditId(null);
    setEditTransaction({ _id: '', amount: '', date: '', description: '' });
    fetchTransactions();
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Transactions</h2>
      <ul>
        {transactions.map((t) => (
          <li key={t._id} className="flex space-x-2 mb-2">
            {editId === t._id ? (
              <form onSubmit={handleUpdate} className="flex space-x-2">
                <Input
                  type="number"
                  value={editTransaction.amount}
                  onChange={(e) => setEditTransaction({ ...editTransaction, amount: e.target.value })}
                />
                <Input
                  type="date"
                  value={editTransaction.date}
                  onChange={(e) => setEditTransaction({ ...editTransaction, date: e.target.value })}
                />
                <Input
                  type="text"
                  value={editTransaction.description}
                  onChange={(e) => setEditTransaction({ ...editTransaction, description: e.target.value })}
                />
                <Button type="submit">Save</Button>
              </form>
            ) : (
              <>
                <span>{t.amount} - {t.date} - {t.description}</span>
                <Button onClick={() => handleEdit(t)}>Edit</Button>
                <Button onClick={() => handleDelete(t._id)}>Delete</Button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}