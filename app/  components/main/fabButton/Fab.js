"use client"
import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import Fab from '@mui/material/Fab';
import { useIsAuthenticated } from "@/app/contexts/IsAuthenticatedContext";
import CreateStory from "../../models/CreateStory";
import axios from "axios";
import URL from "@/app/URL";
import { toast, ToastContainer } from 'react-toastify';

function FabButton() {
    const { isAuthenticated, setIsAuthenticated } = useIsAuthenticated()


    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Dummy submit handler, replace with your logic
    const handleSubmit = async (storyData) => {
        const formdata = new FormData()
        formdata.append("title", storyData.title)
        formdata.append("content", storyData.content)
        formdata.append("surce", storyData.surce)
        if (storyData.image) {
            formdata.append("image", storyData.image)
        }
        console.log(storyData)
        const token = localStorage.getItem("token");
        try {
            const auth = `Bearer ${token}`
            const result = await axios.post(`${URL}api/stories`, formdata, {
                headers: {
                    Authorization: auth
                }
            })
            console.log(result.response)
            toast.success("سيتم مراجعة القصة.")
            setOpen(false);
            return true;

        } catch (error) {
            console.log(error)
            if (error.message === "Network Error") {
                toast.error("خطأ في الاتصال بالخادم، يرجى التحقق من اتصالك بالإنترنت.")
                return false;
            }
            toast.error(error.response.data.message)
                return false;



        }
    };

    return (
        <>
            <Fab
                color="primary"
                aria-label="add"
                className={` !fixed !bottom-15 md:!right-16 sm:!right-10`}
                style={{ display: isAuthenticated ? "flex" : "none" }}
                onClick={handleOpen}
            >
                <IoMdAdd />
            </Fab>
            <CreateStory open={open} onClose={handleClose} onSubmit={handleSubmit} />

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
        </>
    );
}

export default FabButton;