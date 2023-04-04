import React, { useState } from 'react'
import styles from "./Pagination.module.scss"

const Pagination = ({currentPage, setCurrentPage, productsPerPage, totalProducts}) => {

    const pageNumbers = []
    const totalPages = totalProducts / productsPerPage
    // LIMIT THE PAGENUMBER SHOWN
    const [pageNumberLimit, setpageNumberLimit] = useState(5)
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5)
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0)


    for(let i = 1; i<=Math.ceil(totalProducts / productsPerPage); i++){
        pageNumbers.push(i)
    }
    // PAGINATE
    const paginate = (pageNumbers)=>{
        setCurrentPage(pageNumbers)
    }
    // GO TO NEXT PAGE
    const paginateNext = ()=>{
        setCurrentPage(currentPage + 1)
        // show next set of page numbers
        if (currentPage + 1 > maxPageNumberLimit){
            setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
            setminPageNumberLimit(minPageNumberLimit + pageNumberLimit)
        }

    }
    // GO TO PREV PAGE
    const paginatePrev = ()=>{
        setCurrentPage(currentPage - 1)
        if ((currentPage - 1 ) % maxPageNumberLimit){
            setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
            setminPageNumberLimit(minPageNumberLimit + pageNumberLimit)
        }
        
    }
  return (
    <ul className={styles.pagination}>
        <li onClick={paginatePrev} className={currentPage === pageNumbers[0] ? `${styles.hidden}` : null}>Prev</li>

        {pageNumbers.map((number)=> {

            if(number < maxPageNumberLimit + 1 && number > minPageNumberLimit){
                return (
                <li
                 key={number} 
                onClick={()=>paginate(number)} 
                className={currentPage === number ? `${styles.active}` : null}>
                    {number}
                </li>
            )

        }
   
    })}
        <li onClick={paginateNext} 
        className={ currentPage == pageNumbers[pageNumbers.length - 1] ? `${styles.hidden}`: null}>Next</li>
        <p>
            <b className={styles.page}>{`Page${currentPage}`}</b>
            <span>{` of `}</span>
            <b>{`${Math.ceil(totalPages)}`}</b>
        </p>

      
    </ul>
  )
}

export default Pagination
