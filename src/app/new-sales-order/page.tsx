'use client'
import EntryDateUpload from "@/components/EntryDateUpload";
import React from "react";
import { FiX, FiPlusCircle, FiEdit, FiTrash2 } from "react-icons/fi";

function NewSalesOrder() {
  return (
    <><div className="md:px-6 lg:px-20 xl:px-24">
      {/* Head part */}
      <div className="flex items-center justify-center gap-1.5 px-2  mt-2.5">
        <div className="flex items-center bg-white border-[2px] border-[#E6E6E6] rounded-full px-3 py-2 w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search product"
            className="flex-1 bg-transparent outline-none text-sm"
          />
          <FiX className="text-gray-500 ml-2" />
        </div>
        <p className="text-sm font-bold">or</p>
        <button className="w-[30%] md:max-w-[15vw] flex items-center justify-center gap-2 text-sm py-2 px-2 rounded-full bg-black text-white">
          <FiPlusCircle /> New
        </button>
      </div>

      <div className="flex items-center justify-between px-6 mt-3.5">
        <h3 className="font-semibold">Bansal Janakbhai Patel</h3>
        <FiEdit className="text-xl" />
      </div>

      <div className="flex items-center justify-start gap-2 px-6 mt-3.5">
        <h3 className="font-semibold text-sm">Bill to: </h3>
        <input className="bg-white py-1 px-3 border-[2px] rounded-lg border-[#E6E6E6]" />
      </div>

      <div className="flex items-center justify-start gap-2 px-6 mt-3.5">
        <h4 className="font-semibold text-sm">Phone </h4>
        <h4 className="font-light text-sm">90990 59585 </h4>
      </div>

      {/* Table Header */}
      <div className="flex justify-between px-6 mt-6 border-b border-black pb-2 text-sm font-semibold">
        <span className="w-2/3">Product Name</span>
        <span className="w-1/6 text-center">Qtt</span>
        <span className="w-1/6 text-right">Price</span>
      </div>

      {/* Product 1 */}
      <div className="px-6 py-3 border-b border-black flex justify-between items-start text-sm">
        <div className="w-2/3 font-medium">Reyban R33*** Black</div>
        <div className="w-1/6 text-center">1</div>
        <div className="w-1/6 text-right">
          6500.00 <FiTrash2 className="inline ml-1 text-red-500" />
        </div>
      </div>

      {/* Product 1 Glass */}
      <div className="px-6 py-2 bg-gray-50 text-sm">
        <div>Glass:</div>
        <div>Crizal</div>
        <div>1. LE-D</div>
        <div>2. RE-D</div>
      </div>

      <div className="border-b-2 border-dotted border-gray-900 my-1 w-full"></div>


      {/* Product 2 */}
      <div className="px-6 py-3 border-b border-black flex justify-between items-start text-sm">
        <div className="w-2/3 font-medium">Idee I1023 Blue Gold</div>
        <div className="w-1/6 text-center">1</div>
        <div className="w-1/6 text-right">
          2350.00 <FiX className="inline ml-1 text-red-500" />
        </div>
      </div>

      {/* Glass Add Button */}
      <div className="px-6 py-2 text-sm">
        <button className="text-red-500 text-sm">+ Add Glass</button>
      </div>

      <div className="border-b-2 border-dotted border-gray-900 my-1 w-full"></div>


      {/* Product 3 */}
      <div className="px-6 py-3 border-b border-black flex justify-between items-start text-sm">
        <div className="w-2/3 font-medium">B&L Regular Black</div>
        <div className="w-1/6 text-center">4</div>
        <div className="w-1/6 text-right">
          13000.00 <FiX className="inline ml-1 text-red-500" />
        </div>
      </div>

      {/* Power */}
      <div className="px-6 py-2 text-sm">
        <div>Power:</div>
        <div>1. LE-D - 2 nos</div>
        <div>2. RE-D - 2 nos</div>
        <div className="flex justify-end mt-1">
          <FiEdit className="text-gray-600" />
        </div>
      </div>

     <div className="border-b-2 border-dotted border-gray-900 my-1 w-full"></div>


      {/* SGST + CGST */}
      <div className="px-6 py-2 flex justify-between text-sm">
        <span>SGST + CGST</span>
        <span>xyz.ab</span>
      </div>

      {/* Total */}
      <div className="px-6 py-3 flex justify-between font-semibold border-t border-blacktext-sm">
        <span>Total (6 pieces)</span>
        <span>24850.00</span>
      </div>
   <div className="border-b   border-black my-2"></div>

    <div className=" w-full flex justify-center items-center my-4 lg:my-6 ">
      <button className="w-[30%] md:max-w-[15vw] flex items-center justify-center gap-2 text-sm py-2 px-2 rounded-full hover:scale-105  bg-black text-white">
          <FiPlusCircle /> New
        </button></div>

        <div className="flex flex-col  md:flex-row gap-5 md:gap-3 py-6  overflow-hidden items-center justify-between my-4 lg:my-6 ">
<div className=" shadoww bg-[#e6f3fb] border-4 pb-2 border-[#88C9F2] rounded-xl w-[400px]">
  <div className="flex justify-between rounded-t-lg py-2 pl-4 pr-3 bg-[#88C9F2]  items-center mb-2">
    <h2 className="font-bold ">Right Eye</h2>
    <button className=" px-2 text-lg font-medium mr-4 border-2 rounded">+</button>
  </div>

  <div className="grid grid-cols-5 px-4 gap-2 text-left  font-bold">
    <div></div>
    <div>SPH</div>
    <div>CYL</div>
    <div>AXIS</div>
    <div>ADD</div>
  </div>

  {["DIS", "NEAR", "COM"].map((type) => (
    <div key={type} className="grid px-4 grid-cols-5 gap-2 items-center mb-1">
      <div>
        <input type="checkbox" defaultChecked className="mr-1" />
        <span className="font-bold">{type}</span>
      </div>
      <input
        type="text"
        defaultValue={type === "DIS" ? "-10.10" : ""}
        className="bg-white rounded p-1"
      />
      <input type="text" className="bg-white  rounded p-1" />
      <input type="text" className="bg-white rounded p-1" />
      <input type="text" className="bg-white rounded p-1" />
    </div>
  ))}
</div>

<div className="shadoww hover: hover:shadoww2 bg-[#ffebeb] border-4 pb-2 border-[#FFB1B1] rounded-xl w-[400px] ">
  <div className="flex justify-between rounded-t-lg py-2 pl-4 pr-3 bg-[#FFB1B1]  items-center mb-2">
    <h2 className="font-bold ">Left Eye</h2>
    <button className=" px-2 text-lg font-medium mr-4 border-2 rounded">+</button>
  </div>

  <div className="grid grid-cols-5 px-4 gap-2 text-left  font-bold">
    <div></div>
    <div>SPH</div>
    <div>CYL</div>
    <div>AXIS</div>
    <div>ADD</div>
  </div>

  {["DIS", "NEAR", "COM"].map((type) => (
    <div key={type} className="grid px-4 grid-cols-5 gap-2 items-center mb-1">
      <div>
        <input type="checkbox" defaultChecked className="mr-1 " />
        <span className="font-bold">{type}</span>
      </div>
      <input
        type="text"
        defaultValue={type === "DIS" ? "-10.10" : ""}
        className="bg-white rounded p-1"
      />
      <input type="text" className="bg-white rounded p-1" />
      <input type="text" className="bg-white rounded p-1" />
      <input type="text" className="bg-white rounded p-1" />
    </div>
  ))}
</div>
</div>
<EntryDateUpload/>
<div className="flex items-center justify-start font-semibold gap-2.5 ml-6">
  <input type="checkbox" defaultChecked className=" " /> <p> Verify Power Record *</p>
  </div>

<div className="flex justify-evenly items-center my-4">
  <p className="text-xl font-semibold">Payment </p>
    <p className="text-xl text-[#1AA7FF] font-semibold">Advance </p>
       <button className=" flex items-center justify-center gap-2 text-sm py-2 px-4 rounded-full hover:scale-105  bg-black text-white">
          <FiPlusCircle /> New
        </button>
   </div>
    
          {/* perticuler */}
             <div className="px-6 py-3 flex justify-between font-semibold  ">
        <span>Particular</span>
        <span>Amount</span>
      </div>
      <div className="px-6 py-3 flex justify-between font-semibold border-t border-black ">
        <span>Advance Payment <br></br> <p className="text-sm font-light"> UPI: 1099233801038F3E21</p></span>
        <span>5000.00</span>
      </div>
    <div className="border-b-2 border-dotted border-gray-900 my-1 w-full"></div>
      </div>
      
        {/* place order*/}
        <div className="flex flex-row justify-center gap-2 sm:gap-3 my-8">
          <button className="bg-[#5DD86E]  text-black px-8 sm:px-4 py-3 sm:py-2 rounded-lg hover:scale-95">Place Order</button>
          <button className="bg-black text-white px-8 sm:px-4 py-3 sm:py-2 rounded-lg flex items-center gap-1 hover:scale-95">
            <FiX /> Cancel
          </button>
        </div>
    </>
  );
}

export default NewSalesOrder;
