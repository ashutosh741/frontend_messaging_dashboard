import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import Template from "../../features/template";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Messaging Dashboard" }));
  }, [dispatch]);

  return <Template />;
  // return "FGb"
}

export default InternalPage;
