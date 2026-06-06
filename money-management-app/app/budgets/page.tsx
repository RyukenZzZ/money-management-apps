import BottomNavbar from "@/components/bottomNavbar";
import { Plus, Utensils, Car, Gamepad2, ShoppingCart } from "lucide-react";

const budgets = () => {
  const budgets = [
    {
      id: 1,
      category: "Makanan",
      amount: 2000000,
      spent: 1250000,
      remaining: 750000,
      percentage: 62,
      icon: <Utensils size={18} />,
      color: "bg-red-500",
    },

    {
      id: 2,
      category: "Transportasi",
      amount: 1000000,
      spent: 450000,
      remaining: 550000,
      percentage: 45,
      icon: <Car size={18} />,
      color: "bg-blue-500",
    },

    {
      id: 3,
      category: "Hiburan",
      amount: 500000,
      spent: 300000,
      remaining: 200000,
      percentage: 60,
      icon: <Gamepad2 size={18} />,
      color: "bg-purple-500",
    },

    {
      id: 4,
      category: "Belanja",
      amount: 1500000,
      spent: 1200000,
      remaining: 300000,
      percentage: 80,
      icon: <ShoppingCart size={18} />,
      color: "bg-orange-500",
    },
  ];

  return (
    <main className="bg-gray-100 min-h-screen pb-28">
      {/* Header */}
      <div className="bg-cyan-500 h-30 rounded-b-[30px] p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-white text-2xl font-semibold">Budgets</h1>
          <button className="bg-white/20 backdrop-blur p-2 rounded-xl text-white">
            <Plus size={23} strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* Budget List */}
      <div className="-mt-10 relative z-10">
        <div className="bg-gray-100 shadow-md rounded-4xl p-5 ">
          <div className="flex flex-col gap-3">
            {budgets.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between hover:bg-gray-50 transition p-3 rounded-xl bg-white "
              >
                {/* Left */}
                <div className="flex items-center gap-4">
                  <div
                    className={` ${item.color} w-10 h-10 flex rounded-full items-center justify-center`}
                  >
                    {item.icon}
                  </div>

                  <div>
                    <p className="font-medium text-sm text-black">Makanan</p>

                    {/* Progress bar */}
                    <div className="w-full h-2 bg-gray-200 rounded-full mt-1 overflow-hidden mb-2">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: "75%" }}
                      />
                    </div>

                    <div className="flex flex-row">
                      <p className="text-[11px] text-black leading-tight">
                      Rp 1.500.000 
                    </p>
                    <p className="text-[11px] text-gray-500 leading-tight">
                      / Rp 2.000.000
                    </p>
                    </div>
                  </div>
                </div>

                {/* Right */}
                <div className="flex items-center justify-start mr-4">
                  <p className="text-sm text-gray-500">75%</p>
                </div>
              </div>
            ))}
            ;
          </div>
        </div>
      </div>

      {/* Bottom Navbar */}
      <BottomNavbar />
    </main>
  );
};

export default budgets;
