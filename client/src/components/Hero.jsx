import React,{useState} from 'react'

import bookHeroImage from '../assets/banner.webp'
import { useBooks } from '../context/BookContext';
const Hero= ()=>{
  const{Books,filters,updateFilters}=useBooks()
  const [searchInput,setSearchInput]=useState('');
 const handleSubmit=(e)=>{
e.preventDefault()
updateFilters({
  search:searchInput.trim(),
  page:1,
})
 }
 
    return(
<div className="bg-gray-900 min-h-[500px] relative overflow-hidden">
<div className="container mx-auto px-4 py-36 flex flex-col lg:flex-row
flex-wrap items-center justify-cointent">
<div className="w-full lg:w-1/2 text-white z-10">
        <h1 className="text-5xl font-bold mb-6 leading-tight">
            <span className="text-amber-500">Welcome to Our</span><br />
           <span className="text-amber-500">Books</span>-a heaven for <br />book lovers
        </h1>
        <form onSubmit={handleSubmit} className="mt-8 flex gap-1">
        <input 
        value={searchInput}
        onChange={(e)=>setSearchInput(e.target.value)}
        type="text" 
        placeholder="Enter title"
         className="bg-white px-4 py-2 border text-black"/>
        <button type="submit"className="bg-amber-300 px-6 py-2">Search</button>
        </form>
        </div>
{/*Image-Stack*/ }        
 <div>
<img src={bookHeroImage}
alt="Books with flowers"
className="w-full h-full object-cover rounded-2xl"/>     
 </div>  
</div>
  </div>    
    
    )
};

export default Hero;