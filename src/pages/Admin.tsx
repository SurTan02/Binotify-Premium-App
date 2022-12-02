import {useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import useSWR from "swr";
import endpointsConfig from "../config/endpoints.config";
import Pagination from "../components/Pagination";

function SubscriptionList({index, setTotal} : {index : number , setTotal: (totalPages: number) => void}){
    // console.log("running")
    const url = endpointsConfig.REST_SERVICE_BASE_URL+ `/subscription?page=${index}`;
    const fetcher = async(url: string) => {
        const res = await axios.get(url)
        return res.data;
    }
    
    const {data, mutate} = useSWR(url, fetcher, {refreshInterval(latestData) {
        if (latestData?.subscriptions[0].subscription.length < 10){
            return 5000;
        }else{
            return 0
        }
    },});
    
    if (!data) return(
        <tr className="text-3xl font-bold text-indigo-500">
            <td>
                Loading....
            </td> 
        </tr>
    )
    var arr: any[] = [];
    Object.keys(data.subscriptions).forEach((key) =>
      arr.push(data.subscriptions[key])
    );
    setTotal(arr[0].total);

    const updateStatus = async (subscriber_id: number, creator_id: number, status: String) => {
        await axios.patch(
          endpointsConfig.REST_SERVICE_BASE_URL + "/subscription", {
            creator_id: creator_id,
            subscriber_id: subscriber_id,
            status: status
        });
      };
    return arr[0].subscription.map((item: { creator_id: number; subscriber_id: number; status: string }, index: number) => 
        <tr key={index} className="bg-white border-b border-gray-200">
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
                    onClick={ async() => {
                        await updateStatus(item.subscriber_id, item.creator_id, "ACCEPTED")
                        mutate({ ...data})
                    }
                    }
                    className="bg-amber-500 text-white px-4 py-1 rounded-lg"
                    >
                    Accept
                    </button>

                    <button
                    onClick={async() =>{
                        await updateStatus( item.subscriber_id, item.creator_id, "REJECTED")
                        mutate({ ...data})
                    }
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
    )
}

export default function Admin() {
    const [pageIndex, setPageIndex] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const changePage = (current: number) => {
        setPageIndex(current);
    };

    const changeTotal = (current: number) => {
      setTotalPages(current);
    };

    return (
        <>
        <Navbar isAdmin={true} callback={() => {}} />      
            <div className="w-[100vw] h-full justify-center items-center flex flex-col px-10 py-8 mt-8">
                <h1 className="text-3xl font-bold text-indigo-500">
                    Subscription Request
                </h1>
                <div className="flex flex-col">
                    <div className="overflow-x-auto mt-8 sm:-mx-6 items-center lg:-mx-8">
                        <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-hidden ">
                                {totalPages > 1 
                                ? <Pagination setPageIndex={changePage} pageIndex={pageIndex} totalPages={totalPages} />
                                : <></>
                                } 
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
                                    <SubscriptionList index={pageIndex} setTotal = {changeTotal}/>
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


