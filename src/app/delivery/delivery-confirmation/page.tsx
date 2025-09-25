import React from 'react'
import { FiX } from "react-icons/fi";
function DeliveyConfermation
() {
  return (<div className='px-4 lg:px-20'>
    <div className='flex items-center justify-center sm:justify-center flex-col sm:flex-row gap-2 mt-6 sm:mt-2'>
<div className='flex items-center justify-between sm:justify-center w-full  '>
<p className='text-lg font-semibold'> Order Number:</p>
<p className='text-lg '> A 00001</p>
</div>

<div className='flex items-center justify-between sm:justify-center  w-full  gap-2  '>
<p className='text-lg font-semibold'> Date of Delivery: </p>
<p className='text-lg '>12/08/2025</p>
</div>

    </div>

<h3 className='mt-3'> Bansal Janakbhai Patel </h3>
<p className='flex justify-start items-center text-sm font-semibold '> Phone: <span className='font-light'>90990 59585</span> </p>

    {/* Table Header */}
                <div className="flex justify-between px-6 mt-6 border-b border-black pb-2 text-sm font-semibold">
                  <span className="w-2/5">Product Name</span>
                  <span className="w-1/2 text-center">Qtt</span>
               
                    <span className="w-1/6 text-right ">Status</span>
                </div>
          
                {/*orders list */}
                <div className="px-6 py-3  flex justify-between items-start text-sm">
                     <span className="w-2/3 flex flex-col">
                     <p className='font-semibold'>Fame:</p>
                     <p className='font-normal'>Reyban R33 Black</p>
                     <p className='font-semibold'>Glass:</p>
                     <p className='font-normal'>Crizal </p>
                     <p className='text-[0.8rem] font-light'>1. LE-D</p>
                          <p className='text-[0.8rem] font-light'>2. RE-D</p>
                     </span>
                  <span className="w-1/3 text-center flex gap-6  flex-col ">
                  <p>1</p>
                          <p>2</p>
                  </span>
                  <span className="w-1/3  text-center px-2  py-1 bg-[#FFB1B1] rounded-sm">Pending</span>
                </div>
                
          <div className="border-b-2 border-dotted border-gray-900 my-1 w-full"></div>
                         <div className="px-6 py-3  flex justify-between items-start text-sm">
                     <span className="w-2/3 flex flex-col">
                     <p className='font-semibold'>Fame:</p>
                     <p className='font-normal'>Idee I1023 Blue Gold</p>
                     <p className='font-semibold'>Glass:</p>
                     <p className='font-normal'>Plain KT </p>
                    
                     </span>
                  <span className="w-1/3 text-center flex gap-6  flex-col ">
                  <p>1</p>
                  
                  </span>
                  <span className="w-1/3  text-center px-2  py-1 bg-[#FFB1B1] rounded-sm">Pending</span>
                </div>
                 <div className="border-b-2 border-dotted border-gray-900 my-1 w-full"></div>
                         <div className="px-6 py-3  flex justify-between items-start text-sm">
                     <span className="w-2/3 flex flex-col">
                     <p className='font-semibold'>Fame:</p>
                     <p className='font-normal'>Idee I1023 Blue Gold</p>
                     <p className='font-semibold'>Glass:</p>
                     <p className='font-normal'>Plain KT </p>
                    
                     </span>
                  <span className="w-1/3 text-center flex gap-6  flex-col ">
                  <p>1</p>
                  
                  </span>
                  <span className="w-1/3  text-center px-2  py-1 bg-[#FFB1B1] rounded-sm">Pending</span>
                </div>
                
         

                {/* Total */}
      <div className="px-6 py-3 flex justify-between font-semibold border-t border-black text-sm">
        <span>Total 6 </span>
                <span>6 </span>
        <span>24850.00</span>
      </div>
      
                    <div className="border-b  border-black my-1 w-full"></div>

             <h2 className='text-lg text-center mt-8 mb-3 font-semibold'>Payment Details </h2>

    {/* Table Header */}
                <div className="flex justify-between px-6 mt-6 border-b border-black pb-2 text-sm font-semibold">
                  <span className="w-2/5">Product Name</span>
           
               
                    <span className="w-1/6 text-right ">Amount</span>
                </div>
          
                {/*orders list */}
                <div className="px-6 py-3  flex justify-between items-start text-sm">
                     <span className="w-2/3 flex flex-col">
                     <p className='font-semibold'>Advance Payment</p>
                     <p className='font-normal'>UPI: 1099233801038F3E21</p>
                  
                     </span>
                  <span className="w-1/6 text-right flex gap-6  flex-col ">
                  <p>5000.00</p>
                       
                  </span>
               

                </div>

<div className=' w-[90%] md:w-[60%] mx-auto py-5 flex flex-col gap-3 justify-center items-center border-[1.5px] border-black rounded-3xl bg-white my-3'>
<p className='text-[#FF0000] font-semibold text-sm'>Payable Amount</p> 
<p className='text-[#FF0000] font-semibold text-sm'>19850.00</p>
        <button className="w-[70%] md:w-[50%] mx-auto bg-[#5DD86E] text-black px-8 text-sm sm:px-4 py-3 sm:py-2 rounded-lg flex items-center gap-1 hover:scale-95">
            <FiX className='border-[1.5px] border-black rounded-full'/> Add Payment
          </button>
</div>
  {/* place order*/}
        <div className="flex flex-row text-sm justify-center gap-2 sm:gap-3 my-8">
          <button className="bg-[#5DD86E]  text-black px-8 sm:px-4 py-3 sm:py-2 rounded-lg hover:scale-95">Confirm Delivery </button>
          <button className="bg-black text-white px-8 sm:px-4 py-3 sm:py-2 rounded-lg flex items-center gap-1 hover:scale-95">
            <FiX /> Cancel
          </button>
        </div>
    </div>
  )
}

export default DeliveyConfermation
