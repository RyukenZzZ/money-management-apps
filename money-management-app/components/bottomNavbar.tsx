"use client";

import { Home, Wallet, Plus, ReceiptText, User } from "lucide-react";

export default function BottomNavbar() {
  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-center">
      <div className="relative w-full bg-white border-2 border-gray-200 max-w-sm h-20 rounded-t-3xl shadow-lg flex items-center justify-around text-gray-400">
        {/** Home Section */}
        <div className="flex flex-col items-center">
          <Home size={24} />
          <p className="text-xs">Home</p>
        </div>

        {/** Budget Section */}
        <div className="flex flex-col items-center">
          <Wallet size={24} />
          <p className="text-xs">Home</p>
        </div>

        {/** spacer Section */}
        <div className="w-12"></div>


        {/** Tramsaction Section */}
        <div className="flex flex-col items-center">
          <ReceiptText size={24} />
          <p className="text-xs">Home</p>
        </div>

        {/** Profile Section */}
        <div className="flex flex-col items-center">
          <User size={24} />
          <p className="text-xs">Home</p>
        </div>

        {/* Floating Button */}
        <button
          className="
          absolute
          -top-5
          bg-cyan-500
          w-16
          h-16
          rounded-full
          flex
          items-center
          justify-center
          text-white
          shadow-lg
        "
        >
          <Plus size={32} />
        </button>
      </div>
    </div>
  );
}
