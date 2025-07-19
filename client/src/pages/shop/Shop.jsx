 import React ,{useEffect}from 'react'
 import { useBooks } from '../../context/BookContext';
 import BookGrid from "./BookGrid"
 import CategoryNav from '../shop/CategoryNav'
 import SortBooks from './SortBooks';
import Pagination from './Pagination';
 const Shop = () => {
const{
        Books,
        currentBook,
        loading,
        error,
        filters,
        pagination,
        
        fetchBooks,
        clearCurrentBook,
        updateFilters,
        fetchBookDetails}=useBooks();
        const categories=["All Collection","Fiction","Adventure",
            "Romance","Dystopian","Historical","Non-fiction"
        ]
useEffect(()=>{
    fetchBooks()
},[filters,fetchBooks])
const handleCategoryChange =(category)=>{
    updateFilters({
        genre:category==="All Collections"?'':category,
        page:1,
    })
}
const handleSortChange=(sortCongfig)=>{
  updateFilters({
    sortBy:'title',
    order:'asc',
    page:1,
  })
}
const handlePageChange=(newPage)=>{
    updateFilters({
        page:newPage,
    })
}
const handleDeleteBook=async(id)=>{
    console.log("Book deleted", id);
    
        }
console.log(pagination);
return (
        <div className="container mx-auto px-4 py-12 min-h-screen">
        <div className="flex justify-between items-center
            flex-wrap border-b border-gray-200 pb-4">
        <CategoryNav categories={categories}
        activeCategory={filters.genre||"All Collections"}
        onCategoryChange={handleCategoryChange}
        />
        <div className="py-4 flex justify-end px-4">
            <SortBooks
            CurrentSort={{
                sortBy:filters.sortBy,
                order:filters.order
            }}
   onSortChange={handleSortChange}         
            />
        </div>
        </div>
        <div className="py-4 text-gray-600 px-4">
        Showing {pagination.totalBooks>0?(pagination.currentPage
            -1)*filters.limit+1:0}-
            <span>{Math.min(pagination.currentPage*filters.limit,pagination.totalBooks)
                }</span> of {pagination.totalBooks} books
        </div>
        <div className="py-8 md:px-4">
            <BookGrid Books={Books} loading={loading} error={error}
            onDeleteBook={handleDeleteBook}/>
        </div>
        {
            pagination.totalPages > 1 && 
            (<Pagination
            totalPages={pagination.totalPages}
            currentPage={pagination.currentPage}
            onPageChange={handlePageChange}    
    
    />)
        }
        </div>
    )
};
export default Shop