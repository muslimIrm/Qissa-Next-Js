"use client";
import React from "react";
import Image from "next/image";
import "./header.css"
import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';

// MUI
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import URL from "@/app/URL";
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
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const token = localStorage.getItem("token") ? localStorage.getItem("token") : false



    // verify tokne & user
    useEffect(() => {
        const verifyToken = async () => {
            if (token) {
                try {
                    const auth = `Bearer ${token}`

                    const result = await axios.post(`${URL}api/verifytoken`, {}, {
                        headers: {
                            Authorization: auth
                        }
                    })

                    // const user = result.response.data.user;

                    setIsAuthenticated(!!token);
                    setImageUrl(result.data.user.account_icon)
                    console.log(result.data.message)
                    toast.success("انت مسجل دخول بنجاح!")
                } catch (error) {
                    console.log(error)
                    if (error.message === "Network Error") {
                        toast.error("خطأ في الاتصال بالخادم، يرجى التحقق من اتصالك بالإنترنت.")
                        return;
                    }
                    toast.error(error.response.data.message)

                }
            } else {
                setIsAuthenticated(!!token)
            }


        }
        verifyToken();
    }, []);


    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const toggleMenu = () => {
        console.log(isOpenMenu)
        setIsOpenMenu(prev => !prev)
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true)
        setOpenRegister(false)
    };
    const handleClose = () => setOpen(false);

    const [openRegister, setOpenRegister] = React.useState(false);
    const handleOpenRegister = () => {
        setOpenRegister(true)
        setOpen(false)
    };
    const handleCloseRegister = () => setOpenRegister(false);

    const [imageUrl, setImageUrl] = useState(null)
    // Login

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")



    const loginHandler = async (e) => {
        e.preventDefault();
        console.log(email, password)
        try {
            const result = await axios.post(`${URL}api/users/login/`, { email, password })
            console.log(result)
            if (result.data.user.account_icon) {
                setImageUrl(result.data.user.account_icon)
            }
            toast.success(result.data.message)
            const userToken = result.data.token
            localStorage.setItem("token", userToken)
            setIsAuthenticated(true)

        } catch (error) {
            console.log(error)
            if (error.message === "Network Error") {
                toast.error("خطأ في الاتصال بالخادم، يرجى التحقق من اتصالك بالإنترنت.")
                return;
            }
            toast.error(error.response.data.message)
        } finally {
            handleClose()
        }

    }


    // Register

    const [emailR, setEmailR] = useState("")
    const [passwordR, setPasswordR] = useState("")
    const [fullname, setFullname] = useState("")
    const [username, setUsername] = useState("")
    const [image, setImage] = useState(null)
    const registerHandler = async (e) => {
        console.log(image)
        e.preventDefault();
        const formdata = new FormData();
        formdata.append("email", emailR);
        formdata.append("password", passwordR);
        formdata.append("fullname", fullname);
        formdata.append("username", username);
        if (image) {
            formdata.append("account_icon", image);
        }
        try {
            const result = await axios.post(`${URL}api/users/register/`, formdata
            )

            console.log(result)
            if (result.data.user.account_icon) {
                setImageUrl(result.data.user.account_icon)
                console.log(result.data.user.account_icon)
            }
            toast.success(result.data.message)
            const userToken = result.data.token
            localStorage.setItem("token", userToken)
            setIsAuthenticated(true)


        } catch (error) {
            console.log(error)
            if (error.message === "Network Error") {
                toast.error("خطأ في الاتصال بالخادم، يرجى التحقق من اتصالك بالإنترنت.")
                return;
            }
            toast.error(error.response.data.message)
        } finally {
            handleCloseRegister()
        }

    }


    // Log out

    const logout = async () => {
        const auth = `Bearer ${token}`
        console.log(auth)
        try {
            const result = await axios.post(`${URL}api/users/logout`, {}, {
                headers: {
                    Authorization: auth
                }
            })

            localStorage.removeItem("token")
            setIsAuthenticated(false)
            toast.success(result.data.message)


        } catch (error) {
            console.log(error)
            if (error.message === "Network Error") {
                toast.error("خطأ في الاتصال بالخادم، يرجى التحقق من اتصالك بالإنترنت.")
                return;
            }
            toast.error(error.response.data.message)
        }
    }

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

                            {!isAuthenticated ? (
                                <div className={"flex items-center justify-center gap-4"}>
                                    <Button href="#login" onClick={handleOpen} className="btn md:!py-3 md:!px-3 !py-2 !px-3 max-lg:!text-[16px] !text-lg !rounded-lg  ">تسجيل الدخول</Button>
                                    <Button href="#register" onClick={handleOpenRegister} className="btn-out md:!py-3 md:!px-3 !py-2 !px-3 max-lg:!text-[16px] !text-lg !rounded-lg  ">إنشاء حساب</Button>

                                </div>
                            ) : (
                                <div className="flex items-center justify-center gap-4">
                                    <Image src={!imageUrl ? "/prfilo-Icon.png" : imageUrl}
                                        width={50}
                                        height={50}
                                        alt="prfilo_image"
                                        className=" !rounded-full !w-[50px] !h-[50px]"
                                    />
                                    <Button href="#logout" onClick={logout} className="btn  md:!py-3 md:!px-3 !py-2 !px-3 max-sm:!text-[16px] !text-lg !rounded-lg !bg-red-800">تسجيل الخروج</Button>
                                </div>

                            )}
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
                <form style={{ ...style, fontFamily: 'var(--font-body)' }} onSubmit={loginHandler} className="!flex-col items-center justify-center gap-4 w-[30vw] max-lg:w-[40vw] max-md:w-[60vw] max-sm:!w-[90vw]">
                    <Typography id="modal-modal-title" variant="h6" component="h2" className="!text-right !font-[var(--font-body)]">
                        تسجيل دخول
                    </Typography>
                    <TextField id="eamil_input" label="البريد الأكتروني" required type="email" variant="outlined" vlaue={email} onChange={(e) => setEmail(e.target.value)} className="!text-right !font-[var(--font-body)]"
                        fullWidth />
                    <TextField id="password_input" label="كلمة السر" variant="outlined" required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="!text-right !font-[var(--font-cairo)]"
                        fullWidth />
                    <Button className="btn !py-3 !px-4 !mt-2 !text-lg" type="submit">تسجيل دخول</Button>
                    <p>هل ليس لديك حساب؟ <span className="text-[var(--primary-color)] cursor-pointer" onClick={handleOpenRegister} >إنشاء  حساب جديد</span></p>
                </form>
            </Modal>


            <Modal
                open={openRegister}
                onClose={handleCloseRegister}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <form onSubmit={registerHandler} style={{ ...style, fontFamily: 'var(--font-body)' }} className="!flex-col items-center justify-center gap-4 w-[30vw] max-lg:w-[40vw] max-md:w-[60vw] max-sm:!w-[90vw]">
                    <Typography id="modal-modal-title" variant="h6" component="h2" className="!text-right !font-[var(--font-body)]">
                        إنشاء حساب
                    </Typography>
                    <TextField id="fullname" label="الإسم الكامل" required variant="outlined"
                        value={fullname} onChange={(e) => setFullname(e.target.value)}
                        className="!text-right !font-[var(--font-body)]"
                        fullWidth />
                    <TextField id="fullname" label="الصورة الشخصية"
                        type="file" onChange={(e) => setImage(e.target.file[0])}
                        className="!text-right !font-[var(--font-body)]"
                        fullWidth />
                    <TextField id="username" label="اسم المستخدم"
                        required variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)}
                        className="!text-right !font-[var(--font-body)]"
                        fullWidth />
                    <TextField id="emailRegister" label="البريد الأكتروني" type="email"
                        required variant="outlined" value={emailR} onChange={(e) => setEmailR(e.target.value)}
                        className="!text-right !font-[var(--font-body)]"
                        fullWidth />
                    <TextField id="passwordRegister" label="كلمة السر" value={passwordR} onChange={(e) => setPasswordR(e.target.value)}
                        required type="password" variant="outlined" className="!text-right !font-[var(--font-cairo)]"
                        fullWidth />
                    <Button type="submit" className="btn !py-3 !px-4 !mt-2 !text-lg">إنشاء حساب</Button>
                    <p>هل لديك حساب؟ <span className="text-[var(--primary-color)] cursor-pointer" onClick={handleOpen} >تسجيل دخول</span></p>
                </form>
            </Modal>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={true}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}


export default Header