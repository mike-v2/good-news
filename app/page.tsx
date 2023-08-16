'use client'

import { firestoreDB } from '@/utils/firebase';
import axios from 'axios';
import Image from 'next/image'
import { useEffect, useState } from 'react';



export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    async function initArticles() {
      try {
        const response = await axios.get('api/news');
        console.log('retrieved articles: ', response.data.articles);

        setArticles(response.data.articles);
      } catch (error) {
        console.error(error);
      }
    }

    initArticles();
  }, []);

  return (
    <main className="">
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
