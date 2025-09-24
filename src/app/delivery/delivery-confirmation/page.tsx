import React from 'react'

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
                  <span className="w-1/3 text-center ">1</span>
                  <span className="w-1/3  text-center px-2  py-1 bg-[#FFB1B1] rounded-sm">Pending</span>
                </div>
                
          <div className="border-b-2 border-dotted border-gray-900 my-1 w-full"></div>
    </div>
  )
}

export default DeliveyConfermation
