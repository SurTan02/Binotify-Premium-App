import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/auth.context";

function Navbar({callback, isAdmin} : {callback: () => void, isAdmin:boolean}) {
  const authCtx = useContext(AuthContext);

  return (
    <>
      <div className="w-ful h-12 flex items-center px-11 justify-between bg-white border-b-2">
        <Link
          to={"/"}
          className="font-bold text-2xl text-indigo-500 hover:text-indigo-600"
        >
          Binotify Premium App
        </Link>

        <div className="flex justify-between gap-4">
          {!isAdmin?
          <button
            className="bg-indigo-500 text-white px-4 py-1 rounded-lg font-Inter font-semibold hover:bg-indigo-600"
            onClick={callback}
          >
            + Add Song
          </button>
          : <></>
          }
          <button
            onClick={authCtx.logout}
            className="bg-indigo-500 text-white px-4 py-1 rounded-lg font-Inter font-semibold hover:bg-indigo-600"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Navbar;
