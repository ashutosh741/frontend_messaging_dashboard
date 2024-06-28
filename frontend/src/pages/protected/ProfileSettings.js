import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import ProfileSettings from "../../features/user/profilesettings";
function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Update Profile" }));
  }, [dispatch]);

  return <ProfileSettings />;
}

export default InternalPage;
