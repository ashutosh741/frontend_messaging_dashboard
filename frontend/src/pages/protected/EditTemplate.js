import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import EditTemplate from "../../features/template/components/EditTemplate";
function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Edit SMS Template" }));
  }, [dispatch]);

  return <EditTemplate />;
}

export default InternalPage;
