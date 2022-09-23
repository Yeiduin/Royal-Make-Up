import React from 'react';

export const Pagination = ({ pageLength, products, pagination, currentPage }) => {
    const pageNum = [];
const totalPages = Math.ceil(products/pageLength)
    // recorro para agregar al arreglo los números de página. Redondeo para arriba
    for (let i = 1; i <= totalPages; i++){
        pageNum.push(i);
    }

    return (
        <nav className='w-full h-full'>
            <ul className='w-full h-full flex justify-center items-center flex-nowrap cursor-pointer py-4 text-base text-primary mt-8 select-none'>
                {currentPage > 1 && <li onClick={() => pagination(currentPage-1)}> {'<  '} </li>}
                {currentPage}/{totalPages}
                {currentPage < pageNum?.length && <li onClick={() => pagination(currentPage+1)}> {'  >'} </li>}
            </ul>
        </nav>
    )
}

