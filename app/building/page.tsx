'use client'

import ArticleCard from "@/components/articleCard";
import { useEffect, useState } from "react";


export default function Building() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    async function initArticles() {
      try {
        const response = await fetch('api/news?category=building');
        const data = await response.json();
        const articles = data.articles as Article[];
        console.log('retrieved articles: ', articles);

        articles.sort((a, b) => {
          if (a.image && !b.image) return -1;
          if (!a.image && b.image) return 1;
          return 0;
        });

        setArticles(articles);
      } catch (error) {
        console.error(error);
      }
    }

    initArticles();
  }, []);

  return (
    <main className="">
      <h1 className="text-center text-4xl sm:text-6xl mt-12 sm:mt-20 md:mt-32">
        Building, Construction, and Development
      </h1>
      <div className="divider w-1/4  mx-auto before:bg-yellow-300 after:bg-yellow-300 mb-12 sm:mb-20 md:mb-32"></div> 
      <div className='flex flex-wrap justify-center gap-20 pb-20'>
        {articles && Array.isArray(articles) && articles.map((article, index) => {
          return (
            <ArticleCard {...article} key={index} />
          )
        })}
      </div>
    </main>
  )
}