// import { NextResponse } from 'next/server';
// import { connectToDatabase } from '@/lib/mongodb';

// export async function GET() {
//   const { db } = await connectToDatabase();
//   const transactions = await db.collection('transactions').find({}).toArray();
//   const monthlyExpenses = transactions.reduce((acc, t) => {
//     const month = new Date(t.date).toLocaleString('default', { month: 'long' });
//     acc[month] = (acc[month] || 0) + Number(t.amount);
//     return acc;
//   }, {});
//   const chartData = Object.keys(monthlyExpenses).map(month => ({ month, expense: monthlyExpenses[month] }));
//   return NextResponse.json(chartData);
// }



import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  const { db } = await connectToDatabase();
  const transactions = await db.collection('transactions').find({}).toArray();

  const monthlyExpenses: { [key: string]: number } = transactions.reduce((acc: { [key: string]: number }, t: { date: string; amount: string }) => {
    const month = new Date(t.date).toLocaleString('default', { month: 'long' });
    acc[month] = (acc[month] || 0) + Number(t.amount);
    return acc;
  }, {});

  const chartData = Object.keys(monthlyExpenses).map((month) => ({ month, expense: monthlyExpenses[month] }));

  return NextResponse.json(chartData);
}