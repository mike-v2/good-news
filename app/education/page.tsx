'use client'

import ArticleCard from "@/components/articleCard";
import { useEffect, useState } from "react";

export default function Education() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    async function initArticles() {
      try {
        const response = await fetch('api/news?category=education');
        const data = await response.json();
        console.log('retrieved articles: ', data.articles);

        setArticles(data.articles);
      } catch (error) {
        console.error(error);
      }
    }

    initArticles();
  }, []);

  return (
    <main className="">
      <h1 className="text-center text-4xl sm:text-6xl my-12">
        Expanding Education
      </h1>
      <div className='flex flex-wrap justify-center gap-20'>
        {articles && Array.isArray(articles) && articles.map((article, index) => {
          return (
            <ArticleCard {...article} key={index} />
          )
        })}
      </div>
    </main>
  )
}