import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import axios from "axios";
import swal from "sweetalert";
const defaultProileImage = require("../../assets/images/maleprofileicon.jpg");
const SERVER_URL = process.env.REACT_APP_SERVER_URL.replace(";", "");
const Profile = ({ userDetail, authToken }) => {
  const [profileDetails, setProfileDetails] = useState();
  // let profileDetails = userDetail;
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // String.prototype.capitalise = function () {
  //   if (this.length === 0) return "";
  //   return this.charAt(0).toUpperCase() + this.slice(1);
  // };
  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setProfileDetails((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUpdating((prev) => !prev);
    console.log(profileDetails);
    updateProfile();
  };
  const updateProfile = async () => {
    axios({
      method: "post",
      url: `${SERVER_URL}/api/user/update-profile`,
      headers: { Authorization: `Bearer ${authToken}` },
      data: profileDetails,
    })
      .then((response) => {
        console.log(response);
        setIsUpdating((prev) => !prev);
        setIsEditing((prev) => !prev);
      })
      .catch((error) => {
        const { data, status } = error?.response;
        swal(`Oops! Error ${status}`, data?.message, "error");
        setIsUpdating((prev) => !prev);
        console.log(error);
      });
  };
  useEffect(() => {
    if (userDetail) {
      setProfileDetails(userDetail);
    }
  }, [userDetail]);
  console.log(profileDetails);
  // console.log(userDetail);
  return (
    <div className="w-11/12 h-full relative flex items-center">
      <form className="w-full h-full relative flex flex-col overflow-y-scroll items-center justify-between p-2 gap-4">
        {/* <div className=" w-full h-full"> */}
        <div
          className={
            "w-full h-max top-10 flex flex-col items-center gap-4 relative "
          }
        >
          <div className="h-40 w-40 rounded-full overflow-hidden ">
            <img
              src={profileDetails?.profilePic || defaultProileImage}
              alt="User Avatar"
              className=""
            />
          </div>
          <div className=" profile-detail w-10/12 font-roboto text-lg">
            <div className="flex gap-2 w-full p-1 items-center">
              <label htmlFor="username " className="w-1/3 text-gray-300">
                Name:
              </label>
              {isEditing ? (
                <Input
                  id={"name"}
                  name={"name"}
                  value={profileDetails?.name}
                  placeholder={"Enter Name"}
                  className={
                    "px-2 py-1 bg-gray-100 outline-none border-gray-300 border-2 w-2/3 text-left font-semibold rounded"
                  }
                  onChange={handleChange}
                />
              ) : (
                <p className="name w-2/3 text-left font-semibold" id="username">
                  {profileDetails?.name?.capitalise() || "N/A"}
                </p>
              )}
            </div>
            <div className="flex gap-2 w-full p-1 items-center">
              <label htmlFor="useremail " className="w-1/3 text-gray-300">
                Email:
              </label>
              {isEditing ? (
                <Input
                  id={"username"}
                  name={"email"}
                  value={profileDetails?.email}
                  className={
                    "px-2 py-1 bg-gray-100 outline-none border-gray-300 border-2 w-2/3 text-left font-semibold rounded"
                  }
                  placeholder={"Enter Email"}
                  onChange={handleChange}
                />
              ) : (
                <p id="useremail" className=" w-2/3 text-left font-semibold ">
                  {profileDetails?.email || "N/A"}
                </p>
              )}
            </div>
            <div className="flex gap-2 w-full  p-1 items-center">
              <label htmlFor="usernumber " className="w-1/3 text-gray-300">
                Phone No:
              </label>
              {isEditing ? (
                <Input
                  id={"number"}
                  name={"phoneNumber"}
                  value={profileDetails?.phoneNumber}
                  className={
                    "px-2 py-1 bg-gray-100 outline-none border-gray-300 border-2 w-2/3 text-left font-semibold rounded"
                  }
                  placeholder={"Enter Phone Number"}
                  onChange={handleChange}
                />
              ) : (
                <p id="usernumber" className=" w-2/3 text-left font-semibold">
                  {profileDetails?.phoneNumber || "N/A"}
                </p>
              )}
            </div>

            <div className="flex gap-2 w-full p-1 items-center">
              <label htmlFor="useraddress " className="w-1/3 text-gray-300">
                Address:
              </label>
              {isEditing ? (
                <Input
                  id={"address"}
                  name={"address"}
                  value={profileDetails?.address}
                  className={
                    "px-2 py-1 bg-gray-100 outline-none border-gray-300 border-2 w-2/3 text-left font-semibold rounded"
                  }
                  placeholder={"Enter Address"}
                  onChange={handleChange}
                />
              ) : (
                <p id="useraddress" className=" w-2/3 text-left font-semibold ">
                  {profileDetails?.address || "N/A"}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className=" absolute bottom-3  right-2 flex gap-3">
          <Button
            btntext={isEditing ? "Cancel" : "Edit"}
            classname={
              "bg-blue-500   px-3 py-1 text-white font-roboto outline-none border-none "
            }
            onClick={(e) => {
              e.preventDefault();
              setIsEditing((prev) => !prev);
              if (isEditing) {
                setProfileDetails(userDetail);
              }
            }}
          />
          {isEditing ? (
            <Button
              btntext={"Save"}
              onClick={handleSubmit}
              loading={isUpdating}
            />
          ) : (
            ""
          )}
        </div>
      </form>
    </div>
  );
};

export default Profile;