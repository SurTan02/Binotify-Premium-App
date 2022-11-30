import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import useSWR from "swr";
import endpointsConfig from "../config/endpoints.config";

function SubscriptionList({index, setTotal} : {index : number , setTotal: (totalPages: number) => void}){
    // console.log("running")
    const url = endpointsConfig.REST_SERVICE_BASE_URL+ `/subscription?page=${index}`;
    const fetcher = async(url: string) => {
        const res = await axios.get(url)
        return res.data;
    }
    
    const {data} = useSWR(url, fetcher, {refreshInterval(latestData) {
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
        
    )
}

export default function SWR() {
    const [pageIndex, setPageIndex] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pages, setPages] = useState<number[]>([1,2,3,4]);
    let temp: number[] = [];
    
    const changePage = (current: number) => {
        setTotalPages(current);
    };
    

    const setPaginationNav = (value : number) =>{
        setPageIndex(value);
        if (!pages.includes(value)){
          temp= pages;
          
          const tempMaxPages = Math.min(totalPages, value);

          if (value > pageIndex){
              temp.shift()
              temp.push(value)
          }else{
              temp.pop();
              temp.unshift(value)
          }   
          setPages(temp)
        }
    }
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
                                <div className="flex font-[Poppins] place-content-center pb-5">
                                    <button disabled={pageIndex === 1} onClick={() => setPaginationNav(pageIndex - 1)}
                                        className= {pageIndex === 1 ? "h-12 border-2 border-r-0 \
                                                        border-indigo-600\
                                                        px-4 rounded-l-lg" : 
                                                        
                                                        "h-12 border-2 border-r-0 \
                                                        border-indigo-600\
                                                        px-4 rounded-l-lg\
                                                    hover:bg-indigo-600 hover:text-white"}>
                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                            <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" fillRule="evenodd"/>
                                        </svg>
                                    </button>
                                    {
                                        pages.map((pg, i)=> (
                                            (totalPages > i) ?
                                            <button key={i} onClick={() => {setPageIndex(pages[i])}} className={`h-12 border-2 border-r-0 border-indigo-600
                                            w-12 ${pageIndex === pages[i] && 'bg-indigo-600 text-white'}`}>
                                                {pages[i]}
                                            </button>
                                            :
                                            <></>
                                        ))
                                    }
                                    <button disabled={pageIndex === totalPages} onClick={() => setPaginationNav(pageIndex + 1)} className= {pageIndex === totalPages ? "h-12 border-2 \
                                                                border-indigo-600\
                                                                px-4 rounded-r-lg" : 
                                                                
                                                                "h-12 border-2  \
                                                                border-indigo-600\
                                                                px-4 rounded-r-lg\
                                                            hover:bg-indigo-600 hover:text-white"}>
                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                                    </button>
                                </div>
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
                                    <SubscriptionList index={pageIndex} setTotal = {changePage}/>
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


