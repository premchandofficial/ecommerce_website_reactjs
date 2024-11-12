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
      <header className="flex justify-between w-full bg-[#3281f8] sticky top-0">
        <div className="flex text-black">
          <h1 className="text-2xl p-4">
            <div className="text-2xl mx-12">
              <img
                src="../../public/mylogo.jpg"
                alt="logo"
                className="w-[100px] h-[60px]"
              />
            </div>
          </h1>
          <div className="flex items-center justify-center">
            <input
              type="text"
              onChange={searchFilterChange}
              placeholder="Search"
              className="h-[40px] py-4 my-4 pl-6 bg-[#e2dbdb] text-1xl outline-none text-[22px] rounded-l-full"
            />
            <button
              className="bg-[#038b47] h-[40px] px-4 text-2xl rounded-r-full text-[white]"
              onClick={() => searchFilters()}
            >
              Search
            </button>
          </div>
        </div>

        <nav className="flex flex-row px-8 mt-[15px]">
          <Link className="flex" to={"/cartpage"}>
            <FaShoppingCart className="text-4xl mx-[5px]" />
            <sup className="text-[22px] bg-[white] text-center py-[18px] mb-[6px] h-[30px] w-[35px] rounded-full">
              {totalQuantity}
            </sup>
          </Link>
        </nav>
      </header>

      <div className="flex">

        <aside className="text-[22px] w-[20%] text-[black] border-r-[1px] border-[#057dee] ">

          <h1 className="text-center p-[15px] font-bold">Filter By Category</h1>
          <div className="flex flex-col items-start font-bold">
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
          <div className="mx-[20px] my-[40px]">
          
            <label htmlFor="he">
              Filter by Price <br /> $. {minPrice} - {maxPrice}
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

        
          <main className="flex flex-wrap w-[80%] items-center justify-center my-4 ">
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
