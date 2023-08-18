import { firestoreDB } from "@/utils/firebase";
import { NextRequest, NextResponse } from "next/server";
const countryData = require('../../../json/country_coordinates.json')

type CoordinateData = {
  ISO: string;
  COUNTRY: string;
  coordinates: string;
}

function getCollectionName(date: Date): string {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}-${year}`;
}

async function getSnapshot(): Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>> {
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
  }

  return snapshot;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const country = searchParams.get('country');

  const snapshot = await getSnapshot();
  if (!snapshot) {
    return NextResponse.json({ message: 'could not find data' }, { status: 400 });
  }

  if (category) {
    console.log("getting articles for category: ", category);

    let articles: Article[] = [];
    snapshot.forEach(doc => {
      const data = doc.data() as Article;
      if (data.category === category) {
        articles.push(data);
      }
    });

    return NextResponse.json({ articles }, { status: 200 });
  } else if (country) {
    console.log("getting articles for country: ", country);

    let articles: Article[] = [];
    snapshot.forEach(doc => {
      const data = doc.data() as Article;
      if (data.country === country) {
        articles.push(data);
      }
    });

    return NextResponse.json({ articles }, { status: 200 });
  } else {
    const articles: CountryCountData[] = [];

    snapshot.forEach(doc => {
      const data = doc.data() as Article;
      if (!data.country || data.country === '') return; // acts like 'continue' in 'forEach'
      const country = data.country;

      let entry: CountryCountData | undefined = articles.find(d => d.country === country);
      if (!entry) {
        entry = { country: country, count: 0 }
        const coordsEntry = countryData.find((d: CoordinateData) => d.ISO.toLowerCase() === country);
        //console.log("coordsEntry = ", coordsEntry);
        if (coordsEntry) {
          entry.coords = coordsEntry.coordinates;
        }
        articles.push(entry);
      }

      entry.count++;
    });

    return NextResponse.json({ articles }, { status: 200 });
  }
}
