import { useState } from "react";
const Pagination = ({current, total} : {current:(selectedPage : number) => void, total:number}) =>
{
   let [cur, setCur] = useState(1)

   const pages: number[] = [];
   
   for (let i = 0; i<total; i++){
        pages.push(i+1);
   }
   return (
      <div className="flex bg-white rounded-lg font-[Poppins]">
         <button disabled={cur === 1} onClick={() =>{setCur(cur-1) ; current(cur-1)}}
            className= {cur === 1 ? "h-12 border-2 border-r-0 \
                                    border-indigo-600\
                                    px-4 rounded-l-lg" : 
                                    
                                    "h-12 border-2 border-r-0 \
                                    border-indigo-600\
                                    px-4 rounded-l-lg\
                                  hover:bg-indigo-600 hover:text-white"}>
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" fillRule="evenodd"></path>
            </svg>
         </button>
         {
            pages.map((pg, i) => (
               <button key={i} onClick={() => {setCur(pages[i]) ; current(pages[i])}} className={`h-12 border-2 border-r-0 border-indigo-600
               w-12 ${cur === pages[i] && 'bg-indigo-600 text-white'}`}>{pages[i]}</button>
            ))
         }
         <button disabled={cur === total} onClick={() =>{setCur(cur+1) ; current(cur+1)}} className= {cur === total ? "h-12 border-2 \
                                    border-indigo-600\
                                    px-4 rounded-r-lg" : 
                                    
                                    "h-12 border-2  \
                                    border-indigo-600\
                                    px-4 rounded-r-lg\
                                  hover:bg-indigo-600 hover:text-white"}>
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" fillRule="evenodd"></path></svg>
         </button>
      </div>
   )
}

export default Pagination