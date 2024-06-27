import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TitleCard from "../../../components/Cards/TitleCard";
import { API, UserData } from "../../../utils/constants";
import { showNotification } from "../../common/headerSlice";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { handleError } from "../../../utils/errorUtils";

const ProfileSettings = () => {
  let user = UserData();

  const [profileData, setProfileData] = useState(user);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  //   useEffect(() => {
  //     const fetchProfileData = async () => {
  //       try {
  //         const response = await axios.get(`${API}/employee/?id=${user._id}`);
  //         localStorage.setItem("user", JSON.stringify(response.data.data[0]));
  //         delete response?.data?.data[0]?.password;
  //         setProfileData(response.data.data[0]);
  //       } catch (error) {
  //         handleError(error);
  //       }
  //     };
  //     fetchProfileData();
  //   }, [user?._id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "password" && value.trim() === "") {
      const { password, ...profileDataWithoutPassword } = profileData;
      setProfileData(profileDataWithoutPassword);
      return;
    } else {
      setProfileData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const isPasswordValid = (password) => {
    return password.length >= 8;
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleUpdate = async () => {
    if (!profileData.UserName || !profileData.FirstName || !profileData.LastName) {
      dispatch(
        showNotification({
          message: "Please fill all the fields!",
          status: 0,
        })
      );
      return;
    }
    if (profileData.password && !isPasswordValid(profileData.password)) {
      dispatch(
        showNotification({
          message: "Password format is wrong!",
          status: 0,
        })
      );
      return;
    }

    // if (!isEmailValid(profileData.Email)) {
    //   dispatch(
    //     showNotification({
    //       message: "Email is not valid!",
    //       status: 0,
    //     })
    //   );
    //   return;
    // }
    // try {
    //   const tokenResponse = localStorage.getItem("accessToken");
    //   const tokenData = JSON.parse(tokenResponse);
    //   const token = tokenData.token;
    //   // Set the Authorization header with the token
    //   const config = {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   };
    //   console.log("user data before submitting", profileData);
    //   const response = await axios.put(
    //     `${API}/employee/${profileData._id}`,
    //     profileData,
    //     config
    //   );
    //   if (response.status === 200) {
    //     localStorage.setItem("user", JSON.stringify(response.data));
    //     dispatch(
    //       showNotification({
    //         message: "Profile Updated Successfully!",
    //         status: 1,
    //       })
    //     );
    //   } else {
    //     dispatch(
    //       showNotification({
    //         message: "Error in updating Profile!",
    //         status: 0,
    //       })
    //     );
    //   }
    // } catch (error) {
    //   handleError(error);
    //   dispatch(
    //     showNotification({
    //       message: "Error in updating Profile!",
    //       status: 0,
    //     })
    //   );
    // }
  };
  return (
    <>
      <TitleCard
        title="Profile Settings"
        topMargin="mt-2"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="label">UserName</label>
            <input
              type="text"
              name="UserName"
              className="input input-bordered w-full"
              value={profileData?.UserName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="label">FirstName</label>
            <input
              type="text"
              name="FirstName"
              className="input input-bordered w-full"
              value={profileData?.FirstName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="label">LastName</label>
            <input
              type="text"
              name="LastName"
              className="input input-bordered w-full"
              value={profileData?.LastName}
              onChange={handleInputChange}
            />
          </div>
          <div className="relative">
            <label className="label">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="input input-bordered w-full"
              // value={profileData.password}
              onChange={handleInputChange}
            />
            <button
              className="text-sm absolute right-0 top-[62%] mr-2"
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
        {/* <ErrorText styleClass="mt-8">{errorMessage}</ErrorText> */}

        <div className="mt-16">
          <button
            className="btn btn-primary float-right"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </TitleCard>
    </>
  );
};

export default ProfileSettings;
