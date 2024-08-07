import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import ViewUsers from "../../features/user/ViewUsers";
function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "View Users" }));
  }, [dispatch]);

  return <ViewUsers />;
}

export default InternalPage;
