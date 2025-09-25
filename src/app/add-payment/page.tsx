'use client'
import React, { useState } from "react";
 import { FiX } from "react-icons/fi";
function AddPayment() {
     const [typePayment, setTypePayment] = useState("");
  return (
    <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-9 md:gap-4 mt-4 py-6">
    {/* Type Of Payment*/}
    <div className="flex flex-col items-center justify-center w-full">
      <h2 className="text-md font-semibold mb-2">Type of Payment</h2>
      <div className="flex gap-4">
        {["Full", "Part Payment", "Not Paying"].map((g) => (
          <label key={g} className="flex items-center gap-1">
            <input
              type="radio"
              name="gender"
              value={g}
              checked={typePayment === g}
              onChange={(e) => setTypePayment(e.target.value)}
              className="accent-black"
            />
            {g}
          </label>
        ))}
      </div>
    </div>
 {/* Mode Of Payment*/}
    <div className="flex flex-col items-center justify-center w-full">
      <h2 className="text-md font-semibold mb-2">Mode of Payment</h2>
      <div className="flex gap-4">
        {["UPI/Online", "Cash", "Card" , "Cheque"].map((g) => (
          <label key={g} className="flex items-center gap-1">
            <input
              type="radio"
              name="gender"
              value={g}
              checked={typePayment === g}
              onChange={(e) => setTypePayment(e.target.value)}
              className="accent-black"
            />
            {g}
          </label>
        ))}
     
      </div>
         <input type="number" placeholder="Amount" className="bg-white rounded-sm text-sm px-2 py-1 mt-1  border-[1.5px] border-black"/>
    </div>
  
</div>
        <div className=" flex flex-row justify-center gap-2 sm:gap-3 my-8">
                        <button className="bg-[#5DD86E]  text-black px-8 sm:px-4 py-3 sm:py-2 rounded-lg hover:scale-95">Save Payment</button>
                        <button className="bg-black text-white px-8 sm:px-4 py-3 sm:py-2 rounded-lg flex items-center gap-1 hover:scale-95">
                          <FiX /> Cancel
                        </button>
                      </div>
    </>
  )
}

export default AddPayment