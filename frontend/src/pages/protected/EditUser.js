import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import EditUser from "../../features/user/EditUser";
function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Edit User" }));
  }, [dispatch]);

  return <EditUser />;
}

export default InternalPage;
