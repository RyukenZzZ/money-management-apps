"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Wallet, ReceiptText, User, Plus } from "lucide-react";
import { useTransactionModal } from "@/context/transactionModalContext";

export default function BottomNavbar() {
  const pathname = usePathname();
  const { openModal } = useTransactionModal();

  const navItems = [
    {
      href: "/",
      label: "Home",
      icon: Home,
    },
    {
      href: "/budgets",
      label: "Budgets",
      icon: Wallet,
    },
    {
      href: "/transactions",
      label: "Transactions",
      icon: ReceiptText,
    },
    {
      href: "/profile",
      label: "Profile",
      icon: User,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-center z-50">
      <div className="relative w-full max-w-sm bg-white border-t border-gray-200 h-20 rounded-t-3xl shadow-lg flex items-center justify-between px-6">

        {/* NAV ITEMS */}
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link key={item.href} href={item.href}>
              <div
                className={`flex flex-col items-center transition ${
                  isActive ? "text-cyan-500" : "text-gray-400"
                }`}
              >
                <Icon size={24} />
                <p className="text-xs">{item.label}</p>
              </div>
            </Link>
          );
        })}

        {/* FLOATING BUTTON */}
        <button
          onClick={openModal}
          className="absolute -top-6 left-1/2 -translate-x-1/2 bg-cyan-500 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg"
        >
          <Plus size={28} />
        </button>

      </div>
    </div>
  );
}