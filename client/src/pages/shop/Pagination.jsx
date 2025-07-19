import React from 'react'
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";

const Pagination = ({totalPages,currentPage,onPageChange}) => {
    return(
        <div className='flex items-center justify-center
        space-x-2'>
            console.log("failed pagination");
            <button><FaChevronLeft /></button>
            <button>Pages</button>
            <button><FaChevronRight /></button>
        </div>
    )
}

export default Pagination