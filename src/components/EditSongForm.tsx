import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const EditSongForm = () => {
  return (
    <>
      <Navbar />
      <div className="fixed inset-x-0 mx-auto block max-w-sm p-6 top-40 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100">
        {" "}
        <div className="py-12">
          <div className="mt-0 max-w-md">
            <h2 className="text-2xl font-bold mb-4">Edit Song</h2>
            <div className="grid grid-cols-1 gap-3">
              <label className="block">
                <span className="text-gray-700">Song Title</span>
                <input
                  type="text"
                  className="
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "
                  placeholder=""
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Audio File</span>
                <input
                  type="file"
                  className="
                    mt-1
                    block
                    w-full
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "
                  placeholder=""
                />
              </label>
            </div>
            <div className="inline-flex items-center mt-6 px-6 py-1 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300">
              Save
            </div>
            <Link
              to={"/"}
              className="inline-flex items-center mt-6 mx-4 px-5 py-1 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300"
            >
              cancel
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditSongForm;
