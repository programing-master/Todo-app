import React from "react";
import { Link } from "react-router-dom";
import {useAuth}from "../hooks/useAuth"
export default function Header() {
  const { isAuthenticated,  logout } = useAuth();

  return (
    <nav className="  bg-white py-4 flex justify-between px-2 gap-2 items-center">
      <ul className=" bg-transparent flex gap-5 items-center ">
        {isAuthenticated ? (
         <li>
         <Link className="transition hover:text-gray-500 bg-gray-100 p-2 rounded" onClick={logout} to="">
           Logout
         </Link>
       </li>
        ) : (
          <>
            <li>
              <Link className="transition hover:text-gray-500  bg-gray-100 p-2 rounded" to="/login">
                Login
              </Link>
            </li>
            <li>
              <Link className="transition hover:text-gray-500 bg-gray-100 p-2 rounded" to="/register">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
