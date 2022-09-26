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
             <ul className='flex justify-center items-center cursor-pointer py-4 text-base text-primary mt-8 select-none space-x-4'>
                {currentPage > 1 ? <li onClick={() => pagination(currentPage-1)}>  <i className="material-icons">keyboard_arrow_left</i> </li> : <li> <i className="material-icons opacity-50">keyboard_arrow_left</i></li>}
                <span className='text-white bg-secondary rounded-xl p-4'>
                    {currentPage}
                </span>                
                {currentPage < pageNum?.length ? <li onClick={() => pagination(currentPage+1)}><i className="material-icons">keyboard_arrow_right</i></li>: <li> <i className="material-icons opacity-50">keyboard_arrow_right</i></li> }
            </ul>
        </nav>
    )
}

