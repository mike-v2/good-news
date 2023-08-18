import Image from "next/image";
import { useState } from "react";


export default function ArticleCard(article: Article) {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <a href={article.url} className="flex flex-col md:flex-row gap-4 border-2 border-black shadow-lg p-2 hover:rounded-xl hover:bg-slate-100 hover:shadow-none hover:scale-105 transition-all duration-300" onMouseEnter={e => setIsHovered(true)} onMouseLeave={e => setIsHovered(false)}>
      <div className="w-72">
        {article.image && article.image !== '' &&
          <div className={`flex flex-col justify-end md:justify-center h-full ${isHovered ? 'scale-105' : ''} transition-all duration-300`}>
            <img src={article.image} className={`${isHovered ? 'rounded-lg' : ''} transition-all duration-500`} height={300} width={300} alt="article image" />
          </div>
        }
        {(!article.image || article.image === '') &&
          <Image src='/images/no-image.jpg' height={300} width={300} alt="no image" />
        }
      </div>
      <div className="flex flex-col justify-center w-72">
        <h3 className="text-3xl mb-4">
          {article.title}
        </h3>
        {article.source && article.source !== '' &&
          <p className="text-lg font-bold">{article.source}</p>
        }
        {article.author && article.author !== '' &&
          <p className="italic text-sm">{article.author}</p>
        }
      </div>
    </a>
  )
}