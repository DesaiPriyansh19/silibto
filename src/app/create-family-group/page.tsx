import React from 'react'
 import { FiX } from "react-icons/fi";
function CreateFamilyGroup() {
  return (<>
  
    <h2 className='text-xl font-semibold text-center my-5'>CreateFamilyGroup</h2 >

    <div className='flex gap-3 flex-col text-sm  md:flex-row  items-center justify-center '>
        <input type='text' placeholder='Name of Head Person' className='border-[1.5px] border-black px-2 py-1 rounded-lg'/>
   <input type='text' placeholder='Reference' className='border-[1.5px] border-black px-2 py-1 rounded-lg'/> 
       </div>
  
          <div className=" flex flex-row justify-center gap-2 sm:gap-3 my-8">
                          <button className="bg-[#5DD86E]  text-black px-8 sm:px-4 py-3 sm:py-2 rounded-lg hover:scale-95">Save</button>
                          <button className="bg-black text-white px-8 sm:px-4 py-3 sm:py-2 rounded-lg flex items-center gap-1 hover:scale-95">
                            <FiX /> Cancel
                          </button>
                        </div>

                        
    </>

  )
}

export default CreateFamilyGroup