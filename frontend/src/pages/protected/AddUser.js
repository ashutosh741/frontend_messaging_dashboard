import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import AddUser from "../../features/user/AddUser";
function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Add User" }));
  }, [dispatch]);

  return <AddUser />;
}

export default InternalPage;
