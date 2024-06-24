import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Report Summary" }));
  }, [dispatch]);
  // need to create report summary component here

//   return <Dashboard />;
}

export default InternalPage;
