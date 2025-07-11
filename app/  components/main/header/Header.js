"use client";
import "./header.css"
import { useState } from "react";
import { FaBars } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";
function Header() {
    const [ isOpenMenu, setIsOpenMenu ] = useState(false)
    const toggleMenu = ()=>{
        console.log(isOpenMenu)
        setIsOpenMenu(prev => !prev)
    }
    return (
        <div className=" fixed w-full bg-[var(--second-color)] !z-50">

            <div className="container">

                <nav className="  w-full flex items-center justify-between">
                    {/* Logo Header */}
                    <div className="logo">
                        <a href="#home">قصة</a>
                    </div>
                    
                    {/* nav links */}
                    <ul className={`${isOpenMenu? "show" : ""} !gap-[7px]`}>
                        <li><a href="#home">الصفحة الرئيسية</a></li>
                        <li><a href="#verse">آية</a></li>
                        <li><a href="#last_stories">أحدث القصص</a></li>
                        <li><a href="#contact">تواصل معنا</a></li>
                        
                    </ul>
                     
                     <h1 className={`menu text-4xl cursor-pointer  ${isOpenMenu? "text-red-500": ""} `} onClick={toggleMenu}>{isOpenMenu? <FaXmark/> : <FaBars/>}</h1>
                </nav>
            </div>
        </div>
    );
}


export default Header