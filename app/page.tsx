'use client'

import MapChart from "@/components/map"
import { useEffect, useState } from "react"

export default function Home() {
  const [articleData, setArticleData] = useState<CountryCountData[]>([]);

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        const response = await fetch('api/news');
        const data = await response.json();

        console.log('retrieved article data: ', data.articlesByCountryCount);
        setArticleData(data.articlesByCountryCount);
      } catch (error) {
        console.error(error);
      }
    }

    fetchArticleData();
  }, []);

  return (
    <main className="">
      <h1>Home</h1>
      <div>
        {articleData && articleData.length > 0 &&
          <MapChart articlesByCountry={articleData} />
        }
      </div>
    </main>
  )
}
