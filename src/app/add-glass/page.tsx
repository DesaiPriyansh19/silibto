import React from 'react'
import { FiX,  FiTrash2 } from "react-icons/fi";

function page() {
  return (
    <div>
<h2 className='text-xl font-semibold text-center my-5'>Add Glass</h2 >
                  <div className="flex items-center bg-white border-[1px] border-black rounded-lg px-3 py-2 mx-auto w-[70%] md:w-[60%]">
              <input
                type="text"
                placeholder="Search glass"
                className="flex-1 bg-transparent outline-none text-sm"
              />
           
            </div>
 {/* Table Header */}
      <div className="flex justify-between px-6 mt-6 border-b border-black pb-2 text-sm font-semibold">
        <span className="w-2/3">Product Name</span>
        <span className="w-1/6 text-center">Qtt</span>
        <span className="w-1/6 text-right">Price</span>
      </div>

      {/* Product 1 */}
      <div className="px-6 py-3  border-black flex justify-between items-start text-sm">
        <div className="w-2/3 flex flex-col items-center justify-start text-start ">
        
        <p className=''>Crizal</p>
        <div className='flex flex-row gap-2'>
<p className='flex items-center justify-center gap-1.5'><input type='checkbox' />LE-N </p>
<p className='flex items-center justify-center gap-1.5'><input type='checkbox' />LE-N </p>
<p className='flex items-center justify-center gap-1.5'><input type='checkbox' />LE-N </p>
        </div>
            <div className='flex flex-row gap-2'>
<p className='flex items-center justify-center gap-1.5'><input type='checkbox' />LE-N </p>
<p className='flex items-center justify-center gap-1.5'><input type='checkbox' />LE-N </p>
<p className='flex items-center justify-center gap-1.5'><input type='checkbox' />LE-N </p>
        </div>
        </div>
        <div className="w-1/6 text-center">1</div>
        <div className="w-1/6 text-right">
          6500.00 <FiTrash2 className="inline ml-1 text-red-500" />
        </div>
      </div>
       <div className="border-b-2 border-dotted border-gray-900 my-1 w-full"></div>
          <div className=" flex flex-row justify-center gap-2 sm:gap-3 my-8">
                          <button className="bg-[#5DD86E]  text-black px-8 sm:px-4 py-3 sm:py-2 rounded-lg hover:scale-95">Save</button>
                          <button className="bg-black text-white px-8 sm:px-4 py-3 sm:py-2 rounded-lg flex items-center gap-1 hover:scale-95">
                            <FiX /> Cancel
                          </button>

    </div>


      </div>
  )
}

export default page