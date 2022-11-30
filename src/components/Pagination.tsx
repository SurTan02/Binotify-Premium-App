import { useState } from "react";
const Pagination = ({setPageIndex, pageIndex, totalPages} : {
                  setPageIndex:(selectedPage : number) => void,
                  totalPages: number,
                  pageIndex: number}) =>
{
   const [pages, setPages] = useState<number[]>([1,2,3,4]);
   let temp: number[] = [];
   

   const setPaginationNav = (value : number) =>{
       setPageIndex(value);
       if (!pages.includes(value)){
           temp= pages;
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
   return(
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
   )
}

export default Pagination