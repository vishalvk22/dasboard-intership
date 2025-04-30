import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  const { db } = await connectToDatabase();
  const transactions = await db.collection('transactions').find({}).toArray();
  return NextResponse.json(transactions);
}

export async function POST(request: Request) {
  const { amount, date, description } = await request.json();
  const { db } = await connectToDatabase();
  const result = await db.collection('transactions').insertOne({ amount, date, description });
  return NextResponse.json({ _id: result.insertedId });
}

export async function PUT(request: Request) {
  const { id, ...updates } = await request.json();
  const { db } = await connectToDatabase();
  await db.collection('transactions').updateOne({ _id: id }, { $set: updates });
  return NextResponse.json({ success: true });
}

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  const { db } = await connectToDatabase();
  await db.collection('transactions').deleteOne({ _id: id });
  return NextResponse.json({ success: true });
}