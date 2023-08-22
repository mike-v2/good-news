'use client'

export default function About() {
  return (
    <div className="flex flex-col gap-y-8 max-w-3xl px-2 sm:px-6 mx-auto py-16">
      <h1 className="text-5xl text-center">
        About Us
      </h1>

      <div className="flex flex-col gap-y-4">
        <h3 className="text-2xl">
          Our Mission
        </h3>
        <p>
          At GoodNews!, we believe in the power of positive storytelling. Our mission is to shine a light on the inspiring, uplifting, and transformative stories that are taking place all around us, every day. We aim to showcase global advancements in healthcare, education, peace initiatives, and building and construction projects that are paving the way for a brighter future.
        </p>
      </div>

      <div className="flex flex-col gap-y-4">
        <h3 className="text-2xl">
          Our Philosophy
        </h3>
        <p>
          We are not here to whitewash the challenges our world faces. We are well aware of the issues that need urgent attention and action. Instead, we are here to celebrate the resilience of the human spirit and to remind ourselves that progress is being made, step by step. We curate stories that we hope will inspire you, motivate you, and provide a vision of what is possible when we come together as a community.
        </p>
      </div>

      <div className="flex flex-col gap-y-4">
        <h3 className="text-2xl">
          Why Positive News?
        </h3>
        <p>
          In a world where the media landscape can be overwhelmingly negative, GoodNews! serves as a refreshing alternative. We aim to:
        </p>
        <ul className="flex flex-col gap-y-2">
          <li><span className="font-bold">Inspire Action:</span> By showcasing success stories and innovations, we hope to inspire you to take positive actions in your own communities.</li>
          <li><span className="font-bold">Promote Mental Well-being:</span> Regular exposure to positive news can help combat stress and promote a more optimistic outlook on life.</li>
          <li><span className="font-bold">Provide a Balanced Perspective:</span> We strive to complement the often grim realities reported in mainstream media, offering a more holistic and balanced view of the world.</li>
        </ul>
      </div>

      <div className="flex flex-col gap-y-4">
        <h3 className="text-2xl">
          Our Approach
        </h3>
        <ul className="flex flex-col gap-y-2">
          <li><span className="font-bold">Global Aggregation:</span> We gather stories from reputable sources around the world, ensuring a diverse and global perspective.</li>
          <li><span className="font-bold">AI Evaluation:</span> Each story is reviewed using advanced AI algorithms, trained to identify impactful and genuinely positive stories.</li>
          <li><span className="font-bold">Ethical Curation:</span> We prioritize the integrity of our platform by meticulously respecting and crediting the original sources of our stories. We understand the value of original content and are committed to highlighting and directing our readers to the primary sources.</li>
        </ul>
      </div>

      <div className="flex flex-col gap-y-4">
        <h3 className="text-2xl">
          Join Us
        </h3>
        <p>
          Be part of our journey to inspire and uplift. Don&apos;t forget to share the stories that move you!
        </p>
        <p>
          Thank you for being a beacon of positivity with GoodNews!.
        </p>
      </div>
    </div>
  )
}