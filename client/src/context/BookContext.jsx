import { createContext,useContext,useState,useEffect,useCallback } from "react";
import axios from 'axios'
const BookContext=createContext();
export const BookProvider=({children})=>{
    const [Books,setBooks]=useState([]);
    const [currentBook,setCurrentBook]=useState(null);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);
const [filters,setFilters]=useState({
    page:1,
    limit:8,
    genre:'',
    minYear:'',
    maxYear:'',
    author:'',
    minPrice:'',
    maxPrice:'',
    sortBy:'title',
    order:'asc',
    search:''
})
const [pagination,setPagination]=useState({
    totalBooks:0,
    currentPage:1,
    totalPage:1
})
const fetchBooks= useCallback(async()=>{
    try {
        setLoading(true)
        setError(null)
        const params=new URLSearchParams();
        Object.entries(filters).forEach(([Key,value])=>{
        if(value!==''){
            params.append(Key,value)
        }
        })
        const response=await axios.get(`http://localhost:3000/books?${params}`);
        
        setBooks(response.data.books)
        setPagination({
            currentPage:response.data.currentPage,
            totalBooks:response.data.totalBooks,
            totalPage:response.data.totalPages
        })
    } catch (error) {
        setError(error.message)
    } finally{
        setLoading(false)
    }
},[filters])

const clearCurrentBook=useCallback(()=>{
 setBooks(null)
},[])

const updateFilters=useCallback(async(newFilters)=>{
 setFilters(prev=>({
    ...prev,
    ...newFilters,
    page:newFilters.hasOwnProperty('page')?newFilters.page:1
 }))
},[])

const fetchBookDetails=useCallback(async(bookId)=>{
 try {
    setLoading(true);
    setError(null);
    const response=await axios.get(`http://localhost:3000/books${bookId}`)
    setCurrentBook(response.data);
    return response.data
 } catch (error) {
    setError(error.message)
    throw error
 }finally{
    setLoading(false)
 }
},[])
 useEffect(()=>{
  fetchBooks()
 },[filters])
    const value={
        Books,
        currentBook,
        loading,
        error,
        filters,
        pagination,
        fetchBooks,
        clearCurrentBook,
        updateFilters,
        fetchBookDetails

    }
    return(
        <BookContext.Provider value={value}>
          {children}
        </BookContext.Provider>
    )
}

export const useBooks=()=>{
    const context=useContext(BookContext);
   if(!context){
    throw new Error("useBooks must be within a Book Provider")
        }
   
    return context;
}
 