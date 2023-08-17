'use client'

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
      <h1>
        Expanding Education
      </h1>
      <div className=''>
        {articles && Array.isArray(articles) && articles.map((article, index) => {
          return (
            <div className="flex flex-col" key={index}>
              <div>
                {article.title}
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}