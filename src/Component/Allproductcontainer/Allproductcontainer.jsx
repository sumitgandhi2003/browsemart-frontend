import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../../utility/constant";
import { Link } from "react-router-dom";
import Productcard from "../Productcard/Productcard";
import Loader from "../Loader/Loader";
// import { SERVER_URL } from "../../config";
const serverErrorImage = require("../../assets/images/serverError.jpg");
const SERVER_URL = process.env.REACT_APP_SERVER_URL.replace(";", "");
const Allproductcontainer = () => {
  const [allProduct, SetAllProduct] = useState();
  const [allCategories, SetAllCategories] = useState();
  const [filteredProduct, SetFilteredProduct] = useState();
  const [filteredCategory, SetFilteredCategory] = useState([]);
  const [isDataFetch, setIsDataFetch] = useState(false);
  const [error, setError] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    // const formElement = Array.from(e.target.elements).slice(0, -1);
    // console.log(formElement);
    // formElement.map((element, index) => {
    //   console.log(element.checked);
    //   console.log(element.value);
    //   if (element.checked) {
    //     SetFilteredProduct(
    //       allProduct?.filter((item) => item.category.includes(element.value))
    //     );
    //   }
    // });
    let filter = [];
    filteredCategory.forEach((category) => {
      const products = allProduct?.filter((item) =>
        item.category.includes(category)
      );
      filter = [...filter, ...products];
    });
    SetFilteredProduct(filter);
  };

  const getAllProduct = () => {
    axios
      .get(`${SERVER_URL}/api/product/get-all-products`)
      .then((response) => {
        SetAllProduct(response.data);
        SetFilteredProduct(response.data);
        setIsDataFetch(true);
      })
      .catch((error) => {
        console.error(error);
        setError({ error: error.message });
      });
  };
  const getAllCategory = () => {
    try {
      axios
        .get(API_URL + "products/categories")
        .then((response) => SetAllCategories(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    if (e.target.checked) {
      SetFilteredCategory((previous) => [...previous, e.target.value]);
    }
    // e.target.checked
    //   ? SetFilteredProduct(
    //       allProduct?.filter((item) => item.category.includes(e.target.value))
    //     )
  };

  useEffect(() => {
    // axios
    //   .get(API_URL + "products")
    //   .then((response) => {
    //     SetAllProduct(response.data);
    //     SetFilteredProduct(response.data);
    //     setIsDataFetch(true);
    //   })
    //   .catch((error) => console.log(error));
    getAllProduct();
    getAllCategory();
  }, []);
  if (error.error) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        {/* <h1 className="text-center text-red-500">{error.error}</h1>; */}
        <img src={serverErrorImage} className="h-[500px]" alt="server error" />
      </div>
    );
  }
  if (isDataFetch && !filteredProduct?.length > 0)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="text-7xl ">No Found</div>
      </div>
    );
  if (!isDataFetch) return <Loader />;

  return (
    filteredProduct && (
      <div className="product-container w-full h-full mt-4 flex gap-2 p-4">
        <div className="left-section w-2/12 h-full border border-black bg-gray min-w-[200px] mobile:hidden laptop:block">
          <h2 className="text-center">Filter</h2>
          <div className="p-2 ">
            <form action="" onSubmit={(e) => handleSubmit(e)}>
              {allCategories?.map((category, index) => {
                return (
                  <div className="flex gap-1 items-center" key={index}>
                    <input
                      type="checkbox"
                      name="filter"
                      id={category}
                      onClick={(e) => {
                        handleChange(e);
                      }}
                      value={category}
                    />
                    <label htmlFor={category} className="cursor-pointer">
                      {category}
                    </label>
                  </div>
                );
              })}
              <input
                type="submit"
                className="p-2 w-full my-2 cursor-pointer flex justify-center items-center  bg-blue-900 rounded-md text-white"
                value="Apply"
              />
            </form>
          </div>
        </div>

        <div className="right-section grid grid-cols-5 mobile:grid-cols-2 small-device:grid-cols-3 tablet:grid-cols-4 laptop:grid-cols-4 desktop:grid-cols-5 large-device:grid-cols-6 w-10/12 justify-around flex-wrap gap-3 mobile:w-full laptop:w-10/12">
          {filteredProduct &&
            filteredProduct.map((product, index) => {
              return (
                <Link
                  to={"/product/" + product?.["_id"]}
                  className="w-full "
                  key={index}
                >
                  <div className="flex w-full justify-center">
                    <Productcard product={product} key={index} />
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    )
  );
};

export default Allproductcontainer;
