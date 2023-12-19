'use client'

import ArticleCard from "@/components/articleCard";
import MapChart from "@/components/map"
import { twoLetterCountryCodeToFullName } from "@/utils/countryCodes";
import { useEffect, useRef, useState } from "react"

export default function Home() {
  const [articleData, setArticleData] = useState<CountryCountData[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>();
  const [selectedCountryArticles, setSelectedCountryArticles] = useState<Article[]>([]);
  const selectedStoryLocationRef = useRef<HTMLDivElement>(null);

  function handleMarkerClicked(country: CountryCountData) {
    setSelectedCountry(country.country);
    selectedStoryLocationRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        const response = await fetch('api/news');
        const data = await response.json();

        console.log('retrieved article data: ', data.articles);
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

        console.log('retrieved article data for country: ', data.articles);
        setSelectedCountryArticles(data.articles);
      } catch (error) {
        console.error(error);
      }
    }

    if (selectedCountry && selectedCountry !== '') {
      fetchCountryArticleData();
    }
  }, [selectedCountry]);

  return (
    <main className="">
      <div className="px-2 sm:px-12">
        {articleData && articleData.length > 0 &&
          <MapChart articlesByCountry={articleData} handleMarkerClicked={handleMarkerClicked} />
        }
      </div>
      <div>
        {selectedCountry &&
          <h3 className="text-5xl text-center font-bold my-12 uppercase">{twoLetterCountryCodeToFullName(selectedCountry)}</h3>
        }
        <div ref={selectedStoryLocationRef} className='flex flex-wrap justify-center gap-20 pb-20 min-h-[30rem]'>
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
