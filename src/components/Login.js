import { useNavigate } from "react-router-dom";
import { logo_URL } from "../utils/constants";
import { useState, useRef, useEffect } from "react";

const Login = () => {
  
  const email = useRef();
  const password = useRef();
  const name = useRef();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    console.log("useEffect",userToken);
    localStorage.setItem("token", JSON.stringify(userToken));
  }, [userToken]);
  const onContinue = async () => {
    if (isSignUp) {
      try {
        const data = await fetch("http://localhost:5000/users/register", {
          method: "POST",
          body: JSON.stringify({
            name: name.current.value,
            email: email.current.value,
            password: password.current.value,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!data.ok) {
          throw new Error("Network response was not ok");
        }

        const responseData = await data.json();
        console.log("this is json object", responseData);
        setUserToken(responseData.token);
        navigate("/");
        //getUserInfo(json);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        setErrorMessage(error);
      }
    } else {
      try {
        const data = await fetch("http://localhost:5000/users/login", {
          method: "POST",
          body: JSON.stringify({
            email: email.current.value,
            password: password.current.value,
          }),
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!data) {
          throw new Error("Network response was not ok");
        }
        console.log('Response-->', data);
        const json = await data.json();
        console.log("this is json object", json);
        localStorage.setItem("token", JSON.stringify(json?.token));
        setUserToken(json?.token);
        // console.log("This is user data",json)
        navigate("/");
      } catch (error) {
        console.log("There was a problem with the fetch operation:", error);
        setErrorMessage(error);
      }
    }
  };
 
  const handleClick = () => {
    setIsSignUp(!isSignUp);
    email.current.value = "";
    password.current.value = "";
  };
  return (
    <>
      <div>
        <img className="w-[11rem]  m-auto" src={logo_URL} alt="logo" />
      </div>
      <div>
          <form
          onSubmit={(e) => e.preventDefault()}
          className="w-4/12 m-auto p-[30px] border rounded-sm mb-5"
        >
          <h1 className="text-2xl p-5">{isSignUp ? "Sign Up" : "Sign In"}</h1>
          <div className="flex  flex-col">
            <div className="">
              {isSignUp && (
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white start-0">
                  Enter your Name
                </label>
              )}
              {isSignUp && (
                <input
                  ref={name}
                  type="text"
                  id="first_name"
                  class="w-full  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              )}
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white start-0">
                Enter mobile phone number or email
              </label>
              <input
                ref={email}
                type="text"
                id="first_name"
                class="w-full  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              <label className="text-center">Password</label>
              <input
                ref={password}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md
             focus:ring-blue-500 focus:border-blue-500 block w-full h-10 mt-2 p-2.5 dark:bg-gray-700
             dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
             dark:focus:border-blue-500"
                type="text"
              ></input>
            </div>
            <p>{errorMessage}</p>
            <button
              onClick={onContinue}
              className="bg-[#fcd200] rounded-md  w-full h-8 mt-2 mb-3 text-white"
            >
              continue
            </button>
            <p className="leading-5 mx-6 my-3">
              By continuing, you agree to Amazon's Conditions of Use and Privacy
              Notice.
            </p>
            <button className="text-[#007ed2] text-start mx-6 mt-5 text-sm ">
              ▶Need help?
            </button>
            <span className="border-b-2 border-gray-500 m-5"></span>
            <p className="leading-5 mx-6 my-3">Buying for work?</p>
            <button className="leading-5 text-start mx-6 my-3 mb-6 text-[#007ed2]">
              Shop on Amazon Business
            </button>
            <span className="mb-12"></span>
          </div>
        </form>
        <div className="w-4/12 m-auto text-center">
          <span className="border-b-2 border-gray-500 text-center"></span>
          <p className="text-sm mx-6 my-3">New to Amazon?</p>
          <button
            onClick={handleClick}
            className="bg-gray-50 border px-10 w-4/5 mx-10 hover:bg-[#f7fafa]
         focus:bg-[#f7fafa] focus::border-[#f7fafa] rounded-lg mb-32"
          >
            {isSignUp ? "Already user? LogIn" : "create your Amazon account"}
          </button>
        </div>
      </div>
    </>
  );
};
export default Login;
