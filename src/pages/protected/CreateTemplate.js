import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import  AddNewTemplate  from "../../features/template/components/AddNewTemplate";
function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Create SMS Template" }));
  }, [dispatch]);

  return <AddNewTemplate />;
}

export default InternalPage;
