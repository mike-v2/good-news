'use client'

import ArticleCard from "@/components/articleCard";
import MapChart from "@/components/map"
import { useEffect, useState } from "react"

export default function Home() {
  const [articleData, setArticleData] = useState<CountryCountData[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>();
  const [selectedCountryArticles, setSelectedCountryArticles] = useState<Article[]>([]);

  function handleMarkerClicked(country: CountryCountData) {
    setSelectedCountry(country.country);
  }

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        const response = await fetch('api/news');
        const data = await response.json();

        console.log('retrieved article data: ', data.articlesByCountryCount);
        setArticleData(data.articles);
      } catch (error) {
        console.error(error);
      }
    }

    fetchArticleData();
  }, []);

  useEffect(() => {
    const fetchCountryArticleData = async () => {
      try {
        const response = await fetch(`api/news?country=${selectedCountry}`);
        const data = await response.json();

        console.log('retrieved article data for country: ', data.articlesByCountryCount);
        setSelectedCountryArticles(data.articles);
      } catch (error) {
        console.error(error);
      }
    }

    if (selectedCountry) {
      fetchCountryArticleData();
    }
  }, [selectedCountry]);

  return (
    <main className="">
      <h1>Home</h1>
      <div className="px-2 sm:px-12">
        {articleData && articleData.length > 0 &&
          <MapChart articlesByCountry={articleData} handleMarkerClicked={handleMarkerClicked} />
        }
      </div>
      <div>
        {selectedCountry &&
          <h3 className="text-5xl text-center font-bold my-12 uppercase">{selectedCountry}</h3>
        }
        <div className='flex flex-wrap justify-center gap-20'>
          {selectedCountryArticles && selectedCountryArticles.length > 0 &&
            selectedCountryArticles.map((country, index) => {
              return (
                <div key={index} >
                  <ArticleCard {...country} />
                </div>
              )
            })
          }
        </div>
      </div>

    </main>
  )
}
