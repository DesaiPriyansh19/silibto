'use client'
import React from "react";
import { FiX, FiPlusCircle, FiEdit, FiTrash2 } from "react-icons/fi";

function NewSalesOrder() {
  return (
    <>
      {/* Head part */}
      <div className="flex items-center justify-center gap-1.5 px-2 mt-2.5">
        <div className="flex items-center bg-white border-[2px] border-[#E6E6E6] rounded-full px-3 py-2 w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search product"
            className="flex-1 bg-transparent outline-none text-sm"
          />
          <FiX className="text-gray-500 ml-2" />
        </div>
        <p className="text-sm font-bold">or</p>
        <button className="w-[30%] flex items-center justify-center gap-2 text-sm py-2 px-2 rounded-full bg-black text-white">
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
      <div className="flex justify-between px-6 mt-6 border-b border-gray-300 pb-2 text-sm font-semibold">
        <span className="w-2/3">Product Name</span>
        <span className="w-1/6 text-center">Qtt</span>
        <span className="w-1/6 text-right">Price</span>
      </div>

      {/* Product 1 */}
      <div className="px-6 py-3 border-b border-gray-200 flex justify-between items-start text-sm">
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

      <div className="border-b border-dotted border-gray-300 my-2"></div>

      {/* Product 2 */}
      <div className="px-6 py-3 border-b border-gray-200 flex justify-between items-start text-sm">
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

      <div className="border-b border-dotted border-gray-300 my-2"></div>

      {/* Product 3 */}
      <div className="px-6 py-3 border-b border-gray-200 flex justify-between items-start text-sm">
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

      <div className="border-b border-dotted border-gray-300 my-2"></div>

      {/* SGST + CGST */}
      <div className="px-6 py-2 flex justify-between text-sm">
        <span>SGST + CGST</span>
        <span>xyz.ab</span>
      </div>

      {/* Total */}
      <div className="px-6 py-3 flex justify-between font-semibold border-t border-gray-300 text-sm">
        <span>Total (6 pieces)</span>
        <span>24850.00</span>
      </div>
    </>
  );
}

export default NewSalesOrder;
