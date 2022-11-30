import axios from "axios";
import { useEffect, useState } from "react";
import AddSongForm from "../components/Modal";
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";
import endpointsConfig from "../config/endpoints.config";

function Home() {
  const [showModal, setShowModal] = useState('');
  const [judul, setJudul] = useState('');
  const [path, setPath] = useState('');
  const [id, setId] = useState<number>(0);
  const [data, setData] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    getUsers(currentPage);
  }, [() => getUsers(currentPage)]);

  const changePage = (current: number) => {
    setCurrentPage(current);
  };

  const getUsers = async (current: number) => {
    const response = await axios.get(endpointsConfig.REST_SERVICE_BASE_URL+ "/song?page=" + current);
    setTotalPage(response.data.total_page)
    setData(response.data.list);
  };

  return (
    <>
      {showModal === 'ADD' && (
        <div className="absolute top-0 left-0 right-0">
          <AddSongForm action={() => setShowModal('')} title="" isEdit={false} url={path} selectedId={0}/>
        </div>
      )}

      {showModal === 'EDIT' && (
        <div className="absolute top-0 left-0 right-0">
          <AddSongForm action={() => setShowModal('')} title={judul} isEdit={true} url={path} selectedId={id}/>
        </div>
      )}


      <Navbar callback={() => setShowModal('ADD')} isAdmin={false} />
      
      <div className="w-[100vw] h-full justify-center items-center flex flex-col px-10 py-8 mt-8">
        <h1 className="text-3xl font-bold text-indigo-500">Song List</h1>
        <Pagination current={changePage} total={totalPage} />
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
                    {data.map((item, index) => (
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
                            {item.judul}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {item.audio_path}
                          </div>
                        </td>
                        <td className="text-sm flex justify-between  items-center text-gray-900 font-semibold px-6 py-4 space-x-4 whitespace-nowrap">
                          <button
                            // to={`/edit-song/${item.song_id}`}
                            className="bg-amber-500 text-white px-4 py-1 rounded-lg"
                            onClick={() => {setShowModal('EDIT') ; setJudul(item.judul) ; setPath(item.audio_path) ; setId(item.song_id)}}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => console.log("delete")}
                            // to={"#"}
                            className="bg-red-500 text-white px-4 py-1 rounded-lg"
                          >
                            Delete
                          </button>
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
