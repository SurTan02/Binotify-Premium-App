// import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Data from "../assets/MOCK_DATA_SONG.json";
import AddSongForm from "../components/AddSongForm.tsx";
import Navbar from "../components/Navbar";

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const callbackOpenModal = () => {
    setIsOpen(true);
    console.log("clicked");
  };
  const callbackCloseModal = () => {
    setIsOpen(false);
    console.log("clicked");
  };
  return (
    <>
      {isOpen && (
        <AddSongForm
          className="absolute top-0 left-0 right-0"
          callback={callbackCloseModal}
        />
      )}
      <Navbar callback={callbackOpenModal} />
      <div className="w-[100vw] h-full justify-center items-center flex flex-col px-10 py-8 mt-8">
        <h1 className="text-3xl font-bold text-indigo-500">Song List</h1>

        <div className="flex flex-col">
          <div className="overflow-x-auto mt-8 sm:-mx-6 items-center lg:-mx-8">
            <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-center">
                  <thead className=" order-b bg-indigo-100">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-600 px-6 py-4"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-lg text-gray-600 px-6 py-4"
                      >
                        Song ID
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-lg text-gray-600 px-6 py-4"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-lg text-gray-600 px-6 py-4"
                      >
                        Audio Path
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-lg text-gray-600 px-6 py-4"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Data.map((item, index) => (
                      <tr
                        key={index}
                        className="bg-white border-b border-gray-200"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {index + 1}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {item.song_id}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {item.Judul}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {item.Audio_path}
                          </div>
                        </td>
                        <td className="text-sm flex justify-between  items-center text-gray-900 font-semibold px-6 py-4 space-x-4 whitespace-nowrap">
                          <Link
                            to={`/edit-song/${item.song_id}`}
                            className="bg-amber-500 text-white px-4 py-1 rounded-lg"
                            onClick={callbackOpenModal}
                          >
                            Edit
                          </Link>
                          <Link
                            onClick={() => console.log("delete")}
                            to={"#"}
                            className="bg-red-500 text-white px-4 py-1 rounded-lg"
                          >
                            Delete
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
