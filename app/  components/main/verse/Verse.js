"use client";
import { useState, useEffect } from "react"
import axois from "axios"
import URL from "../../../URL"

function Verse(){
    const [ verse, setVerse ] = useState({text: " لَقَدْ كَانَ فِي قَصَصِهِمْ عِبْرَةٌ لِّأُولِي الْأَلْبَابِ", verse: "111", chapter: "12"})
    useEffect(()=>{
        async function fetchDante() {
            
            const res = await axois.get(`${URL}api/today-verse`)
            const result = await res.data
            setVerse(result)
        }
        fetchDante()
        
    }, [])
    return(
        <section id="verse" className=" w-full">
            <div  className="container flex !flex-col gap-6">
                <div className="title">
                    <h1>آيـــــــــــة</h1>
                </div>
                <div className="flex gap-5 !px-5 flex-col items-center justify-center bg-[var(--second-color)] rounded-2xl !py-15">
                    <p className="text-3xl leading-13 verse" >{`﴿ ${verse.text} ﴾`}</p>
                    <span className="text-lg">{`السورة ${verse.chapter}/ الآية ${verse.verse}`}</span>
                </div>
            </div>
        </section>
    )
}

export default Verse