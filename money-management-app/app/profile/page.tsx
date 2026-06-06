import BottomNavbar from "@/components/bottomNavbar";
import { Settings, ChevronRight, Wallet, LayoutGrid, Bell, ShieldCheck, CircleHelp, HelpCircle, MessageSquareMore } from "lucide-react";
import Image from "next/image";

const profile = () => {

    const general = [
    {
      id: 1,
      title: "My Wallets",
      icon: <Wallet size={20} />,
    },

    {
      id: 2,
      title: "My Categories",
      icon: <LayoutGrid size={20} />,
    },

    {
      id: 3,
      title: "Notification",
      icon: <Bell size={20} />,
    },

    {
      id: 4,
      title: "Security",
      icon: <ShieldCheck size={20} />,
    },
  ];

  const supports = [
    {
      id: 1,
      title: "Help Center",
      icon: <HelpCircle size={20} />,
    },
    {
      id: 2,
      title: "Send Feedback",
      icon: <MessageSquareMore size={20} />,
    },
    {
      id: 3,
      title: "About Us",
      icon: <CircleHelp size={20} />
    }
  ]

  return (
    <main className="bg-gray-100 min-h-screen pb-28">
      {/* Header */}
      <div className="bg-cyan-500 rounded-b-[30px] h-30 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-white text-2xl font-semibold">Profile</h1>
          <button className="text-white">
            <Settings size={23} />
          </button>
        </div>
      </div>

      {/* Profile Content */}
      <div className="-mt-15 relative z-10 p-2">
        <div className="bg-white border border-gray100 rounded-2xl flex items-center justify-between p-4">
          <div className="flex items-center justify-center gap-3">
            <Image
              src="/Animek Chibi.jpeg"
              alt="Profile Image"
              width={70}
              height={70}
              className="rounded-full border border-gray-300"
            />

            <div className="flex flex-col gap-1">
              <p className="font-semibold text-black">Ryuken</p>
              <p className="text-gray-600 text-sm">ryuken@gmail.com</p>
            </div>
          </div>

          <button>
            <ChevronRight size={24} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* General Section */}
      <div className="p-2">
        <div className="bg-white border-gray-200 border rounded-2xl p-4">
          <h2 className="text-lg font-semibold text-black mb-2">General</h2>
          <div className="flex flex-col">
            {general.map((item, index) => (
              <button key={item.id} className={`
                flex items-center justify-between
                py-4
                ${
                  index !== general.length - 1
                    ? "border-b border-gray-200"
                    : ""
                }
              `}>

                {/* Left */}
                <div className="flex items-center gap-3">
                  <div className="text-cyan-500">
                    {item.icon}
                  </div>
                  <p className="text-black font-medium">{item.title}</p>
                </div>

                {/* Right */}
                <ChevronRight size={20} className="text-gray-400" />
              </button>
            ))}

          </div>
        </div>
      </div>

      {/* Support Section */}
      <div className="p-2">
        <div className="bg-white border-gray-200 border rounded-2xl p-4">
          <h2 className="text-lg font-semibold text-black mb-2">Support</h2>
          <div className="flex flex-col">
            {supports.map((item, index) => (
              <button key={item.id} className={`
                flex items-center justify-between
                py-4
                ${
                  index !== supports.length - 1
                    ? "border-b border-gray-200"
                    : ""
                }
              `}>

                {/* Left */}
                <div className="flex items-center gap-3">
                  <div className="text-cyan-500">
                    {item.icon}
                  </div>
                  <p className="text-black font-medium">{item.title}</p>
                </div>

                {/* Right */}
                <ChevronRight size={20} className="text-gray-400" />
              </button>
            ))}

          </div>
        </div>
      </div>

      {/* Logout Section */}
      <div className="px-2">
        <div className="bg-white rounded-2xl p-2">
        <button className="bg-white hover:bg-red-600 text-red-500 hover:text-white font-medium py-3 px-4 rounded-2xl border border-red-500 w-full">
          Logout
        </button>
        </div>
      </div>

      {/* Bottom Navbar */}
      <BottomNavbar />
    </main>
  );
};

export default profile;
