"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import axios from "axios";
import URL from "../URL";
function StoryMap({ stories, isOwner = false, state = "published" }) {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState("")
  useEffect(() => {
    setToken(localStorage.getItem("token"))
    }, []);
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

    if (state === "published") {
      filteredStories = stories.filter(
        (story) => story.state === "published"
      );
    } else if (state === "pending") {
      filteredStories = stories.filter(
        (story) => story.state === "pending"
      );
    } else if (state === "rejected") {
      filteredStories = stories.filter(
        (story) => story.state === "rejected"
      );
    }



  }
  console.log("filter is: ")
  console.log(stories)

  const published = async (storyId) => {
     try {
      console.log(storyId)
      const updateData = new FormData();
      updateData.append("state", "published");

      await axios.put(`${URL}api/stories/${storyId}`, updateData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success("تم الموافقة بنجاح");

    } catch (error) {
      console.error("Edit error:", error);
      toast.error("حدث خطأ في الموافقة");
    }
  }

  const rejected = async (storyId) => {
     try {
      console.log(storyId)
      const updateData = new FormData();
      updateData.append("state", "rejected");

      await axios.put(`${URL}api/stories/${storyId}`, updateData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success("تم رفض القصة بنجاح");

    } catch (error) {
      console.error("Edit error:", error);
      toast.error("حدث خطأ في الرفض");
    }
  }
  
  const pending = async (storyId) => {
     try {
      console.log(storyId)
      const updateData = new FormData();
      updateData.append("state", "pending");

      await axios.put(`${URL}api/stories/${storyId}`, updateData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success("تم نقل القصة الى قيد المراجعة بنجاح");

    } catch (error) {
      console.error("Edit error:", error);
      toast.error("حدث خطأ في النقل");
    }
  }
  return (
    stories.length !== 0 &&
    <>
      {filteredStories.length !== 0 ? filteredStories.map((story, index) => (
        <div className="card" key={index}>
          <div className="content-card">
            <h2 className="title-card">{story.title}</h2>
            <p className="description-card">
              {story.content.length > 200
                ? story.content.slice(0, 200) + "..."
                : story.content}
            </p>
            <span>{story.surce}</span>
            <Link href={`dashboard/stories/${story._id}`} className="read-more">
              اقرأ المزيد
            </Link>
          </div>

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
          {
            story.state === "pending"&&
            <div className="flex flex-col !gap-y-2 items-center ">
              <button className="btn !px-3 !py-2 !text-[16px]"  onClick={() => published(story._id)}>موافقة</button>
              <button className="btn !px-3 !py-2 !text-[16px] !bg-red-800" onClick={() => rejected(story._id)}>رفض</button>
            </div>
          }
          {
            story.state === "rejected"&&
            <div className="flex flex-col !gap-y-2 items-center ">
              <button className="btn !px-3 !py-2 !text-[16px]"  onClick={() => published(story._id)}>موافقة</button>
            </div>
          }
          {
            story.state === "published"&&
            <div className="flex flex-col !gap-y-2 items-center ">
              <button className="btn !px-3 !py-2 !text-[16px]"  onClick={() => pending(story._id)}>قيد المراجعة</button>
            </div>
          }
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
