import Image from "next/image";


export default function ArticleCard(article: Article) {

  return (
    <a href={article.url} className="w-72">
      <div className="h-72 mb-4">
        {article.image && article.image !== '' &&
          <div className="flex flex-col justify-end h-full">
            <img src={article.image} height={300} width={300} alt="article image" />
          </div>
        }
        {(!article.image || article.image === '') &&
          <Image src='/images/no-image.jpg' height={300} width={300} alt="no image" />
        }
      </div>
      <h3 className="text-3xl mb-4">
        {article.title}
      </h3>
      {article.source && article.source !== '' &&
        <p className="text-lg font-bold">{article.source}</p>
      }
      {article.author && article.author !== '' &&
        <p className="italic text-sm">{article.author}</p>
      }
      <p></p>
    </a>
  )
}