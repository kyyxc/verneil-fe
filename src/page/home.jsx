import { useState } from "react";

export default function HomePage() {
  const [isOpenMenu, setIsOpenMenu] = useState(false)


  return (
    <>
      <div className="flex font-montserrat bg-bg h-full">
        <aside className="w-[300px] h-full l-0 t-0 bg-black fixed flex flex-col justify-between">
          <div className="px-2 mt-6">
            <h1 className="text-white font-caveat text-center text-5xl">
              Verneil
            </h1>
          </div>

          <div className="flex flex-col">
            <ul className="px-4">
              <li className="text-white font-semibold flex items-center gap-5 hover:bg-white/10 px-2 py-1.5 rounded-md">
                <i class="bi bi-house-door-fill text-white text-[28px]"></i>
                <h3 className="text-[17px]">Home</h3>
              </li>
              <li className="text-white flex items-center mt-4 gap-5 hover:bg-white/10 px-2 py-1.5 rounded-md">
                <i class="bi bi-search text-white text-[28px]"></i>
                <h3 className="text-[17px]">Search</h3>
              </li>
              <li className="text-white flex items-center mt-4 gap-5 hover:bg-white/10 px-2 py-1.5 rounded-md">
                <i class="bi bi-compass text-white text-[28px]"></i>
                <h3 className="text-[17px]">Explore</h3>
              </li>
              <li className="text-white flex items-center mt-4 gap-5 hover:bg-white/10 px-2 py-1.5 rounded-md">
                <i class="bi bi-chat text-white text-[28px]"></i>
                <h3 className="text-[17px]">Messages</h3>
              </li>
              <li className="text-white flex items-center mt-4 gap-5 hover:bg-white/10 px-2 py-1.5 rounded-md">
                <i class="bi bi-plus-circle text-white text-[28px]"></i>
                <h3 className="text-[17px]">Create</h3>
              </li>
              <li className="text-white flex items-center mt-4 gap-5 hover:bg-white/10 px-2 py-1.5 rounded-md">
                <i class="bi bi-person-circle text-white text-[28px]"></i>
                <h3 className="text-[17px]">Account</h3>
              </li>
            </ul>
          </div>

          <div>
            <ul className="px-4 py-2" onClick={() => setIsOpenMenu(!isOpenMenu)}>
              <li className="text-white flex items-center mt-4 gap-5 hover:bg-white/10 px-2 py-1.5 rounded-md">
                <i class="bi bi-list text-white text-[28px]"></i>
                <h3 className="text-[17px]">More</h3>
              </li>
            </ul>
          </div>

          <div className={`w-[300px] ${isOpenMenu ? 'hidden' : ''} rounded-xl p-5 bg-white/10 ml-4 bottom-16 fixed z-50 mx-2`}>
            <div className="">
              <h1 className="text-slate-100 text-sm">Log Out</h1>
            </div>
          </div>
        </aside>

        <main className="ml-[300px]">
        </main>
      </div>
    </>
  );
}
