
import { FaInstagram } from "react-icons/fa";
import { FaTelegram,FaLinkedin } from "react-icons/fa6"
function Footer(){

    return(
        <footer className=" w-full">
            <div className="container flex !flex-col gap-6 justify-center items-center">
                <div className="title">
                    <h1>قصـة</h1>
                </div>
                <div className="flex w-full">
                        <ol className="flex gap-6 w-full justify-center items-center sm:flex-row flex-col">
                            <li><a href="#home" className=" hover:!underline transition-all ">الصفحة الرئيسية</a></li>
                            <li><a href="#verse" className=" hover:!underline transition-all ">آية</a></li>
                            <li><a href="#last_stories" className=" hover:!underline transition-all ">أحدث القصص</a></li>
                            <li><a href="#contact" className=" hover:!underline transition-all ">تواصل معنا</a></li>
                        </ol>
                </div>
                <div className="flex gap-4">
                    <a className=" inline-block text-2xl transition-all hover:scale-110 transform" href="https://www.instagram.com/ms0h_0/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                    <a className=" inline-block text-2xl transition-all hover:scale-110 transform" href="https://t.me/codil0"  target="_blank" rel="noopener noreferrer"><FaTelegram /></a>
                    <a className=" inline-block text-2xl transition-all hover:scale-110 transform" href="https://www.linkedin.com/in/muslim-hashim-5863a3344?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer"> <FaLinkedin/></a>
                </div>
                
                <span>جميع الحقوق محفوظة &copy; 2025</span>
            </div>
        </footer>
    );
}

export default Footer