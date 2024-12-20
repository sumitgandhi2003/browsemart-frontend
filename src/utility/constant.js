import { FaWhatsapp, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import axios from "axios";
import swal from "sweetalert";
export const API_URL = "https://fakestoreapi.com/";

export const SERVER_URL = process.env.REACT_APP_SERVER_URL;
export const handleAddToCart = (
  userDetail,
  productId,
  authToken,
  setProductAdding
) => {
  if (userDetail === "" || userDetail === undefined || userDetail === null) {
    alert("Please login First!");
    return;
  }
  setProductAdding((prev) => !prev);
  axios({
    method: "POST",
    url: `${SERVER_URL}/api/user/add-to-cart`,
    data: {
      userId: userDetail.id,
      productId: productId,
      quantity: 1,
    },
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${authToken}`,
    },
  })
    .then((response) => {
      console.log(response);
      setProductAdding((prev) => !prev);
      swal(
        "Product Added!",
        "Your product is Added to Cart you can proceed next",
        "success"
      );
    })
    .catch((error) => {
      console.log(error);
    });
};
export const socialMedia = [
  {
    name: "Whatsapp",
    link: "https://wa.me/?text=",
    icon: (
      <FaWhatsapp className="text-3xl p-1 text-blue-400 rounded-full hover:bg-blue-400 hover:text-white" />
    ),
  },
  // {
  //   name: "Facebook",
  //   link: "https://www.facebook.com/sharer/sharer.php?u=",
  //   icon: <FaFacebook />,
  // },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/messaging/compose?message=",
    icon: (
      <FaLinkedin className="text-3xl p-1 text-blue-400 rounded-full hover:bg-blue-400 hover:text-white" />
    ),
  },
  {
    name: "Email",
    link: "mailto:?body=",
    icon: (
      <MdEmail className="text-3xl p-1 text-blue-400 rounded-full hover:bg-blue-400 hover:text-white" />
    ),
  },
];

export const productCategory = [
  {
    id: 1,
    name: "category",
    value: "electronics",
    child: ["Smartphones", "laptops", "cameras", "headphones", "gadgets"],
  },
  {
    id: 2,
    name: "category",
    value: "clothing",
    child: ["shirts", "pants", "t-shirts", "jeans", "dresses"],
  },
  {
    id: 3,
    name: "category",
    value: "home & kitchen",
    child: [
      "Cookware",
      "appliances",
      "furniture",
      "kitchenware",
      "household items",
    ],
  },
  {
    id: 4,
    name: "cateory",
    value: "books",
    child: ["fiction", "non-fiction", "children's books", "mystery", "romance"],
  },
  {
    id: 5,
    name: "category",
    value: "grocery",
    child: [
      "vegetables",
      "fruits",
      "meat",
      "dairy",
      "bakery",
      "snacks",
      "beverages",
    ],
  },
  {
    id: 6,
    name: "category",
    value: "toys",
    child: [
      "action figures",
      "electronic toys",
      "building toys",
      "sports toys",
      "diy toys",
    ],
  },
  {
    id: 7,
    name: "category",
    value: "sports",
    child: ["football", "basketball", "tennis", "hockey", "golf"],
  },
  {
    id: 8,
    name: "category",
    value: "health & beauty",
    child: [
      "makeup",
      "skincare",
      "hair care",
      "beauty supplies",
      "personal care",
      "fragrances",
      "Health Care",
    ],
  },
  {
    id: 9,
    name: "category",
    value: "fashion",
    child: ["shoes", "accessories", "jewelry"],
  },
  {
    id: "10",
    name: "category",
    value: "others",
  },
];

export const productBrands = [
  { id: 1, name: "Apple", value: "apple" },
  { id: 2, name: "Nike", value: "nike" },
  { id: 3, name: "Samsung", value: "samsung" },
  { id: 4, name: "Adidas", value: "adidas" },
  { id: 5, name: "Sony", value: "sony" },
  { id: 6, name: "Microsoft", value: "microsoft" },
  { id: 7, name: "Gucci", value: "gucci" },
  { id: 8, name: "LG", value: "lg" },
  { id: 9, name: "Rolex", value: "rolex" },
  { id: 10, name: "Puma", value: "puma" },
  { id: 11, name: "Reebok", value: "reebok" },
  { id: 12, name: "Vans", value: "vans" },
  { id: 13, name: "H&M", value: "hm" },
  { id: 14, name: "Zara", value: "zara" },
  { id: 15, name: "Versace", value: "versace" },
  { id: 16, name: "Chanel", value: "chanel" },
  { id: 17, name: "Gucci", value: "gucci" },
  { id: 18, name: "Dior", value: "dior" },
  { id: 19, name: "Prada", value: "prada" },
  { id: 20, name: "Burberry", value: "burberry" },
  { id: 21, name: "Others", value: "others" },
];

export const formatAmount = (amount) => {
  const amountString = amount.toString();
  return amountString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
