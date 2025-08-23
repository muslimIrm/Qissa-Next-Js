"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

function StoryMap({ stories, isOwner = false, state = "published" }) {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserId(localStorage.getItem("id"));
    }
  }, []);

  // فلترة القصص إذا هو صاحب الحساب
  // const filteredStories = isOwner
  //   ? stories.filter((story) => story.user._id === userId)
  //   : stories;
  let filteredStories = [];
  if (stories) {
    if (isOwner) {
      if (state === "published") {
        filteredStories = stories.filter(
          (story) => story.user._id === userId && story.state === "published"
        );
      } else if (state === "pending") {
        filteredStories = stories.filter(
          (story) => story.user._id === userId && story.state === "pending"
        );
      } else if (state === "rejected") {
        filteredStories = stories.filter(
          (story) => story.user._id === userId && story.state === "rejected"
        );
      }
    } else {
      if (state === "published") {
        filteredStories = stories.filter((story) => story.state === "published");
      }
    }

  }
  console.log("filter is: ")
  console.log(stories)


  return (
    stories.length !== 0 &&
      <>
        {filteredStories.length !== 0 ? filteredStories.map((story, index) => (
          <div className="card" key={index}>
            {story.image && story.image.length > 0 && (
              <div className="image-card">
                <Image
                  src={story.image}
                  width={400}
                  height={400}
                  alt="card-image"
                />
              </div>
            )}
            <div className="content-card">
              <h2 className="title-card">{story.title}</h2>
              <p className="description-card">
                {story.content.length > 200
                  ? story.content.slice(0, 200) + "..."
                  : story.content}
              </p>
              <span className="surce-card">{story.surce}</span>
              <Link href={`/stories/${story._id}`} className="read-more">
                اقرأ المزيد
              </Link>
            </div>

          </div>
        )) :
          <div className="!flex !items-center !justify-center !text-center !w-full">
            <p>لا توجد أي قصة.</p>

          </div>
        }


      </>
      
  );
}

export default StoryMap;
