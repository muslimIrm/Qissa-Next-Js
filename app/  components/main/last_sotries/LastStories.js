"use client";

import { useState, useEffect,  } from "react"
import "./lastStories.css"
import axois from "axios"
import URL from "../../../URL"

import Loading from "../../Basic_Components/Loading"
import ErrorLoading from "../../Basic_Components/ErrorLoading"
import Link from "next/link"
import StoryMap from "./Components/storiesMap"
function LastStories(){
    const [stories, setStories] = useState([])

    const [loading, setLoading] = useState(false)
    const [reload, setReload] = useState(false);
    const [error, setError] = useState(false)
    useEffect(()=>{
        async function fetchData(){
            setLoading(true)
            try {
                const res = await axois.get(`${URL}api/stories`)
                const storiesRaw = res.data.storiesRaw
                setStories(storiesRaw)
                setLoading(false)
                setError(false)
                
            } catch (error) {
                 console.log("somethings went wrog.", error)
                 setError(true)
                 setLoading(false)
            }
            
        }
        fetchData()
    }, [reload])
    return(
        <section className=" w-full" id="last_stories">
            <div className="container flex max-md:gap-6 !flex-col items-center justify-center">
                <div className="title">
                    <h1>أحدث القصص</h1>
                </div>

                <div className="content">
                    <div className="stories flex items-center justify-center flex-col max-md:flex-col gap-4">
                        <StoryMap stories={stories}/>
                        {loading && (<Loading/>)}
                        {!error && <Link href="/stories" className={`btn ${loading? "hidden-important": ""}`} >المزيد من القصص</Link>}
                        {error && (<ErrorLoading onClick={()=>{
                            setReload((prev)=> !prev)
                            setError(false)
                        }
                        }/>)}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LastStories;