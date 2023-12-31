import Image from "next/image";
import { useState } from "react";
import { Open_Sans, Lora } from "next/font/google";

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: '500',
});

const lora = Lora({
  subsets: ['latin'],
  weight: '500',
});

export default function ArticleCard(article: Article) {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <a href={article.url} className="flex flex-col md:flex-row gap-4 border-2 border-slate-400 shadow-lg p-2 hover:rounded-xl hover:bg-slate-100 hover:shadow-none hover:scale-105 transition-all duration-300" onMouseEnter={e => setIsHovered(true)} onMouseLeave={e => setIsHovered(false)} target="_blank">
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
        <h3 className={`${lora.className} text-3xl mb-4`}>
          {article.title}
        </h3>
        {article.source && article.source !== '' &&
          <p className={`${openSans.className} text-lg font-bold`}>{article.source}</p>
        }
        {article.author && article.author !== '' &&
          <p className={`${openSans.className} italic text-sm text-slate-500`}>{article.author}</p>
        }
      </div>
    </a>
  )
}