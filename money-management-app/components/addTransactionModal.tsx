"use client";

import { useState } from "react";
import {
  X,
  ArrowUp,
  ArrowDown,
  ChevronRight,
  Utensils,
  Car,
  ShoppingCart,
  Ticket,
  CalendarIcon,
} from "lucide-react";

import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTransactionModal } from "@/context/transactionModalContext";

export default function AddTransactionModal() {
  const { isOpen, closeModal } = useTransactionModal();

  const [date, setDate] = useState<Date | undefined>(undefined);
  const [openDate, setOpenDate] = useState(false);

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Select Category");

  const [type, setType] = useState("expense");

  const categories = [
    {
      name: "Makan",
      icon: Utensils,
      bg: "bg-orange-300",
      bgSelect: "bg-orange-500",
    },
    {
      name: "Transport",
      icon: Car,
      bg: "bg-blue-300",
      bgSelect: "bg-blue-500",
    },
    {
      name: "Belanja",
      icon: ShoppingCart,
      bg: "bg-purple-300",
      bgSelect: "bg-purple-500",
    },
    {
      name: "Hiburan",
      icon: Ticket,
      bg: "bg-pink-300",
      bgSelect: "bg-pink-500",
    },
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* BACKDROP MODAL */}
      <div className="fixed inset-0 bg-black/40 z-40" onClick={closeModal} />

      {/* MAIN MODAL */}
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[85vh] z-50 p-6 overflow-y-auto">
        {/* HANDLE */}
        <div className="flex justify-center mb-3">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
        </div>

        {/* HEADER */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-black">Add Transaction</h2>

          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-gray-600"
          >
            <X />
          </button>
        </div>

        {/* TYPE */}
        <p className="font-semibold text-black">Type</p>

        <div className="grid grid-cols-2 gap-3 mt-3 mb-5">
          <button
            onClick={() => setType("income")}
            className={`flex items-center justify-center gap-2 p-3 rounded-xl font-semibold ${
              type === "income"
                ? "bg-green-200 text-green-600"
                : "bg-green-100 text-green-500"
            }`}
          >
            <ArrowUp size={20} />
            Income
          </button>

          <button
            onClick={() => setType("expense")}
            className={`flex items-center justify-center gap-2 p-3 rounded-xl font-semibold ${
              type === "expense"
                ? "bg-red-200 text-red-600"
                : "bg-red-100 text-red-500"
            }`}
          >
            <ArrowDown size={20} />
            Expense
          </button>
        </div>

        {/* AMOUNT */}
        <p className="font-semibold text-black">Amount</p>
        <input
          type="number"
          placeholder="Rp. 0"
          className="w-full border border-gray-200 rounded-xl p-3 mt-2 mb-5 text-black outline-none"
        />

        {/* CATEGORY */}
        <p className="font-semibold text-black">Category</p>

        <button
          onClick={() => setCategoryOpen(true)}
          className="
            w-full
            border
            border-gray-200
            rounded-xl
            p-3
            mt-2
            flex
            items-center
            justify-between
          "
        >
          <span
            className={
              selectedCategory === "Select Category"
                ? "text-gray-400"
                : "text-black"
            }
          >
            {selectedCategory}
          </span>

          <ChevronRight className="text-gray-500" />
        </button>
        <div className="flex gap-4 overflow-x-auto mt-3">
          {categories.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                onClick={() => setSelectedCategory(item.name)}
                className="flex flex-col items-center gap-2"
              >
                <div
                  className={`w-13 h-13 rounded-full text-white ${selectedCategory === item.name ? item.bgSelect : item.bg} flex items-center justify-center`}
                >
                  <Icon className="w-6 h-6" />
                </div>
              </button>
            );
          })}
        </div>

        {/* DATE */}
        <p className="font-semibold text-black mt-5">Date & Time</p>

        <Popover open={openDate} onOpenChange={setOpenDate}>
          <PopoverTrigger asChild>
            <button
              className="
        w-full
        border
        border-gray-200
        rounded-xl
        p-3
        mt-2
        flex
        items-center
        justify-between
      "
            >
              <span className={date ? "text-black" : "text-gray-400"}>
                {date
                  ? format(date, "dd MMMM yyyy | HH.mm", { locale: id })
                  : "Select Date"}
              </span>

              <CalendarIcon size={18} className="text-cyan-500" />
            </button>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(value) => {
                setDate(value);
                setOpenDate(false); // 🔥 INI YANG PENTING
              }}
              captionLayout="dropdown"
            />
          </PopoverContent>
        </Popover>

        {/* Note */}
        <p className="font-medium text-black mt-6 mb-3">Note (Optional)</p>

        <textarea
          rows={3}
          placeholder="Add note..."
          className="
    w-full
    border
    border-gray-200
    rounded-xl
    p-4
    resize-none
  "
        />

        {/* Button */}
        <button
          className="
    w-full
    bg-cyan-400
    hover:bg-cyan-500
    text-white
    py-4
    rounded-2xl
    font-semibold
    mt-8
  "
        >
          Save Transaction
        </button>
      </div>

      {/* ================= CATEGORY BOTTOM SHEET ================= */}
      {categoryOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-end"
          onClick={() => setCategoryOpen(false)}
        >
          <div
            className="w-full bg-white rounded-t-2xl p-4 max-h-[60%] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* HANDLE */}
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />

            <p className="font-semibold text-black mb-3">Select Category</p>

            {/* LIST CATEGORY */}
            {categories.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.name}
                  onClick={() => {
                    setSelectedCategory(item.name);
                    setCategoryOpen(false);
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-100"
                >
                  {/* LEFT */}
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${item.bg}`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>

                    <span className="text-black font-medium">{item.name}</span>
                  </div>

                  {/* CHECK */}
                  {selectedCategory === item.name && (
                    <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
