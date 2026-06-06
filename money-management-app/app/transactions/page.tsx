"use client";

import BottomNavbar from "@/components/bottomNavbar";
import { ArrowDownRight, ArrowUpRight, Filter, Search } from "lucide-react";
import { useState } from "react";

const Transactions = () => {
  const [active, setActive] = useState("all");

  const filters = [
    { id: "all", label: "All" },
    { id: "expense", label: "Expense" },
    { id: "income", label: "Income" },
  ];

  const transactions = [
    {
      id: 1,
      title: "Makan",
      date: "10 Maret 2026 | 14.26",
      month: "Maret 2026",
      amount: "-Rp. 50.000",
      type: "expense",
      icon: <ArrowDownRight size={18} />,
      color: "text-red-500",
      bg: "bg-red-100",
    },
    {
      id: 2,
      title: "Gaji",
      date: "8 Maret 2026 | 09.00",
      month: "Maret 2026",
      amount: "+Rp. 5.000.000",
      type: "income",
      icon: <ArrowUpRight size={18} />,
      color: "text-green-500",
      bg: "bg-green-100",
    },
    {
      id: 3,
      title: "Transportasi",
      date: "28 Februari 2026 | 18.30",
      month: "Februari 2026",
      amount: "-Rp. 20.000",
      type: "expense",
      icon: <ArrowDownRight size={18} />,
      color: "text-red-500",
      bg: "bg-red-100",
    },
    {
      id: 4,
      title: "Freelance",
      date: "15 Februari 2026 | 20.15",
      month: "Februari 2026",
      amount: "+Rp. 1.500.000",
      type: "income",
      icon: <ArrowUpRight size={18} />,
      color: "text-green-500",
      bg: "bg-green-100",
    },
  ];

  const filteredTransactions =
    active === "all"
      ? transactions
      : transactions.filter((item) => item.type === active);

  const groupedTransactions = filteredTransactions.reduce(
    (acc, transaction) => {
      const month = transaction.month;

      if (!acc[month]) {
        acc[month] = [];
      }

      acc[month].push(transaction);

      return acc;
    },
    {} as Record<string, typeof transactions>,
  );

  return (
    <main className="bg-gray-100 min-h-screen pb-28">
      {/* Header */}
      <div className="bg-cyan-500 h-50 rounded-b-[30px] p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-white text-2xl font-semibold">Transactions</h1>

          <button className="bg-white/20 backdrop-blur p-2 rounded-xl text-white">
            <Search size={20} />
          </button>
        </div>

        {/* Filter */}
        <div className="flex gap-2 mt-5 overflow-x-auto">
          {filters.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`
                px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-200
                ${
                  active === item.id
                    ? "bg-white text-cyan-600 font-medium shadow"
                    : "bg-white/20 text-white"
                }
              `}
            >
              {item.label}
            </button>
          ))}

          {/* Filter Button */}
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white whitespace-nowrap">
            <Filter size={16} />
            Filter
          </button>
        </div>
      </div>

      {/* Transaction List */}
      <div className="-mt-15 relative z-10">
        <div className="bg-gray-100 rounded-3xl shadow-sm p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Transactions
          </h2>

          <div className="flex flex-col gap-6">
            {Object.entries(groupedTransactions).map(([month, items]) => (
              <div key={month}>
                {/* Month Title */}
                <h3 className="text-black mb-3">{month}</h3>

                <div className="flex flex-col gap-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between hover:bg-gray-50 transition p-2 rounded-xl"
                    >
                      {/* Left */}
                      <div className="flex items-center gap-3">
                        <div
                          className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  ${item.bg} ${item.color}
                `}
                        >
                          {item.icon}
                        </div>

                        <div>
                          <p className="text-black font-medium">{item.title}</p>

                          <p className="text-gray-400 text-sm">{item.date}</p>
                        </div>
                      </div>

                      {/* Right */}
                      <p className={`font-semibold text-sm ${item.color}`}>
                        {item.amount}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navbar */}
      <BottomNavbar />
    </main>
  );
};

export default Transactions;
