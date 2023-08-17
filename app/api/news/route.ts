import { firestoreDB } from "@/utils/firebase";
import { NextRequest, NextResponse } from "next/server";

function getCollectionName(date: Date): string {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}-${year}`;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  console.log("getting articles for category: ", category);

  const today = new Date();

  // Get most recent articles. Due to time zone differences, tomorrow may already exist
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  let collectionName = getCollectionName(tomorrow);
  console.log("trying to get collection name: " + collectionName);
  let collection = firestoreDB.collection(collectionName);
  let snapshot = await collection.get();

  if (snapshot.size === 0) {
    console.log('cound not find collection, trying today');
    collectionName = getCollectionName(today);
    console.log("trying to get collection name: " + collectionName);
    collection = firestoreDB.collection(collectionName);
    snapshot = await collection.get();
  }

  if (snapshot.size === 0) {
    console.log('cound not find collection, trying yesterday');
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    collectionName = getCollectionName(yesterday);
    console.log("trying to get collection name: " + collectionName);
    collection = firestoreDB.collection(collectionName);
    snapshot = await collection.get();
  }

  if (snapshot.size === 0) {
    console.error('could not find firestore collection');
    return NextResponse.json({ message: 'could not find data' }, { status: 400 });
  }

  let articles: Article[] = [];
  snapshot.forEach(doc => {
    //console.log(doc.id, '=>', doc.data());
    const data = doc.data() as Article;
    if (data.category === category) {
      articles.push(data);
    }
  });

  return NextResponse.json({ articles }, { status: 200 });
}
