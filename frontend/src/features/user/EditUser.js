import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { showNotification } from "../common/headerSlice";
import { API } from "../../utils/constants";
import TitleCard from "../../components/Cards/TitleCard";
import InputText from "./components/Input/InputText";
import { handleError } from "../../utils/errorUtils";
import { useNavigate, useParams } from "react-router-dom";

function EditUser() {
  const { UserName } = useParams();
  const navigate = useNavigate();

  const INITIAL_USER_OBJ = {
    FirstName: "",
    LastName: "",
    UserName: "",
    RoleName: "",
    Password: "",
  };

  const [userObj, setUserObj] = useState(INITIAL_USER_OBJ);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const baseURL = `${API}/user/users/${UserName}`;
      try {
        const response = await axios.get(baseURL, config);
        if (response.status === 200) {
          console.log("response is",response)
          setUserObj(response.data.data.data[0]);
        } else {
          console.log("access token incorrect");
        }
      } catch (error) {
        if (error.response.status === 409) {
          localStorage.clear();
          window.location.href = "/login";
        }
        console.error("error", error);
      }
      // dispatch(sliceLeadDeleted(false));
    };

    fetchData();
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();
    if (userObj.FirstName.trim() === "") {
      dispatch(
        showNotification({
          message: "First Name is required!",
          status: 0,
        })
      );
      return;
    }
    if (userObj.LastName.trim() === "") {
      dispatch(
        showNotification({
          message: "Last Name is required!",
          status: 0,
        })
      );
      return;
    }
    if (userObj.UserName.toString().trim() === "") {
      dispatch(
        showNotification({
          message: "Email is required!",
          status: 0,
        })
      );
      return;
    }
    if (!isEmailValid(userObj.UserName)) {
      return dispatch(
        showNotification({
          message: "Email is not Valid!",
          status: 0,
        })
      );
    }

    if (userObj.RoleName === "default") {
      dispatch(
        showNotification({
          message: "Role Name is required.",
          status: 0,
        })
      );
      return;
    } else {
      console.log("uesr data is", userObj);
      userObj.FirstName = userObj.FirstName.trim();
      userObj.LastName = userObj.LastName.trim();
      userObj.UserName = userObj.UserName.trim();
      userObj.RoleName = userObj.RoleName.trim();
      
      // Check if Password exists
      if (userObj.Password) {
        userObj.Password = userObj.Password.trim(); // Trim Password if it exists
      } else {
        delete userObj.Password; // Remove Password property if it does not exist
      }
      try {
        const token = localStorage.getItem("accessToken");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.patch(
          `${API}/UpdateUser/Update/${UserName}`,
          userObj,
          config
        );

        if (response.status === 200) {
          setUserObj(INITIAL_USER_OBJ);

          dispatch(
            showNotification({
              message: response.data.message,
              status: 1,
            })
          );
          navigate("/app/viewUsers");
        }
      } catch (error) {
        handleError(error);
        dispatch(
          showNotification({
            message: error.response.data.message,
            status: 0,
          })
        );
      }
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setUserObj({ ...userObj, [updateType]: value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserObj({ ...userObj, [name]: value });
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
      <TitleCard title="Update User Details" topMargin="mt-2">
        <form onSubmit={(e) => submitForm(e)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputText
              defaultValue={userObj.FirstName}
              updateType="FirstName"
              containerStyle="mt-4"
              labelTitle="First Name"
              updateFormValue={updateFormValue}
            />

            <InputText
              defaultValue={userObj.LastName}
              updateType="LastName"
              containerStyle="mt-4"
              labelTitle="Last Name"
              updateFormValue={updateFormValue}
            />
            <InputText
              defaultValue={userObj.UserName}
              type="email"
              updateType="UserName"
              containerStyle="mt-4"
              labelTitle="Email"
              updateFormValue={updateFormValue}
            />

            <div>
              <label className="label mt-4">Role Name</label>
              <select
                name="RoleName"
                updateType="RoleName"
                className="input input-bordered w-full pe-2"
                onChange={handleInputChange}
                value={userObj.RoleName}
              >
                <option value="default" selected disabled>
                  Select Role
                </option>
                <option value="admin">ADMIN</option>
                <option value="user">USER</option>
              </select>
            </div>
            <div className="relative">
              <InputText
                defaultValue={userObj.Password}
                type={showPassword ? "text" : "password"}
                updateType="Password"
                containerStyle="mt-4"
                labelTitle="Password"
                updateFormValue={updateFormValue}
              />
              <button
                className="text-sm absolute right-0 top-[62%] pt-[5px] mr-2"
                type="button"
                onClick={togglePasswordVisibility}
              >
                {!showPassword ? (
                  <EyeIcon className="h-5 w-5" />
                ) : (
                  <EyeSlashIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          <div className="mt-4">
            <button className="btn btn-primary float-right" type="submit">
              Update
            </button>
          </div>
        </form>
      </TitleCard>
    </>
  );
}

export default EditUser;
