import { useEffect } from "react";
import BaseLayout from "../components/Layout/baseLayout";
import NavigationBar from "../components/navigatioBar";
import { usePostContext } from "../context/PostProvide";

export default function MessagePage() {
  const { setTabStatus } = usePostContext();

  useEffect(() => {
    setTabStatus(true);
  }, []);

  return (
    <BaseLayout>
      <NavigationBar></NavigationBar>
    </BaseLayout>
  );
}
