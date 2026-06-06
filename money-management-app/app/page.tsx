"use client";
import BottomNavbar from "@/components/bottomNavbar";
import { Avatar } from "flowbite-react";
import { Search } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";

const Home = () => {
  return (
    <main className="bg-gray-100 min-h-screen">
        <div className="w-full h-50 bg-cyan-500 p-6 flex flex-row justify-between rounded-b-[22px] items-start">        
          <div className="flex items-center gap-2">
          <Avatar img="/default.jpg" alt="avatar of Jese" rounded />
          <p className="font-semibold">Ryuken</p>
        </div>

        {/* Icon Notif / Search */}
        <button className="bg-white p-2 rounded-lg shadow text-black">
          <Search size={18} />
        </button>
      </div>

      <div className="px-5 -mt-26 relative z-10">
        <div className="bg-white border-3 border-gray-300 rounded-2xl shadow-md p-5 oppacity-90 box-shadow-lg">
          {/* Total Balance */}
          <p className="text-sm text-black font-semibold">Total Balance</p>
          <h1 className="text-black text-4xl font-semibold">Rp. 12.000.000</h1>

          {/* Income & Expense */}
          <div className="grid grid-cols-2 mt-3 border-2 border-gray-300 rounded-2xl">
           
            {/* Income */}
            <div className="grid grid-rows-2 items-center p-2 ">
              <div className="flex gap-2">
                <ArrowUpRight
                  size={16}
                  className="text-green-600 bg-green-400 rounded-2xl"
                />
                <p className="text-xs text-black font-medium">Income Januari</p>
              </div>

              <h2 className="text-green-600 font-semibold">Rp. 5.000.000</h2>
            </div>

            {/* Expense */}
            <div className="grid grid-rows-2 items-center p-2 border-l-2">
              <div className="flex gap-2">
                <ArrowDownRight
                  size={16}
                  className="text-red-600 bg-red-400 rounded-2xl"
                />
                <p className="text-xs text-black font-medium">Expense Januari</p>
              </div>

              <h2 className="text-red-600 font-semibold">Rp. 5.000.000</h2>
            </div>{" "}
          </div>
        </div>
      </div>

      {/* Budget Card */}
      <div className="mt-5 grid grid-cols-2 ml-2 gap-2">
        <div className="grid grid-rows-3 border-2 border-gray-300 rounded-xl bg-white">
          <p className="text-black text-xs mt-2 ml-3 row-span-1 mb-2 font-medium">Food Budget</p>

          <div className="row-span-2 grid grid-cols-3 ml-3">
          <Image src="/indikator.png" className="rounded-3xl col-span-1" alt="Food Budget" width={40} height={40} />
          <p className="col-span-2 text-black text-xs font-semibold">Rp. 500.000 / 2.000.000</p>
        </div>
        </div>

        <div className="grid grid-rows-3 border-2 border-gray-300 rounded-xl mr-2 bg-white">
          <p className="text-black text-xs mt-2 ml-3 row-span-1 mb-2 font-medium">Transaction Budget</p>

          <div className="row-span-2 grid grid-cols-3 ml-3">
          <Image src="/indikator.png" className="rounded-3xl col-span-1" alt="Food Budget" width={40} height={40} />
          <p className="col-span-2 text-black text-xs font-semibold">Rp. 500.000 / 2.000.000</p>
        </div>
        </div>
      </div>


    {/* History Transactions */}
   <div className="m-2 border border-gray-100 bg-white rounded-xl p-3">
  <p className="text-black text-lg mb-3">Recent Transactions</p>

  <div className="flex items-center justify-between mb-2">

    {/* Kiri */}
    <div className="flex items-center gap-3">
      <Image src="/default.jpg" alt="Food Icon" width={40} height={40} className="rounded-full"/>

      <div>
        <p className="text-black">Makan</p>
        <p className="text-gray-400 text-sm">
          10 Maret 2026 | 14.26
        </p>
      </div>
    </div>

    {/* Kanan */}
    <p className="text-red-700 text-sm font-semibold">
      -Rp 50.000
    </p>

  </div>


      <div className="flex items-center justify-between mb-2">

    {/* Kiri */}
    <div className="flex items-center gap-3">
      <Image src="/default.jpg" alt="Food Icon" width={40} height={40} className="rounded-full"/>

      <div>
        <p className="text-black">Makan</p>
        <p className="text-gray-400 text-sm">
          10 Maret 2026 | 14.26
        </p>
      </div>
    </div>

    {/* Kanan */}
    <p className="text-red-700 text-sm font-semibold">
      -Rp 50.000
    </p>

  </div>

    <div className="flex items-center justify-between mb-2">

    {/* Kiri */}
    <div className="flex items-center gap-3">
      <Image src="/default.jpg" alt="Food Icon" width={40} height={40} className="rounded-full"/>

      <div>
        <p className="text-black">Makan</p>
        <p className="text-gray-400 text-sm">
          10 Maret 2026 | 14.26
        </p>
      </div>
    </div>

    {/* Kanan */}
    <p className="text-red-700 text-sm font-semibold">
      -Rp 50.000
    </p>

  </div>

    <div className="flex items-center justify-between mb-2">

    {/* Kiri */}
    <div className="flex items-center gap-3">
      <Image src="/default.jpg" alt="Food Icon" width={40} height={40} className="rounded-full"/>

      <div>
        <p className="text-black">Makan</p>
        <p className="text-gray-400 text-sm">
          10 Maret 2026 | 14.26
        </p>
      </div>
    </div>

    {/* Kanan */}
    <p className="text-red-700 text-sm font-semibold">
      -Rp 50.000
    </p>

  </div>

  
</div>

      {/** Bottom Navbar */}
      <BottomNavbar />
    </main>
  );
};

export default Home;
