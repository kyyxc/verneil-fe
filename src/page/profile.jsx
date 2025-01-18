import NavigationBar from "../components/navigatioBar";
import BaseLayout from "../components/Layout/baseLayout";

export default function ProfilePage() {
  return (
    <>
      <BaseLayout>
        <NavigationBar />
        <div className="flex-1 lg:flex sm:ml-[76px] lg:ml-[240px] sm:flex sm:flex-col">
          <div className="fixed top-0 bg-black w-full sm:hidden text-center p-2 border-b font-semibold border-b-slate-700">
            iambluedee
          </div>

          <div className="mt-16 px-4">
            <div className="flex">
              <div className="">
                <img
                  src="images/faixfey.jpg"
                  alt="Profile Pic"
                  className="rounded-full object-cover sm:w-40 sm:h-40 w-20 h-20"
                />
              </div>
              <div className=" sm:items-start ml-5">
                <h1 className="text-1  mb-4 text-xl">feixfey</h1>
                <div className="flex gap-5">
                  <input
                    type="button"
                    value="Follow"
                    className="bg-btn px-3.5 py-1 rounded-md"
                  />
                  <input
                    type="button"
                    value="Message"
                    className="bg-btn px-3.5 py-1 rounded-md"
                  />
                </div>
              </div>
            </div>
            <div className="mt-8 sm:hidden">
              <h1 className="text-1 font-semibold">I Am Atomic</h1>
              <p className="text-slate-300">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam
                ad repudiandae obcaecati magni possimus!
              </p>
            </div>

            <div className="border-y border-y-slate-700 py-1.5 flex justify-evenly items-center mt-5 sm:hidden">
              <div className="text-center">
                <p className="font-semibold text-sm">Post</p>
                <p className="text-xs text-slate-300">214</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-sm">Followers</p>
                <p className="text-xs text-slate-300">123k</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-sm">Following</p>
                <p className="text-xs text-slate-300">343k</p>
              </div>
            </div>
          </div>

          {/* <div className="sm:flex">
            <div className="flex mt-8">
              <div className="items-center  w-[20%] ml-10 flex sm:justify-center">
                <img
                  src="images/faixfey.jpg"
                  alt="Profile Pic"
                  className="rounded-full object-cover lg:w-40 lg:h-40 w-20 h-20"
                />
              </div>
              <div className="flex flex-col flex-1  sm:items-start">
                <div className="sm:flex sm:gap-x-6 items-center mb-4">
                  <h1 className="text-xl mb-3">feixfey</h1>
                  <div className="flex gap-4">
                    <input
                      type="button"
                      value="Follow"
                      className="bg-btn px-3.5 py-1 rounded-md"
                    />
                    <input
                      type="button"
                      value="Message"
                      className="bg-btn px-3.5 py-1 rounded-md"
                    />
                  </div>
                </div>
                <div className="hidden sm:flex gap-x-10 mb-4">
                  <p>
                    <b>12</b> Post
                  </p>
                  <p>
                    <b>434</b> Followers
                  </p>
                  <p>
                    <b>23</b> Following
                  </p>
                </div>
                <div class="text-sm text-slate-300 hidden sm:block">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quidem obcaecati cupiditate doloribus nostrum ut fugiat nemo
                  tempora corporis, nesciunt odio.
                </div>
              </div>
            </div>
            <div className="sm:hidden">
              <div className="p-4 text-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Praesentium, placeat?
              </div>
            </div>
          </div>   */}
        </div>
      </BaseLayout>
    </>
  );
}
