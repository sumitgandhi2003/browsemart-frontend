import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import CartCard from "./CartCard";
import EmptyCart from "./EmptyCart";

const emptyCartImage = require("../../assets/images/emptyCart.png");
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const Cart = ({ userDetail, authToken }) => {
  const navigate = useNavigate();
  const [cartItem, setCartItem] = useState();
  const [isDataFetching, setIsDataFetching] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  let amount = 0;
  if (authToken === null || authToken === undefined || authToken === "") {
    navigate("/login");
  }
  const getCartItem = () => {
    setIsDataFetching(true);
    axios({
      method: "POST",
      url: `${SERVER_URL}/api/user/get-cart-items`,
      headers: { Authorization: `Bearer ${authToken}` },
      data: { userId: userDetail?.id },
    })
      .then((response) => {
        setCartItem(response?.data?.cartProduct);
        setIsDataFetching(false);
        // setCartItem(response.data);
      })
      .catch((error) => {
        console.error(error);
        setIsDataFetching(false);
      });
  };

  useEffect(() => {
    getCartItem();
  }, [authToken]);
  console.log(cartItem);
  if (isDataFetching) return <Loader />;
  else if (!isDataFetching && cartItem?.length === 0) return <EmptyCart />;

  // Check if user is authenticated
  if (!authToken) {
    return <div>Please log in to view your cart</div>;
  }

  return (
    <div className="flex h-screen gap-5 p-3 bg-blue-400 relative">
      {/* Shopping cart section */}
      <div className="w-10/12 h-min mobile:w-full tablet:w-10/12 p-6 flex flex-col gap-5 bg-white rounded-md overflow-hidden">
        <div className="flex justify-between items-center p-2 border-b-2">
          <span className="font-semibold font-roboto text-3xl">
            Shopping Cart
          </span>
          <span className=" font-semibold font-roboto text-xl">
            {cartItem?.length} Items
          </span>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex w-full gap-4 items-center p-2 border-b-2">
            <span className="w-1/2">Product Details</span>

            <div className="w-1/2 gap-2 flex justify-between items-center">
              <span className="w-1/3 flex justify-center items-center">
                Price
              </span>
              <span className="w-1/3 flex justify-center items-center">
                Quantity
              </span>
              <span className="w-1/3 flex justify-center items-center">
                Total
              </span>
            </div>
          </div>
          {cartItem &&
            cartItem?.map((product, index) => {
              amount += product?.quantity * product?.item?.price;
              // console.log(product?.quantity * product?.item?.price);
              // setTotalAmount(product?.quantity * product?.item?.price);
              // else
              //   setTotalAmount(
              //     totalAmount + product?.quantity * product?.item?.price
              //   );

              return (
                // <Link to={"/product/" + product?.item?._id}>
                <CartCard
                  product={product}
                  key={product?.item?._id}
                  authToken={authToken}
                  isDataFetching={isDataFetching}
                  setIsDataFetching={setIsDataFetching}
                  getCartItem={getCartItem}
                />
              );
            })}
        </div>
      </div>

      {/* check Out Section */}
      <div className="w-4/12 h-min mobile:hidden tablet:flex p-6 flex flex-col gap-5 bg-white rounded-md justify-between">
        <div className="flex justify-between items-center p-2 border-b-2">
          <span className="font-semibold font-roboto text-3xl">
            Order Summary
          </span>
        </div>
        <div className="w-full flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <div>Discount</div>
            <div className="w-full flex justify-between items-center">
              <span className="w-1/2">Total Items:</span>{" "}
              <span className="w-1/2"> {cartItem?.length}</span>
            </div>
            <div className="w-full flex justify-between items-center">
              <span className="w-1/2">Total Amount:</span>{" "}
              <span className="w-1/2"> {amount}</span>
            </div>
          </div>
          <Button
            btntext={"Check Out"}
            className={"bg-blue-500 text-white p-2 rounded-full"}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;