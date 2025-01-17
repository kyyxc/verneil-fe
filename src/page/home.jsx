import { useState } from "react";

export default function HomePage() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isSeach, setIsSearc] = useState(false);

  return (
    <>
      <div className="flex font-montserra h-full bg-black text-slate-100">
        <aside className="w-[240px] h-full bg-black fixed flex flex-col border-r">
          <div className="px-2 mt-2 py-4 text-white font-caveat text-center text-5xl">
            Verneil
          </div>

          <div className="text-slate-100 mt-4 flex flex-col ">
            <ul className="px-2.5">
              <li className="font-semibold flex items-center hover:bg-white/10 px-2 py-1.5 rounded-lg">
                <i class="bi bi-house-door-fill text-[26px]"></i>
                <h3 className="text-[16px] ml-4">Home</h3>
              </li>
              <li className="flex items-center mt-2.5 hover:bg-white/10 px-2 py-1.5 rounded-lg">
                <i class="bi bi-search text-[26px]"></i>
                <h3 className="text-[16px] ml-4">Search</h3>
              </li>
              <li className="flex items-center mt-2.5 hover:bg-white/10 px-2 py-1.5 rounded-lg">
                <i class="bi bi-compass text-[26px]"></i>
                <h3 className="text-[16px] ml-4">Explore</h3>
              </li>
              <li className="flex items-center mt-2.5 hover:bg-white/10 px-2 py-1.5 rounded-lg">
                <i class="bi bi-chat text-[26px]"></i>
                <h3 className="text-[16px] ml-4">Messages</h3>
              </li>
              <li className="flex items-center mt-2.5 hover:bg-white/10 px-2 py-1.5 rounded-lg">
                <i class="bi bi-plus-circle text-[26px]"></i>
                <h3 className="text-[16px] ml-4">Create</h3>
              </li>
              <li className="flex items-center mt-2.5 hover:bg-white/10 px-2 py-1.5 rounded-lg">
                <i class="bi bi-person-circle text-[26px]"></i>
                <h3 className="text-[16px] ml-4">Account</h3>
              </li>
            </ul>
          </div>

          <div
            className="px-2.5 py-2 mt-auto"
            onClick={() => setIsOpenMenu(!isOpenMenu)}
          >
            <div className="flex items-center mt-2.5 hover:bg-white/10 px-2 py-1.5 rounded-lg">
              <i class="bi bi-list text-white text-[26px]"></i>
              <h3 className="text-[16px] ml-4">More</h3>
            </div>
          </div>

          <div
            className={` ${isOpenMenu ? "block" : "hidden"} w-[200px]
             rounded-xl p-5 bg-white/10 ml-4 bottom-[4.5rem] fixed z-50 mx-2`}
          >
            <div className="text-slate-100 text-sm">Log Out</div>
          </div>
        </aside>

        <div class="ml-[240px] flex-1 flex flex-col lg:flex-row font font-montserrat">
          <div class="flex-[2] p-6">

            <div className="flex flex-col w-[450px] p-5">
              <div className="flex items-center">
                <img
                  src="/images/subaru.jpg"
                  class="rounded-full w-[40px]"
                  alt="Profile"
                />
                <div className="">
                  <h1 class="ml-3 text-sm font-semibold text-white">kyyvrz</h1>
                  <h1 class="ml-3 text-xs text-slate-300 ">Lucky</h1>
                </div>
                <p class="text-slate-400 ml-5 text-sm">1 hour ago.</p>
              </div>

              <div className="rounded-lg mt-5">
                <img
                  src="images/post.jpeg"
                  alt="Post"
                  class="w-full h-[500px] shadow-sm shadow-white object-cover rounded-lg"
                />
              </div>

              <div className="flex justify-between mt-2.5 px-2">
                <div className="flex gap-5">
                  <i class="bi bi-heart-fill text-[26px] text-red-700"></i>
                  <i class="bi bi-chat text-[26px]"></i>
                </div>

                <i class="bi bi-bookmark text-[26px]"></i>
              </div>

              <p className="px-2 mt-2.5 text-sm">5.023 Likes</p>

              <p className="mx-2 mt-2.5 text-sm text-slate-400">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Excepturi quasi quibusdam commodi vitae voluptatibus, asperiores
                eos laborum quo modi, optio reiciendis corporis sint distinctio
                placeat recusandae? Eaque accusantium nulla dolorem?
              </p>

              <hr className="w-[400px] text-white/10 self-center mt-10" /> 
            </div>
            
          </div>

          <div class="flex-[1] p-6">
            <h1 class="text-2xl font-bold">Column 3</h1>
            <p class="mt-4 ">
              This is the third column. It also adjusts dynamically to fit the
              available space.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
