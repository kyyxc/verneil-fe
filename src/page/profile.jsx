import NavigationBar from "../components/navigatioBar";
import BaseLayout from "../components/Layout/baseLayout";

export default function ProfilePage() {
  return (
    <>
      <BaseLayout>
        <NavigationBar />
        <div className="flex-1 lg:flex sm:ml-[76px] lg:ml-[240px] sm:flex sm:flex-col">
          <div className="fixed top-0 bg-black w-full sm:hidden text-center p-2 border-b font-semibold border-b-btn">
            iambluedee
          </div>

          <div className="mt-16 sm:mt-8 sm:px-4 lg:mx-6">
            <div className="">
              <div className="flex px-4 sm:px-0">
                <div className="sm:flex-[1] sm:flex sm:justify-center sm:items-center">
                  <img
                    src="images/faixfey.jpg"
                    alt="Profile Pic"
                    className="rounded-full object-cover sm:w-40 sm:h-40 w-20 h-20"
                  />
                </div>
                <div className="ml-5 sm:mt-4 sm:flex-[2] self-center">
                  <div className="sm:flex sm:items-center">
                    <div className="text-1 text-xl mb-2.5 sm:mb-0">feixfey</div>
                    <div className="flex gap-5 sm:ml-8">
                      <input
                        type="button"
                        value="Follow"
                        className="bg-btn px-4 py-1 rounded-md"
                      />
                      <input
                        type="button"
                        value="Message"
                        className="bg-btn px-4 py-1 rounded-md"
                      />
                    </div>
                  </div>
                  <div className="hidden sm:flex gap-x-16 mt-3.5">
                    <div className="sm:flex">
                      <p className="text-sm">
                        <b>12</b> Post
                      </p>
                    </div>
                    <div className="sm:flex">
                      <p className="text-sm">
                        <b>12</b> Post
                      </p>
                    </div>
                    <div className="sm:flex">
                      <p className="text-sm">
                        <b>12</b> Post
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 hidden sm:flex sm:flex-col">
                    <h1 className="text-1 font-semibold">I Am Atomic</h1>
                    <p className="text-slate-300 md:w-[80%]">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Totam ad repudiandae obcaecati magni possimus!
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8 sm:hidden px-4 sm:px-0 ">
                <h1 className="text-1 font-semibold">I Am Atomic</h1>
                <p className="text-slate-300">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Totam ad repudiandae obcaecati magni possimus!
                </p>
              </div>
              <div className="border-t border-t-btn py-1.5 flex justify-evenly items-center mt-5 sm:hidden">
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
            <hr className="mt-2.5 lg:mt-10 border-t border-t-btn" />
            <div className="mt-10">
              <div className="grid grid-cols-3 gap-1 mb-20">
                <div className="h-50">
                  <img src="images/iambluedee1.jpg" alt="" className="h-full w-full object-cover" />
                </div>
                <div className="h-50">
                  <img src="images/iambluedee2.jpg" alt="" className="h-full w-full object-cover" />
                </div>
                <div className="h-50">
                  <img src="images/iambluedee3.jpg" alt="" className="h-full w-full object-cover" />
                </div>
                <div className="h-50">
                  <img src="images/iambluedee4.jpg" alt="" className="h-full w-full object-cover" />
                </div>
                <div className="h-50">
                  <img src="images/iambluedee5.jpg" alt="" className="h-full w-full object-cover" />
                </div>
                <div className="h-50">
                  <img src="images/iambluedee6.jpg" alt="" className="h-full w-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </BaseLayout>
    </>
  );
}
