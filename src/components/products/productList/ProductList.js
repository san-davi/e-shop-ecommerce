import React, { useEffect, useState } from 'react'
import { FaListAlt } from 'react-icons/fa'
import {BsFillGridFill} from 'react-icons/bs'
import styles from "./ProductList.module.scss"
import Search from '../../search/Search'
import ProductItem from '../productItem/ProductItem'
import { useDispatch, useSelector } from 'react-redux'
import { FILTER_BY_SEARCH, selectFilteredProduct, selectFilteredProducts, SORT_PRODUCT } from '../../../redux/FeaturesOrSlice/filterSlice'
import Pagination from '../../pagenation/Pagination'


const ProductList = ({products}) => {
    const [grid, setGrid] = useState(true)
    const [search, setSearch] = useState("")
    const [sort, setSort] = useState("latest")


    const filteredProducts = useSelector(selectFilteredProducts)

    // PAGINATION STATE
    const [currentPage, setCurrentPage] = useState(1)
    const [productsPerPage, setProductsPerPage] = useState(9)
    // GET CURRENT PRODUCT 
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
    
    


    const dispatch = useDispatch()

    // seacrh use effect
    useEffect(()=>{
        dispatch(FILTER_BY_SEARCH({products, search}))

    },[dispatch, products, search])

    // use EFECT FOR SORT FILTER
    useEffect(()=>{
        dispatch(SORT_PRODUCT({products, sort}))
        

    },[dispatch, products, sort])


    return (
        <div className={styles["product-list"]} id="product">
            <div className={styles.top}>
                <div className={styles.icons}>
                    <BsFillGridFill size={22} color="orangered" onClick={()=> setGrid(true)}/>
                    <FaListAlt size={24} color="#0066d4" onClick={()=> setGrid(true)}/>

                    <p>
                        <b>{filteredProducts.length}</b>&nbsp; Product found.
                    </p>
                </div>
                {/* SERCH ICON */}
                <div>
                    <Search value={search} onChange={(e)=> setSearch(e.target.value)}/>
                </div>
                {/* SORT PRODUCT */}
                <div className={styles.sort}>
                    <label>Sort By:</label>
                    <select value={sort} onChange={(e)=> setSort(e.target.value)}>
                        <option value="latest">Latest</option>
                        <option value="lowest-price">Lowest Price</option>
                        <option value="highest-price">Highest Price</option>
                        <option value="a-z">A-Z</option>
                        <option value="z-a">Z-A</option>
                    </select>
                </div>
            </div>
            <div className={grid ? `${styles.grid}`: `${styles.list}`}>
                {products.length === 0 ? (
                    <p>No Product Available.</p>
                ) : (
                    <>
                        {currentProducts.map((product) => {
                            return (
                                <div key={product.id}>
                                    <ProductItem {...product} grid={grid} product={product}/>

                                </div>
                            )
                        })}
                    </>
                )}

            </div>
            <Pagination 
                currentPage = {currentPage}
                setCurrentPage = { setCurrentPage}
                productsPerPage={productsPerPage}
                totalProducts={ filteredProducts.length}
                />


        </div>
    )
}

export default ProductList
