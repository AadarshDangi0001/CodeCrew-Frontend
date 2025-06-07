import React from 'react'
import Community from '../components/communitys/Community'

const ContactPage = () => {
  return (
    <div className="contact mt-20">

   
    <div className=" flex flex-col gap-8 bg-black py-16" style={{ paddingLeft: "5vw", paddingRight: "5vw" }}>
      {/* Page Title */}
      <h1 className="maintext">CONTACT US</h1>
      {/* First Block */}
      <div className="bg-[#18181b] rounded-lg shadow-lg p-8 w-full flex flex-col gap-4">
        <h1 className="text-white text-2xl  mb-2">Call Us</h1>
        <h3 className="text-zinc-200">+91 9516010257</h3>
        <h3 className="text-zinc-200">+91 7828027332</h3>
      </div>
      {/* Second Block */}
      <div className="bg-[#18181b] rounded-lg shadow-lg p-8 w-full flex flex-col gap-4">
        <h1 className="text-white text-2xl  mb-2">Email Us</h1>
        <h3 className="text-zinc-200">codecrew0001@gmail.com</h3>
        <h3 className="text-zinc-200">aadarshdangi0001@gmail.com</h3>
      </div>
    </div>

    <Community/>

     </div>
  )
}

export default ContactPage
