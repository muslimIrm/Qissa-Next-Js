"use client";

import { toast, ToastContainer } from 'react-toastify';
import Form from './component/Form';
function ContactSection() {
  
  return (

    <section id="contact" className="!py-16 bg-[var(--second-color)]">
      <div className="container flex !flex-col gap-6">
        <div className="title !mb-10">
          <h1 className="text-[var(--heading-color)] text-3xl sm:text-4xl font-bold text-center">
            تواصل معنا
          </h1>
        </div>
        <div className="bg-[var(--background)] mb:w-[80%] w-full !mx-auto !p-8 md:!p-12 rounded-2xl shadow-xl">
            <Form toast={toast}/>
        </div>
      </div>

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
       
    </section>
  )
}

export default ContactSection;
