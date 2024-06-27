import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  API,
  UserData,
  Users,
  pdfCompanyName,
} from "../../../utils/constants.js";
import { handleError } from "../../../utils/errorUtils.js";

const user = UserData;

const TOKEN = localStorage.getItem("accessToken");

function TemplatePointers() {
  const [TLname, setTLName] = useState("");
  const [TLcontact, setTLContact] = useState("");
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${API}/employee/?id=${user.teamLeaderId}`
        );
        setTLName(response.data.data[0].name);
        setTLContact(response.data.data[0].contact);
      } catch (error) {
        handleError(error);
      }
    };
    if (
      !user?.isAdmin &&
      user?.teamLeaderId !== null &&
      user?.teamLeaderId !== undefined
    ) {
      fetchUserData();
    }
  }, []);

  return (
    <>
      {TOKEN ? (
        <div>
          {user.RoleName === "superadmin" ? <div>Welcome To Messaging Dashboard SUPERADMIN {user.FirstName}</div> : null}
          {user.RoleName === "admin" ? (
            <Link className="flex justify-center" to="/app/totalAssignedLeads">
              <button className="btn btn-primary mt-4 justify-center">
                Get Started
              </button>
            </Link>
          ) : null}
          {user.RoleName === "user" ? (
            <Link className="flex justify-center" to="/app/allCategory">
              <button className="btn btn-primary mt-4 flex justify-center">
                Get Started
              </button>
            </Link>
          ) : null}
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default TemplatePointers;
