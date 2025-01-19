import BaseLayout from "../components/Layout/baseLayout";
import NavigationBar from "../components/navigatioBar";

export default function ExplorePage() {
  return (
    <BaseLayout>
      <NavigationBar />

      <div className="flex-1 lg:flex sm:ml-[76px] lg:ml-[240px] sm:flex sm:flex-col">
        <div className="p-4">
          <div className="grid grid-cols-3 gap-1 mb-20">
            <div className="h-50">
              <img
                src="images/iambluedee1.jpg"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div className="h-50">
              <img
                src="images/iambluedee2.jpg"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div className="h-50">
              <img
                src="images/iambluedee3.jpg"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div className="h-50">
              <img
                src="images/iambluedee4.jpg"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div className="h-50">
              <img
                src="images/iambluedee5.jpg"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div className="h-50">
              <img
                src="images/iambluedee6.jpg"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
