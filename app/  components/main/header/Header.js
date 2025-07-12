"use client";
import React from "react";
import Image from "next/image";
import "./header.css"
import { useState } from "react";
import { FaBars } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";

// MUI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    
    backgroundColor: 'var(--background)',
    border: '2px solid var(--primary-color)',
    borderRadius: '10px',
    boxShadow: 24,
    padding: "30px 20px",
    display: "flex",
    fontFamily: "var(--font-cairo)",

};


function Header() {
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const toggleMenu = () => {
        console.log(isOpenMenu)
        setIsOpenMenu(prev => !prev)
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {setOpen(true)
        setOpenRegister(false)
    };
    const handleClose = () => setOpen(false);

    const [openRegister, setOpenRegister] = React.useState(false);
    const handleOpenRegister = () => {
        setOpenRegister(true)
        setOpen(false)
    };
    const handleCloseRegister = () => setOpenRegister(false);
    return (
        <div className=" fixed w-full bg-[var(--second-color)] !z-50">

            <div className="container">

                <nav className="!w-full flex items-center justify-bettwen gap-5 relative">
                    {/* Logo Header */}
                    <div className="logo flex-[0_0_20%]">
                        <a href="#home">قصة</a>
                    </div>

                    {/* nav links */}
                    <div className={`${isOpenMenu ? "show" : ""} nav grid grid-cols-[55%_45%] w-full `}>
                        <ul className={`flex items-center justify-center w-full `}>
                            <li><a href="#home">الصفحة الرئيسية</a></li>
                            <li><a href="#verse">آية</a></li>
                            <li><a href="#last_stories">أحدث القصص</a></li>
                            <li><a href="#contact">تواصل معنا</a></li>

                        </ul>

                        <div className="flex items-center justify-center gap-4 !w-full h-full btns">
                            <Image src={"/prfilo-Icon.png"}
                                width={50}
                                height={50}
                                alt="prfilo_image"
                            />
                            <Button href="#login" onClick={handleOpen} className="btn md:!py-3 md:!px-3 !py-2 !px-3 max-lg:!text-[16px] !text-lg !rounded-lg  ">تسجيل الدخول</Button>
                            <Button href="#register" onClick={handleOpenRegister}  className="btn-out md:!py-3 md:!px-3 !py-2 !px-3 max-lg:!text-[16px] !text-lg !rounded-lg  ">إنشاء حساب</Button>
                            <Button href="#logout" className="btn  md:!py-3 md:!px-3 !py-2 !px-3 max-sm:!text-[16px] !text-lg !rounded-lg !bg-red-800 !hidden">تسجيل الخروج</Button>
                        </div>

                    </div>



                    <h1 className={`menu absolute left-0 text-4xl cursor-pointer  ${isOpenMenu ? "text-red-500" : ""} `} onClick={toggleMenu}>{isOpenMenu ? <FaXmark /> : <FaBars />}</h1>


                </nav>


            </div>
            
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ ...style, fontFamily: 'var(--font-body)' }} className="!flex-col items-center justify-center gap-4">
                    <Typography id="modal-modal-title" variant="h6" component="h2" className="!text-right !font-[var(--font-body)]">
                        تسجيل دخول
                    </Typography>
                    <TextField id="outlined-basic" label="البريد الأكتروني" variant="outlined" className="!text-right !font-[var(--font-body)]"
                        fullWidth />
                    <TextField id="outlined-basic" label="كلمة السر" variant="outlined" className="!text-right !font-[var(--font-cairo)]"
                        fullWidth />
                    <Button className="btn !py-3 !px-4 !mt-2 !text-lg">تسجيل دخول</Button>
                    <p>هل ليس لديك حساب؟ <span className="text-[var(--primary-color)] cursor-pointer" onClick={handleOpenRegister} >إنشاء  حساب جديد</span></p>
                </Box>
            </Modal>

            
            <Modal
                open={openRegister}
                onClose={handleCloseRegister}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ ...style, fontFamily: 'var(--font-body)' }} className="!flex-col items-center justify-center gap-4 w-[30vw] max-lg:w-[40vw] max-md:w-[60vw] max-sm:!w-[90vw]">
                    <Typography id="modal-modal-title" variant="h6" component="h2" className="!text-right !font-[var(--font-body)]">
                        <h2>إنشاء حساب</h2>
                    </Typography>
                    <TextField id="outlined-basic" label="الإسم الكامل" variant="outlined" className="!text-right !font-[var(--font-body)]"
                        fullWidth />
                        <TextField id="outlined-basic" label="اسم المستخدم" variant="outlined" className="!text-right !font-[var(--font-body)]"
                        fullWidth />
                    <TextField id="outlined-basic" label="البريد الأكتروني" variant="outlined" className="!text-right !font-[var(--font-body)]"
                        fullWidth />
                    <TextField id="outlined-basic" label="كلمة السر" variant="outlined" className="!text-right !font-[var(--font-cairo)]"
                        fullWidth />
                    <Button className="btn !py-3 !px-4 !mt-2 !text-lg">إنشاء حساب</Button>
                    <p>هل لديك حساب؟ <span className="text-[var(--primary-color)] cursor-pointer" onClick={handleOpen} >تسجيل دخول</span></p>
                </Box>
            </Modal>
        </div>
    );
}


export default Header