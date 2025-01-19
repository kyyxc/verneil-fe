import { useEffect, useState } from "react";
import NavigationBar from "../components/navigatioBar";
import BaseLayout from "../components/Layout/baseLayout";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [isLike, setIsLike] = useState(false);
  const [isMore, setIsMore] = useState(false);

  useEffect(() => {
    document.body.classList.remove('overflow-hidden')
  },[])

  let text =
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit.Excepturi quasi quibusdam commodi vitae voluptatibus, asperioreseos laborum quo modi, optio reiciendis corporis sint distinctio  placeat recusandae? Eaque accusantium nulla dolorem?";

  return (
    <>
      <BaseLayout>
        <NavigationBar />
        <main className="w-full lg:flex sm:ml-[76px] lg:ml-[240px] flex-1">
          <div className="flex flex-wrap justify-center lg:flex-[2] mt-20">
            <div className="w-[468px] flex flex-col justify-center">
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
              <img
                src="images/faixfey3.jpg"
                alt=""
                className="mt-4 rounded-sm w-[468px] h-[585px] object-cover"
              />
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
            </div>
          </div>

          <div className="lg:flex-[1] hidden lg:block mt-10">
            <div className="gap-5 flex flex-col">
              <div className="flex items-center">
                <img
                  src="/images/faixfey.jpg"
                  alt=""
                  className="w-[50px] h-[50px] rounded-full"
                />
                <div className="">
                  <div className="ml-3 flex">
                    <h3 className="text-1 text-sm font-semibold">Kyyvrx</h3>
                  </div>
                  <h5 className="ml-3 text-xs text-1">Suggested</h5>
                </div>
              </div>
            </div>
          </div>
        </main>
      </BaseLayout>
    </>
  );
}
