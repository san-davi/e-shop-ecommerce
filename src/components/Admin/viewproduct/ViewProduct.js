import { collection, deleteDoc, doc, limit, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { db, storage } from '../../../firebase/config'
import styles from "./ViewProduct.module.scss"
import {FaEdit, FaTrashAlt} from "react-icons/fa"
import Loader from '../../loader/Loader'
import { deleteObject, ref } from 'firebase/storage'
import Notiflix from "notiflix"
import { useDispatch, useSelector } from 'react-redux'
import { selectProducts, STORE_PRODUCTS } from '../../../redux/FeaturesOrSlice/productSlice'
import useFetchCollection from '../../../customHooks/useFetchCollection'
import Search from '../../search/Search'
import { FILTER_BY_SEARCH, selectFilteredProducts } from '../../../redux/FeaturesOrSlice/filterSlice'
import Pagination from '../../pagenation/Pagination'






// GETTING PRODUCTS FROM FIREBASE
const ViewProduct = () => {
  // CUTOME HOOK
  const { data, isLoading} = useFetchCollection("products")
  const products = useSelector(selectProducts)
  // ============

  // SEARCH
  const [search, setSearch] = useState("")
  const filteredProducts = useSelector(selectFilteredProducts)

  // COMMENTED COZ DATA IF FETCHED IN HOOK
  // const [products, setProduct] = useState([])
  // const [isLoading, setIsLoading] = useState(false)

      // PAGINATION STATE
      const [currentPage, setCurrentPage] = useState(1)
      const [productsPerPage, setProductsPerPage] = useState(10)
      // GET CURRENT PRODUCT 
      const indexOfLastProduct = currentPage * productsPerPage;
      const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
      const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

  // DISPATCH FOR PRODUCT REDUCER
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(
      STORE_PRODUCTS({
        products: data
      }))

  },[dispatch, data,])

  // FILTER BY SEARCH
  useEffect(()=>{
    dispatch(FILTER_BY_SEARCH({products, search}))

  },[dispatch, products, search])

  // COMMENTED BCOZ THE PRODUCTS ARE FETCH BY HOOK NOW

  // useEffect(()=>{
  //   getProducts()

  // }, [])

  // const getProducts = ()=>{
  //   setIsLoading(true)

  //   try{
  //     // FORM FIREBASE
  //     const productsRef = collection(db, "products");
  //     // DATA LIMIT FROM ORDER LIMIT
  //     const q = query(productsRef, orderBy("createdAt", "desc"));
  //     // FROM GET REAL TIME DUC
  //     // const q = query(collection(db, "cities"), where("state", "==", "CA"));
  //     onSnapshot(q, (snapshot) => {
  //       // console.log(snapshot.docs)
  //       const allProducts = snapshot.docs.map((doc)=>({
  //         id: doc.id,
  //         ...doc.data()
  //       }))
  //      console.log(allProducts)
  //      setProduct(allProducts)
  //      setIsLoading(false)
  //     //  STORE PRODUCTS IN REDUX STORE
  //      dispatch(STORE_PRODUCTS({
  //        products: allProducts
  //      }))

  //     });

  //   }catch(error){
  //     isLoading(false)
  //     toast.error(error.message)
  //   }
  // }

  // DELETE PRODUCT

  const deleteProduct = async (id, imageURL)=>{
    try{
      await deleteDoc(doc(db, "products", id));
      // DELETE IMAGE FROM STORAGE OF THE FIRE BASE
      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef)
      toast.success("Product Deleted Successfully.")

    }catch(error){
      toast.error(error.message)
    }
    
  }
  // COMFIRM DELETE 
  const comfirmDelete = (id, imageURL) =>{
    Notiflix.Confirm.show(
      // 'Notiflix Confirm',
      'Delete Product!',
      'Do you agree To Delete This Product?',
      'Delete',
      'Cancel',
      function okCb() {
        deleteProduct(id, imageURL)
        // alert('Thank you.');
      },
      function cancelCb() {
        // alert('If you say so...');
      },
      {
        // TYLEING FOR DELETE COMFIRM BOX
        width: '320px',
        borderRadius: '8px',
        titleColor: "red",
        okButtonBackground: "red",
        cssAnimationStyle: "zoom"
        // etc...
      },
    );

  }

  return (
    <>
    {isLoading && <Loader/>}
    <div className={styles.table}>
      <h1>Available Products</h1>

      <div className={styles.search}>
        <p>
          <b>{filteredProducts.length} </b>Products Available
        </p>
        <Search value={search} onChange={(e)=>setSearch(e.target.value)}/>
      </div>

      {filteredProducts.length === 0 ? (
        <p>No Product Available</p>
      ) : (
        <table>
          <thead>
            <tr>
            <th>s/n</th>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {currentProducts.map((product, index)=>{
            const{id, name, price, imageURL, category} = product;
            return(
              
                <tr key={id}>
                <td>
                  {index +1}
                </td>
                <td>
                  <img src={imageURL} alt={name} style={{width: "100px"}}/>
                </td>
                <td>
                  {name}
                </td>
                <td>
                  {category}
                </td>
                <td>
                  {`$${price}`}
                </td>
                <td className={styles.icons}>
                  <Link to={`/admin/add-product/${id}`}>
                    <FaEdit size={20} color='green'/>
                  </Link>
                  &nbsp;
                  <FaTrashAlt  size={18} color='red' onClick={()=>comfirmDelete(id, imageURL)}/>
                </td>

              </tr>
              
              
            )
          })}
          </tbody>
        </table>
      )}
      <Pagination 
                currentPage = {currentPage}
                setCurrentPage = { setCurrentPage}
                productsPerPage={productsPerPage}
                totalProducts={ filteredProducts.length}
                />

    </div>
    </>
  )
}

export default ViewProduct
