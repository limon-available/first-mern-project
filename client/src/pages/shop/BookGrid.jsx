import React from 'react'
import BookCard from './BookCard'
 const BookGrid =({Books,loading,error,onDeleteBook}) =>{
    if(error) return <div>Error:{error}</div>
   
    return(
        <div className='grid grid-cols-1 sm:grid-cols-2 
        md:grid-cols-3 lg:grid-cols-4 gap-8'>
            {
                loading?(<div>Loading...</div>)
                :Books.length===0?(<div>No books found</div>)
                :(Books.map((Book)=>(
                   <BookCard key={Book._id} Book={Book}
                   onDelete={onDeleteBook}/>
                )))
            }
        </div>
    )
 }
 export default BookGrid