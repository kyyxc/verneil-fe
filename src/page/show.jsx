import { Link } from "react-router-dom";
import HomePage from "./home";
import { useEffect, useState } from "react";

export default function ShowPage() {
  const [isLike, setIsLike] = useState(false);
  const [isMore, setIsMore] = useState(false);

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
  });

  let text =
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit.Excepturi quasi quibusdam commodi vitae voluptatibus, asperioreseos laborum quo modi, optio reiciendis corporis sint distinctio  placeat recusandae? Eaque accusantium nulla dolorem?";
  return (
    <div className="">
      <HomePage></HomePage>

      <Link to="/">
        <i class="bi bi-x text-1 fixed top-0 right-6 text-[42px] z-50"></i>
      </Link>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 shadow-sm shadow-slate-200 -translate-y-1/2 flex w-[80%] h-[90%] bg-black">
        <div className="w-[50%] text-1">
          <div className="h-full">
            <img
              src="images/faixfey.jpg"
              alt=""
              className="rounded-sm w-full h-full 1 object-cover"
            />
          </div>
        </div>
        <div className="w-[50%] text-1">
          <div className="fixed w-[50%] z-50 top-0 px-5 py-2">
            <div className="flex items-center">
              <img
                src="/images/faixfey.jpg"
                alt=""
                className="w-[40px] h-[40px] rounded-full"
              />
              <div className="">
                <div className="ml-3.5 flex">
                  <h3 className="text-1 text-sm font-semibold">Kyyvrx</h3>
                </div>
              </div>
            </div>
            <hr className="mt-2 border-t border-btn" />
          </div>

          {/* Caption */}
          <div className="mt-20 overflow-y-scroll max-h-[70%] scrollbar-hidden">
            <div className="flex gap-5 p-5 ">
              <div>
                <img
                  src="/images/faixfey.jpg"
                  alt=""
                  className="w-[40px] h-[40px] rounded-full"
                />
              </div>
              <div className="flex flex-1">
                <h3 className="text-1 text-sm font-semibold">
                  Kyyvrx{" "}
                  <p className="font-normal inline text-slate-300">{text}</p>
                </h3>
              </div>
            </div>
            <div className="flex gap-5 p-5 ">
              <div>
                <img
                  src="/images/faixfey.jpg"
                  alt=""
                  className="w-[40px] h-[40px] rounded-full"
                />
              </div>
              <div className="flex flex-1">
                <h3 className="text-1 text-sm font-semibold">
                  Kyyvrx{" "}
                  <p className="font-normal inline text-slate-300">{text}</p>
                </h3>
              </div>
            </div>
            <div className="flex gap-5 p-5 ">
              <div>
                <img
                  src="/images/faixfey.jpg"
                  alt=""
                  className="w-[40px] h-[40px] rounded-full"
                />
              </div>
              <div className="flex flex-1">
                <h3 className="text-1 text-sm font-semibold">
                  Kyyvrx{" "}
                  <p className="font-normal inline text-slate-300">{text}</p>
                </h3>
              </div>
            </div>
            <div className="flex gap-5 p-5 ">
              <div>
                <img
                  src="/images/faixfey.jpg"
                  alt=""
                  className="w-[40px] h-[40px] rounded-full"
                />
              </div>
              <div className="flex flex-1">
                <h3 className="text-1 text-sm font-semibold">
                  Kyyvrx{" "}
                  <p className="font-normal inline text-slate-300">{text}</p>
                </h3>
              </div>
            </div>
            <div className="flex gap-5 p-5 ">
              <div>
                <img
                  src="/images/faixfey.jpg"
                  alt=""
                  className="w-[40px] h-[40px] rounded-full"
                />
              </div>
              <div className="flex flex-1">
                <h3 className="text-1 text-sm font-semibold">
                  Kyyvrx{" "}
                  <p className="font-normal inline text-slate-300">{text}</p>
                </h3>
              </div>
            </div>
            <div className="flex gap-5 p-5 ">
              <div>
                <img
                  src="/images/faixfey.jpg"
                  alt=""
                  className="w-[40px] h-[40px] rounded-full"
                />
              </div>
              <div className="flex flex-1">
                <h3 className="text-1 text-sm font-semibold">
                  Kyyvrx{" "}
                  <p className="font-normal inline text-slate-300">{text}</p>
                </h3>
              </div>
            </div>
          </div>

          <div className="fixed bottom-0 w-[50%] px-2 pb-2 bg-black">
            <div className="flex justify-between mb-4 px-2 border-t border-t-btn pt-2">
              <div className="flex items-center gap-6">
                <i
                  className={`bi bi-heart-fill text-[26px] ${
                    isLike ? " text-red-700" : ""
                  }`}
                  onClick={() => setIsLike(!isLike)}
                ></i>
                <Link to="/show">
                  <i className="bi bi-chat hidden text-[26px]"></i>
                </Link>
              </div>

              <i className="bi bi-bookmark text-[26px]"></i>
            </div>

            <form action="" className="">
              <div className="flex justify-around mt-2 border-t border-t-btn pt-2">
                <input
                  type="text"
                  className="w-[80%] bg-transparent outline-none"
                  placeholder="Comment Here"
                />
                <p className="text-blue-600">Send</p>
              </div>
            </form>
          </div>
        </div>

        {/* <div className="w-[468px] flex flex-col justify-center">
              <div className="flex items-center">
                <img
                  src="/images/faixfey.jpg"
                  alt=""
                  className="w-[50px] h-[50px] rounded-full"
                />
                <div className="">
                  <div className="ml-3 flex">
                    <h3 className="text-1 text-sm font-semibold">Kyyvrx</h3>
                    <p className="ml-2.5 text-1 text-sm">● 1 hour</p>
                  </div>
                  <h5 className="ml-3 text-xs text-1">Lucky</h5>
                </div>
              </div>

              <div className="flex justify-between mt-2.5 px-2">
                <div className="flex items-center gap-6">
                  <i
                    className={`bi bi-heart-fill text-[26px] ${
                      isLike ? " text-red-700" : ""
                    }`}
                    onClick={() => setIsLike(!isLike)}
                  ></i>
                  <Link to="/show">
                    <i className="bi bi-chat text-[26px]"></i>
                  </Link>
                </div>

                <i className="bi bi-bookmark text-[26px]"></i>
              </div>
              <p className="px-2 mt-2.5 text-sm text-1">5.023 Likes</p>
              <p
                className="mx-2 mt-2.5 text-sm text-1"
                onClick={() => setIsMore(!isMore)}
              >
                {isMore ? text : text.slice(0, 50)}
                <b>...</b>
              </p>
              <hr className="mt-10 border-t border-t-btn" />
            </div> */}
      </div>
    </div>
  );
}
