import React from 'react'
import QrCode from  "@/assets/imges/QRCode.png"
import Image from 'next/image'
import { FiX } from "react-icons/fi";
function page() {
  return (
    <div>
  <h2 className="text-xl text-center my-5 lg:text-2xl font-semibold mb-4">Order Number:</h2>
        {/* Head part */}
          <div className="flex items-center justify-center gap-1.5 px-2  mt-2.5">
            <div className="flex items-center bg-white border-[1px] border-black rounded-lg px-3 py-2 w-full md:w-1/3">
              <input
                type="text"
                placeholder="Search product"
                className="flex-1 bg-transparent outline-none text-sm"
              />
           
            </div>
     
            <button className="w-[30%] md:max-w-[15vw] flex items-center justify-center gap-2 text-sm py-2 px-2 rounded-full bg-black text-white">
            Find
            </button>
          </div>
          <h3 className='text-center font-semibold text-xl my-3 sm:my-2'>Or</h3>
          <div className='flex items-center justify-center '> 
            <div className='border-[1px] border-black rounded-lg pt-3.5 '>
            <div className='px-4.5 py-2'> <Image src={QrCode} alt="QR Code" width={100} height={100} /></div>   
                <div className='w-full border-t-2 text-center border-black py-3 mt-1 '>
                    Scan QR
                    </div>
                 </div>
          </div>

               {/* Table Header */}
                <div className="flex justify-between px-6 mt-14 sm:mt-6 border-b border-black pb-2 text-sm font-semibold">
                  <span className="w-2/3">Order No</span>
                  <span className="w-1/6 text-center">Client Name</span>
                  <span className="w-1/6 text-right">Qtt</span>
                    <span className="w-1/6 text-right">Delivery Date</span>
                </div>
          
                {/*orders list */}
                <div className="px-6 py-3  flex justify-between items-start text-sm">
                     <span className="w-2/3">0100101</span>
                  <span className="w-1/6 text-center">Bansal Patel</span>
                  <span className="w-1/6 text-right">5</span>
                    <span className="w-1/6 text-right"> 12/08/2025</span>

                
                </div>
          <div className="border-b-2 border-dotted border-gray-900 my-1 w-full"></div>
                       
                {/*orders list */}
                <div className="px-6 py-3  flex justify-between items-start text-sm">
                     <span className="w-2/3">0100101</span>
                  <span className="w-1/6 text-center">Bansal Patel</span>
                  <span className="w-1/6 text-right">5</span>
                    <span className="w-1/6 text-right"> 12/08/2025</span>

                
                </div>
          <div className="border-b-2 border-dotted border-gray-900 my-1 w-full"></div>          
                {/*orders list */}
                <div className="px-6 py-3  flex justify-between items-start text-sm">
                     <span className="w-2/3">0100101</span>
                  <span className="w-1/6 text-center">Bansal Patel</span>
                  <span className="w-1/6 text-right">5</span>
                    <span className="w-1/6 text-right"> 12/08/2025</span>

                
                </div>
          <div className="border-b-2 border-dotted border-gray-900 my-1 w-full"></div>          
                {/*orders list */}
                <div className="px-6 py-3  flex justify-between items-start text-sm">
                     <span className="w-2/3">0100101</span>
                  <span className="w-1/6 text-center">Bansal Patel</span>
                  <span className="w-1/6 text-right">5</span>
                    <span className="w-1/6 text-right"> 12/08/2025</span>

                
                </div>
          <div className="border-b-2 border-dotted border-gray-900 my-1 w-full"></div>   
              
              
              <div className='flex justify-center items-center my-4'><button className="bg-black text-white text-sm px-8 sm:px-4 py-3 sm:py-2 rounded-lg flex items-center justify-center gap-1 hover:scale-95">
                                   <FiX /> Cancel
                                 </button></div> 
    </div>
  )
}

export default page