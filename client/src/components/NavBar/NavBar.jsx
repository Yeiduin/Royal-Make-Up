import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import DropdownMenu from "./DropdownMenu";
import { SearchResults } from "./SearchResults";
import TabBar from "./TabBar";



export const NavBar = ({userLogged}) => {
  const par = useParams();
  const arr = Object.values(par);
  console.log(arr[0]);
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getProductByName(""));
  };

  useEffect(() => {
    
    if(userLogged && userLogged.type == "Admin"){
      document.getElementById("adminPanel").hidden = false;
    }
    else{
      document.getElementById("adminPanel").hidden = true;
    }
  })


  return (
    <nav className="px-4">
      <div className="font-serif text-3xl mt-4 text-primary flex flex-col items-center">
        <Link to="./" onClick={() => handleClick()}>
          <div className="flex items-center space-x-2">
            {/* <div className="bg-logo bg-cover w-8 h-8"></div> */}
            <h1>NIVEADOS</h1>
          </div>
        </Link>
      </div>
      {/* TabBar mobile version */}
      <div className="flex justify-between items-start md:hidden">
        <TabBar />
        <SearchBar/>
        <Link to="./Cart">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8 text-primary"
            >
              {/* {
            JSON.parse(localStorage.getItem('cart'))? 
                <div><img src='https://s.yimg.com/uu/api/res/1.2/Wx4w6Vt8oaHA9zgHD_37ZA--~B/aD01Njk7dz02MzQ7YXBwaWQ9eXRhY2h5b24-/http://36.media.tumblr.com/78d541518a347a9d1b5da591ddc930a3/tumblr_inline_o55fq4egZo1tty580_1280.jpg' alt="punto rojo" width='5px'/></div>
            : null
            } */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </button>
        </Link>
      </div>

      <div className="hidden md:flex md:flex-raw md:justify-around md:px-20 md:mt-4">
        {/* Tab bar Options left */}
        <div className="text-primary">
          <div className="space-x-14 text-xl">
            {arr[0] === "home" ? (
              <Link
                className="underline text-secondary hover:text-secondary"
                to="./home"
                onClick={() => handleClick()}
              >
                Home
              </Link>
            ) : (
              <Link
                className="hover:text-secondary"
                to="./home"
                onClick={() => handleClick()}
              >
                Home
              </Link>
            )}
            {arr[0] === "catalogue" ? (
              <Link
                className="underline text-secondary hover:text-secondary"
                to="./catalogue"
                onClick={() => handleClick()}
              >
                Catalogue
              </Link>
            ) : (
              <Link
                className="hover:text-secondary"
                to="./catalogue"
                onClick={() => handleClick()}
              >
                Catalogue
              </Link>
            )}
            {arr[0] === "about" ? (
              <Link
                className="hover:text-secondary text-secondary underline"
                to="./about"
                onClick={() => handleClick()}
              >
                About
              </Link>
            ) : (
              <Link
                className="hover:text-secondary"
                to="./about"
                onClick={() => handleClick()}
              >
                About
              </Link>
            )}
            <Link
              hidden
              id="adminPanel"
              className="hover:text-secondary"
              to="./admin"
              onClick={() => handleClick()}
            >
              Admin
            </Link>
          </div>{" "}
        </div>
        {/* Tab bar options right icons */}
        <div className="flex space-x-4 items-center">
          <div className="">
            <SearchBar />
          </div>
          {/* BOTONES CON LOS ÍCONOS PARA CARRITO, CORAZONES Y LOGIN */}

          <Link>
            <button className="">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8 text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </button>
          </Link>
          <DropdownMenu />
          <Link to="./Cart">
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8 text-primary"
              >
                {/* {
          JSON.parse(localStorage.getItem('cart'))? 
              <div><img src='https://s.yimg.com/uu/api/res/1.2/Wx4w6Vt8oaHA9zgHD_37ZA--~B/aD01Njk7dz02MzQ7YXBwaWQ9eXRhY2h5b24-/http://36.media.tumblr.com/78d541518a347a9d1b5da591ddc930a3/tumblr_inline_o55fq4egZo1tty580_1280.jpg' alt="punto rojo" width='5px'/></div>
           : null
          } */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </button>
          </Link>
        </div>
      </div>
      <SearchResults />
    </nav>
  );
};
