"use client";

import { TfiBackRight } from "react-icons/tfi";
import axois from "axios"
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import URL from "../../URL";
import ErrorLoading from "@/app/  components/Basic_Components/ErrorLoading";
import Loading from "@/app/  components/Basic_Components/Loading";
import Header from "@/app/  components/Basic_Components/stories/Header";
const Story = () => {
  const { id } = useParams()
  const [story, setStory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [realod, setReload] = useState(false)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const res = await axois.get(`${URL}api/stories/${id}`)
        const result = await res.data.story
        setStory(result)
        setLoading(false)
        setError(false)

      } catch (error) {
        console.log("somethings went wrog.", error)
        setError(true)
        setLoading(false)

      }
    }
    fetchData()
  }, [realod])
  return (
    <>
      {/* رأس الصفحة */}
      <Header path="/stories"/>




      {/* محتوى المقالة */}
      <div className="!pt-[90px] !pb-16 flex items-center justify-center w-full" >
        <div className="container max-w-5xl mx-auto !px-4  !flex items-center !justify-center">
          {!error && !loading && <div className="bg-[var(--second-color)] rounded-2xl shadow-lg !p-6 !space-y-8">
            {/* العنوان */}
            <h2 className="!text-3xl font-bold border-b !pb-4">{story.title}</h2>

            {/* النص + الصورة داخله باستخدام float */}
            <div className="relative">
              <p className="!text-base !leading-loose text-justify !p-2 !w-full !h-full">

                {
                  story.image && story.image.length > 0 ? (
                    <img
                      src={story.image}
                      alt="صورة القصة"
                      className="float-left w-[200px] h-auto !mr-6 !mb-4 rounded-xl shadow"
                    />) : ""
                }
                {story.content}
                <span className=" float-end !m-3 text-[var(--primary-color)]">
                  المصدر: {story.surce}
                </span>
              </p>
            </div>

          </div>}
          {loading && <Loading />}
          {error && <ErrorLoading onClick={() => {
            setReload((prev) => !prev)
            setError(false)
          }} />}

        </div>
      </div>

    </>
  );
};

export default Story;
