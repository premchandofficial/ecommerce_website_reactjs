import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addtoCart } from "../reduxtoolkit/createSlice";
import { FaShoppingCart } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import { AiTwotoneMail } from "react-icons/ai";

import { Link } from "react-router-dom";
import { countTotalQuantityPrice } from "../reduxtoolkit/createSlice";

//import Product from "../Products.json";


function Home() {
  const dispatch = useDispatch();
  const { stateData, totalQuantity } = useSelector(
    (state) => state.myStoreData
  );
  useEffect(() => {
    dispatch(countTotalQuantityPrice());
  }, [stateData]);

  // search filters hooks
  const [searchItem, setSearchItem] = useState([]);

  //category filters hooks
  const [mainProducts, setMainProducts] = useState([]);
  const [category, setCategory] = useState([]);

  //price filters hooks
  const [minPrice, setminPrice] = useState(0);
  const [maxPrice, setmaxPrice] = useState(1000);
  // search filter handle change
  function searchFilterChange(e) {
    setSearchItem(e.target.value);
  }
  // search filters function
  function searchFilters() {
    let searchData = category.filter((curvalue) => {
      return curvalue.title.toLowerCase().includes(searchItem);
    });
    setMainProducts(searchData);
  }
  //category filter function
  function filterItems(val) {
    let updateItem = category.filter((item) => {
      //console.log(item)
      return item.category === val;
    });
    setMainProducts(updateItem);
    //console.log(updateItem)
  }
  // price filter handle change
  function priceFilterChange(event) {
    let { value } = event.target;
    setmaxPrice(value);
  }
  //price filter function
  function filterPrice() {
    let filterPrice = category.filter((items) => {
      return items.price >= minPrice && items.price <= maxPrice;
    });
    setMainProducts(filterPrice);
  }

  // get fake API data
  let getApiData = async () => {
    try {
      let apiResponce = await fetch("https://fakestoreapi.com/products");
      let apiData = await apiResponce.json();
      //console.log(data)
      setMainProducts(apiData);
      setCategory(apiData);
    } catch (error) {
      console.log("Failed to fetch data");
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  return (
    <div className=" text-[#0a0a0a] w-full h-fit bg-[#e4e3e3] ">

      <header className="bg-[#3281f8] sticky top-0 sm:flex sm:justify-between sm:px-[20px]">

        <div className=" text-black flex justify-between  px-[10px] sm:flex sm:pb-[10px] sm:justify-between  ">
          <div className="px-[50px]">
            <div className="pt-[10px]">
              <img
                src="../../public/e-commerce-logo2.png"
                alt="logo"
                className="w-[50px] h-[50px]"
              />
            </div>
          </div>
          <div className="pt-[20px]">
            <input
              type="text"
              onChange={searchFilterChange}
              placeholder="Search"
              className="h-[30px] w-[180px] pl-[10px] rounded-l-full"
            />
            <button
              className="bg-[#038b47] h-[30px] px-[8px] rounded-r-full text-[white]"
              onClick={() => searchFilters()}
            >
              Search
            </button>
          </div>
        </div>

        <nav className="flex items-end justify-end px-8 mt-[15px] sm:pb-[5px]">
          <Link className="flex" to={"/cartpage"}>
            <FaShoppingCart className="text-4xl mx-[5px]" />
            <sup className="text-[22px] bg-[white] text-center py-[16px] mb-[6px] h-[10px] w-[30px] rounded-full">
              {totalQuantity}
            </sup>
          </Link>
        </nav>
      </header>

      <div> 
        <img src="../../public/Sale-banners.webp" alt="" className="w-full"/>
      </div>

      <div className="">

        <aside className="text-[22px] text-[black] border-[#057dee] sm:pt-[40px] sm:px-[50px]">

          <h1 className="text-center pt-[15px] font-bold text-[30px]">Filter By Category</h1>
          <div className="font-bold">
            <button
              className="mx-[20px] my-[10px] border-b-[2px] border-[black]"
              onClick={() => setMainProducts(category)}
            >
              All Products
            </button>
            <button
              className="mx-[20px] my-[10px] hover:border-b-[2px] border-[black]"
              onClick={() => filterItems("men's clothing")}
            >
              Mans clothing
            </button>
            <button
              className="mx-[20px] my-[10px] hover:border-b-[2px] border-[black]"
              onClick={() => filterItems("women's clothing")}
            >
              Women clothing
            </button>
            <button
              className="mx-[20px] my-[10px] hover:border-b-[2px] border-[black]"
              onClick={() => filterItems("jewelery")}
            >
              Jewelery
            </button>
            <button
              className="mx-[20px] my-[10px] hover:border-b-[2px] border-[black]"
              onClick={() => filterItems("electronics")}
            >
              Electonics
            </button>
          </div>
          <div className=" mx-[20px] my-[0px] font-bold sm:pt-[15px]">
          
            <label htmlFor="he">
              Filter by Price $.  { minPrice} - {maxPrice}
            </label>
            <br />
            <input
              className="h-[10px] text-[red]"
              type="range"
              id="he"
              min="0"
              max="1000"
              value={maxPrice}
              onChange={priceFilterChange}
              onClick={filterPrice}
            />
          </div>
        </aside>

        
          <main className="flex flex-wrap items-center justify-center my-4 sm:gap-[20px] sm:pt-[20px] ">
          {mainProducts.map((products, index) => {
              const { image, price, title } = products;
              let text = title.slice(0, 25);
              //console.log(items)
              return (
                <div className="flex gap-4" key={index}>
                  <div className="w-[240px] h-[350px] border-[black] border-[1px] flex flex-col items-center ">
                    <img
                      src={image}
                      alt="image"
                      className="w-[100%] h-[220px] bottom-gray-500 border-[2px]"
                    />

                    <p className="p-[6px]  font-bold ">{`Price: $ ${price}`}</p>
                    <p className=" font-bold">{text}</p>

                    <button
                      onClick={() => dispatch(addtoCart(products))}
                      className="px-4 py-2 mt-[10px] font-semibold text-lg bg-black text-white 
                                rounded-md shadow-sm w-[180px] hover:bg-[#074ea0] text-[25px] duration-500 "
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              );
            })}
          </main>
        
      </div>

      <footer className="flex flex-col text-white items-center px-[10px] bg-[#006eff]">
          <div className="flex flex-col items-center my-[10px]">
            <h1 className="text-[20px] font-medium">About Us</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Recusandae blanditiis quae repudiandae?
            </p>
          </div>
          <div className="flex flex-col items-center mb-[10px]">
            <h1 className="text-[20px] font-medium">Contact Us</h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora,
              soluta.
            </p>

            <div className="flex text-[30px] gap-[10px] my-[10px]">
              <FaLinkedin />
              <FaSquareFacebook />
              <AiTwotoneMail />
            </div>
          </div>
          <div></div>
        </footer>
    </div>
  );
}

export default Home;
