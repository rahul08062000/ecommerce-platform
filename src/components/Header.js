import { Link } from "react-router-dom";
import { logo_URL } from "../utils/constants";
import { useSelector,useDispatch } from "react-redux";
import { addUser,removeUser } from "../utils/redux/userSlice";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  useEffect( () => {
    console.log("use effect call from headers");
    getUserInfo();
  },[]);
  const getUserInfo = async () => {
    console.log("get user info");
      const token= Cookies.get('token')
      console.log("this is token from cookies",token);
   // const token = localStorage.getItem('token');

    if(token){
      const data = await fetch("http://localhost:5000/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-token": token
      },
    });
    const json = await data.json();  
    dispatch(addUser(json));
    setIsLoggedIn(true);

    }
  };
  const handleLogout=()=>{
    //localStorage.removeItem('token')
    Cookies.remove("token");
    dispatch(removeUser());
    setIsLoggedIn(false);
  }
  return (
    <>
      <div className="flex  bg-gray-200 antialiased ">
        <div className="flex flex-col  shadow-xl bg-white  w-screen ">
          <div className="flex flex-col">
            <div className="pt-3 pb-1 px-3 flex flex-col bg-[#232f3e]">
              <div className="flex flex-row justify-between items-center mb-2 py-1">
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-white mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                  <img className="w-20" src={logo_URL} alt="" />
                </div>
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-row bg-white rounded-lg h-10">
                    <input
                      type="text"
                      className="bg-white rounded-lg flex-grow p-2 focus:outline-none"
                      value=""
                      placeholder="Search Amazon"
                      name="search"
                      id="search"
                    />
                    <div className="bg-yellow-400 p-2 rounded-lg mx-auto">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div className="flex">
                    {isLoggedIn? (
                      <Link
                        to="/"
                        className="disabledCursor  text-white justify-between px-4"
                        onClick={(event) => event.preventDefault()}
                      >
                        {user[0]?.user.name}
                      </Link>
                    ) : (
                      <Link
                        to="/login"
                        className="notDisabled text-white justify-between px-4"
                      >
                        Sign In
                      </Link>
                    )}
                    <button onClick={handleLogout} className="text-white px-4">Logout</button>
                   <Link to={'/cart'}> <img src='/cart.svg' alt='cart' /></Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-3 text-white text-sm bg-[#37475a]">
              <div className="flex flex-row items-center">
                <svg
                  className="w-6 h-6 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                <p>Deliver to Marco</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
