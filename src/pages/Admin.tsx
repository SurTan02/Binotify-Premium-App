import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";
import endpointsConfig from "../config/endpoints.config";
// import axios from "axios";

function Admin() {
  const [data, setData] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    getSubscription(currentPage);
  }, [currentPage]);

  const ubah = (current: number) => {
    console.log("ini" + current);
    setCurrentPage(current);
  };

  const getSubscription = async (current: number) => {
    const response = await axios.get(
      endpointsConfig.REST_SERVICE_BASE_URL + "/subscription?page=" + current
    );

    var arr: any[] = [];
    Object.keys(response.data.subscriptions).forEach((key) =>
      arr.push(response.data.subscriptions[key])
    );

    setData(arr[0].subscription);
    setTotalPage(arr[0].total);
  };

  const updateStatus = async (
    subscriber_id: number,
    creator_id: number,
    status: String
  ) => {
    await axios.patch(
      endpointsConfig.REST_SERVICE_BASE_URL + "/subscription", {
        creator_id: creator_id,
        subscriber_id: subscriber_id,
        status: status
    });
    getSubscription(currentPage);
  };

  return (
    <>
      <Navbar isAdmin={true} callback={() => {}} />
      <div className="w-[100vw] h-full justify-center items-center flex flex-col px-10 py-8 mt-8">
        <h1 className="text-3xl font-bold text-indigo-500">
          Subscription Request
        </h1>
        <Pagination current={ubah} total={totalPage} />
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
                        Creator ID
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-lg text-gray-600 px-6 py-4"
                      >
                        Subscriber ID
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
                            {item.creator_id}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {item.subscriber_id}
                          </div>
                        </td>
                        <td className="text-sm flex justify-between items-center text-gray-900 font-semibold px-6 py-4 space-x-4 whitespace-nowrap">
                          {item.status == "PENDING" ? (
                            <div>
                              <button
                                onClick={() =>
                                  updateStatus(
                                    item.subscriber_id,
                                    item.creator_id,
                                    "ACCEPTED"
                                  )
                                }
                                className="bg-amber-500 text-white px-4 py-1 rounded-lg"
                              >
                                Accept
                              </button>

                              <button
                                onClick={() =>
                                  updateStatus(
                                    item.subscriber_id,
                                    item.creator_id,
                                    "REJECTED"
                                  )
                                }
                                className="bg-red-500 text-white px-4 py-1 rounded-lg"
                              >
                                Reject
                              </button>
                            </div>
                          ) : (
                            <div className="text-sm text-gray-900">
                              {item.status}
                            </div>
                          )}
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

export default Admin;
