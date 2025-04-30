import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import ExpenseChart from '@/components/ExpenseChart';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Personal Finance Visualizer</h1>
      <p>made by vishal</p>
      <TransactionForm />
      <TransactionList />
      <ExpenseChart />
    </div>
  );
}