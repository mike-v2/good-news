import { firestoreDB } from "@/utils/firebase";
import { NextRequest, NextResponse } from "next/server";

function getCollectionName(date: Date): string {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}-${year}`;
}

export async function GET(req: NextRequest) {
  const today = new Date();
  let collectionName = getCollectionName(today);
  console.log("trying to get articles for date: " + collectionName);
  let collection = firestoreDB.collection(collectionName);

  let snapshot = await collection.get();
  if (snapshot.size === 0) {
    console.log('cound not find collection, trying yesterday');
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    collectionName = getCollectionName(yesterday);
    console.log("trying to get articles for date: " + collectionName);
    collection = firestoreDB.collection(collectionName);
  }

  snapshot = await collection.get();
  if (snapshot.size === 0) {
    console.log('cound not find collection, trying tomorrow');
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    collectionName = getCollectionName(tomorrow);
    console.log("trying to get articles for date: " + collectionName);
    collection = firestoreDB.collection(collectionName);
  }
  snapshot = await collection.get();
  if (snapshot.size === 0) {
    console.error('could not find firestore collection');
    return NextResponse.json({ message: 'could not find data' }, { status: 400 });
  }

  console.log("snapshot: ", snapshot);
  let articles: Article[] = [];
  snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
    const data = doc.data() as Article;
    articles.push(data);
  });

  return NextResponse.json({ articles }, { status: 200 });
}
