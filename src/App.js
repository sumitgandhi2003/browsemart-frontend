import "./App.css";
import { useState, useEffect } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { Navigate } from "react-router-dom";

//import components
// import Signup from "./Component/Signup/Signup";
// import Footer from "./Component/Footer/Footer";
// import Checkout from "./Component/Checkout/Checkout";
// import ForgotPassword from "./Component/ForgotPassword/ForgotPassword";
// import Home from "./Component/Home/Home";
import Cart from "./Component/Cart/Cart";
import LoginPage from "./Component/Pages/LoginPage/LoginPage";
import Navbar from "./Component/Navbar/Navbar";
import ProductPage from "./Component/Pages/ProductPage";
import BuyNow from "./Component/BuyNow/BuyNow";
import SuccessPage from "./Component/BuyNow/SuccessPage";
import ProductsContainer from "./Component/Product/ProductsContainer";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const AppLayout = ({ authToken, setAuthToken, userDetail, setUserDetail }) => {
  String.prototype.capitalise = function () {
    if (this.length === 0) return;
    const name = this.split(" ");
    for (let i = 0; i < name.length; i++) {
      name[i] = name[i].charAt(0).toUpperCase() + name[i].slice(1);
    }
    return name.join(" ");
    // return this.charAt(0).toUpperCase() + this.slice(1);
  };
  return (
    <div className="App">
      <Navbar
        authToken={authToken}
        setAuthToken={setAuthToken}
        userDetail={userDetail}
        setUserDetail={setUserDetail}
      />
      <Outlet />
    </div>
  );
};

const App = () => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("AuthToken"));
  const [userDetail, setUserDetail] = useState();

  const getUserDetail = async () => {
    try {
      const response = await axios({
        method: "POST",
        url: `${SERVER_URL}/api/user/profile`,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${authToken}`,
        },
      });
      return response?.data?.userDetail;
    } catch (error) {
      console.log(error?.response?.data?.message);
      if (error?.response?.data?.message === "Token expired") {
        localStorage.removeItem("AuthToken");
        setAuthToken(null);
      }
    }
  };
  console.log(userDetail);
  // const { data } = getUserDetail();
  // if (data && data.message === "Token expired") {
  //   swal("Expired", "Please login again", "error").then(() => {
  //     localStorage.removeItem("AuthToken");
  //     setAuthToken(null);
  //   });
  // }
  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUserDetail();
      if (userData) {
        setUserDetail(userData);
      }
    };
    fetchData();
  }, [authToken]);

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage authToken={authToken} setAuthToken={setAuthToken} />,
    },
    {
      path: "/",
      element: (
        <AppLayout
          authToken={authToken}
          setAuthToken={setAuthToken}
          userDetail={userDetail}
          setUserDetail={setUserDetail}
        />
      ),
      children: [
        {
          path: "/",
          element: (
            <ProductsContainer authToken={authToken} userDetail={userDetail} />
          ),
        },
        {
          path: "/allproduct",
          element: (
            <ProductsContainer authToken={authToken} userDetail={userDetail} />
          ),
        },
        {
          path: "/product/:productId",
          element: (
            <ProductPage userDetail={userDetail} authToken={authToken} />
          ),
        },
        {
          path: "/cart",
          element: <Cart userDetail={userDetail} authToken={authToken} />,
        },
        {
          path: "product/buy/:productId",
          element: <BuyNow authToken={authToken} userDetail={userDetail} />,
        },
        {
          path: "/checkout",
          element: <BuyNow authToken={authToken} userDetail={userDetail} />,
        },
        {
          path: "/order-success/:orderId",
          element: <SuccessPage />,
        },
        {
          path: "*",
          element: <Navigate to="/allproduct" />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
