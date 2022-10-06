import React, { useState, useEffect } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { Link } from "react-router-dom";

const TabBar = ({ userLogged }) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if(userLogged && userLogged.type == "Admin"){
      document.getElementById("adminPanel").hidden = false;
    }
    else{
      document.getElementById("adminPanel").hidden = true;
    }
  })

  return (
    <section className="flex gap-6">
      <div className={` ${open ? "w-full" : "w-8"} duration-500 text-gray-500`}>
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        {open ? (
          <div className="flex flex-col gap-4 px-4 relative ">
            <Link
              to="./home"
              className="flex items-center space-x-3"
              onClick={() => setOpen(!open)}
            >
              <i class="material-icons">home</i>
              <h1>Home</h1>
            </Link>
            <Link
              to="./catalogue"
              className="flex items-center space-x-3"
              onClick={() => setOpen(!open)}
            >
              <i class="material-icons">list</i>
              <h1>Catalogue</h1>
            </Link>
            <Link
              to="About"
              className="flex items-center space-x-3"
              onClick={() => setOpen(!open)}
            >
              <i class="material-icons">info</i>
              <h1>About</h1>
            </Link>
            <Link
              hidden
              to="Admin"
              id="adminPanel"
              className="flex items-center space-x-3"
              onClick={() => setOpen(!open)}
            >
              <i class="material-icons">person_pin</i>
              <h1>Admin</h1>
            </Link>
            
          </div>
        ) : (
          <></>
        )}
      </div>
    </section>
  );
};

export default TabBar;
