import { useState } from "react";
//import components
import Hamburger from "../Hamburger/Hamburger";
import { Link } from "react-router-dom";
import ProfileSlider from "../Profile/ProfileSlider";
const maleProfileIcon = require("../../assets/images/maleprofileicon.jpg");
const Navbar = ({ authToken, setAuthToken, userDetail }) => {
  const [isShow, SetIsShow] = useState(false);
  const [showProfileSlider, setShowProfileSlider] = useState(false);
  // String.prototype.capitalise = function () {
  //   if (this.length === 0) return "";
  //   return this.charAt(0).toUpperCase() + this.slice(1);
  // };
  return (
    <div className="nav-bar flex justify-between items-center w-full h-16 p-3 bg-blue-400 sticky top-0 z-50 shadow-md  shadow-black/20">
      <Link to={"/"}>
        <div className="logo text-2xl text-white font-bold">BrowseMart</div>
      </Link>
      {/* <div className="input w-5/12 border border-white mobile:hidden tablet:block">
        Input
      </div> */}
      <div
        className={`links flex w-min gap-4 bg-blue-400 only:border-b-white only:border-b-2 justify-end items-center text-white font-semibold text-lg `}
      >
        {/* Show profile / Login Section */}
        {authToken !== null && authToken !== undefined && authToken !== "" ? (
          <div
            className="flex gap-2 items-center cursor-pointer"
            onClick={() => setShowProfileSlider((prev) => !prev)}
          >
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img
                src={maleProfileIcon}
                className="w-full"
                alt="profile icon"
              />
            </div>
            <div className=" w-max mobile:hidden small-device:block ">
              {userDetail?.name?.capitalise() || "Profile"}
            </div>
          </div>
        ) : (
          <Link to={"/login"}>
            <div className="bg-blue-600 py-1 px-3 rounded h-min ">Login</div>
          </Link>
        )}
      </div>

      {/* profileSlider */}
      {authToken !== null && authToken !== undefined && authToken !== "" && (
        <ProfileSlider
          showProfileSlider={showProfileSlider}
          setShowProfileSlider={setShowProfileSlider}
          userDetail={userDetail}
          setAuthToken={setAuthToken}
          authToken={authToken}
        />
      )}

      {/* <Hamburger isShow={isShow} SetIsShow={SetIsShow} /> */}
    </div>
  );
};

export default Navbar;

// mobile:${
//   isShow ? "flex-col" : "hidden"
// } mobile:absolute mobile:top-16 mobile:left-0 mobile:w-full mobile:text-left mobile:p-2 mobile:bg-blue-4000 mobile: tablet:flex tablet:top-0 tablet:relative tablet:w-1/3
