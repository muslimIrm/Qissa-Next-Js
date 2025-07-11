"use client";

import { useState, useEffect, } from "react"
import axios from "axios"
import URL from "../URL"
import Link from "next/link";
import '../  components/main/last_sotries/lastStories.css'
import Loading from "../  components/Basic_Components/Loading";
import ErrorLoading from "../  components/Basic_Components/ErrorLoading";
import Header from "../  components/Basic_Components/stories/Header";
import StoryMap from "../  components/main/last_sotries/Components/storiesMap";
const stories = () => {
    const [stories, setStories] = useState([])

    const [limit] = useState(5)
    const [page, setPage] = useState(1)

    const [hasMore, setHasMore] = useState(true)
    const [loading, setLoading] = useState(false)
    const [reload, setReload] = useState(false);

    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchData() {
            console.log("pages is:", page)
            if (loading || !hasMore) return;
            console.log("running")
            setLoading(true)
            console.log(hasMore)
            try {
                const res = await axios.get(`${URL}api/stories?limit=${limit}&page=${page}`)
                const newStories = await res.data.storiesRaw
                setStories(prev => {
                    const existingIds = new Set(prev.map(s => s._id));
                    const uniqueStories = newStories.filter(s => !existingIds.has(s._id));
                    return [...prev, ...uniqueStories];
                });

                const totalPages = res.data.totalPages;
                if (page >= totalPages || newStories.length === 0) {
                    setHasMore(false)
                }
                setError(false);

            } catch (error) {
                if (error.message === "Network Error") {
                    setError(true);
                } else {
                    setHasMore(false)
                }

            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [page, reload])

    useEffect(() => {
        const handleScroll = () => {
            const scrollBottm = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
            if (scrollBottm && !loading && hasMore) {
                setPage((prev) => prev + 1)
            }
        }

        window.addEventListener("scroll", handleScroll)

        return () => {
            console.log("🧹 scroll listener removed")
            window.removeEventListener("scroll", handleScroll)
        }

    }, [hasMore, loading])

    return (
        <>
            {/* رأس الصفحة */}
            <Header path="/"/>

            <div className="felx w-full !h-dvh">
                <div className="content container !h-full">
                    <div className="stories container flex !flex-col gap-4 !mt-24">
                        <StoryMap stories={stories}/>

                        {loading && (<Loading />)}

                        {error && (
                            <ErrorLoading onClick={() => {
                                setError(false);
                                setLoading(false);
                                setHasMore(true);
                                setReload((prev) => !prev)
                                setPage(1);
                                setStories([]);
                            }} />
                        )}

                        {hasMore === false && (
                            <span className="text-center">لا توجد قصص اضافية حاليًا.</span>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default stories;
