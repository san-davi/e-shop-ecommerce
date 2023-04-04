import React, { useState } from 'react'
import styles from "./AddProduct.module.scss"
import Card from "../../card/Card"
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { db, storage } from '../../../firebase/config'
import { toast } from 'react-toastify'
import { addDoc, collection, doc, setDoc, Timestamp } from 'firebase/firestore'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from "../../loader/Loader"
import { selectProducts } from '../../../redux/FeaturesOrSlice/productSlice'
import { useSelector } from 'react-redux'



const categories = [
  {id: 1, name: "Laptop"},
  {id: 2, name: "Electronics"},
  {id: 3, name: "Fashion"},
  {id: 4, name: "Phone"},
  {id: 5, name: "clothes"},
]


const initialState = {
  name: "",
  imageURL: "",
  price: 0,
  category: "",
  brand: "",
  desc: "",
}

const AddProduct = () => {
  // EDIT PRODUCT STAY INFO
  const { id } = useParams()
  const products = useSelector(selectProducts);
  const productEdit = products.find((item) => item.id === id);
  console.log(productEdit)
  // ==================
  
  const [product, setProduct] = useState(()=>{
    const newState = detectForm(id,
      {...initialState},
      productEdit
      )
      return newState
  }
  //   {
  //   ...initialState
  //   // name: "",
  //   // imageURL: "",
  //   // price: 0,
  //   // category: "",
  //   // brand: "",
  //   // desc: "",
  // }
  )

  // UPLOAD TASK OR UPLOADPROGRESS

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()

 

  // EDIT PRODUCT FUNCTION
  function detectForm(id, f1, f2){
    if(id === "ADD"){
      return f1;
    }
    return f2;

  }
  // ==================

  // HANDLE DATA SUBMISSION TO THE DB
  const handleInputChange = (e)=>{
    const {name, value} = e.target
    setProduct({...product, [name]: value})
  } 
// IMAGE UPLOAD SOME CODE FROM FIREBASE
  const handleImageChange = (e)=>{
    const file = e.target.files[0]
    // console.log(file)
// FIREBASE CONTACT STORAGE TO STORE FILE
    const storageRef = ref(storage, `eshop/${Date.now()}${file.name}`);
    // FROM FIREBASE(UPLOAD FILE DOC)
    const uploadTask = uploadBytesResumable(storageRef, file);


    // LOADING UPLOAD BAR OR UPLOAD PROGRESS
    uploadTask.on('state_changed', 
  (snapshot) => {
   
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    // console.log('Upload is ' + progress + '% done');
    setUploadProgress(progress)


  }, 
  (error) => {
    toast.error(error.message)
    // Handle unsuccessful uploads
  }, 
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      // console.log('File available at', downloadURL);
      setProduct({...product, imageURL: downloadURL })
      toast.success("Image Uploaded Successfully.")
    });
  }
);
  }




// ADDING ALL PRODUCT TO STORAGE
  const addProduct = (e)=>{
    e.preventDefault()
    // console.log(product);
    setIsLoading(true)
    try {
      const docRef = addDoc(collection(db, "products"), {
        // name: "Tokyo",
        // country: "Japan"
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        // TO ADD DATE
        createdAt: Timestamp.now().toDate()
      });
      setIsLoading(false)
      // CLEARING THE UPLOAD BAR
      setUploadProgress(0)
      // CLEARING FIELDS 
      setProduct({...initialState})
      toast.success("Product Uploaded Successfully.")
      navigate('/admin/all-products')

    }catch(error){
      setIsLoading(false)
      toast.error(error.message)

    }
  }




// ON SUBMIT DYNAMIC AND EDIT PART AND EDITED INFO TO THE DB
const editProduct =(e)=>{
  e.preventDefault();
  setIsLoading(true)

  // REMOVING EDITED IMGAE FROM DB
  if(product.imageURL !==productEdit.imageURL){
    const storageRef = ref(storage, productEdit.imageURL);
    deleteObject(storageRef)

  }


  try{
    // FROM FIRESTORE DOC
    setDoc(doc(db, "products", id), {
      name: product.name,
      imageURL: product.imageURL,
      price: Number(product.price),
      category: product.category,
      brand: product.brand,
      desc: product.desc,
      createdAt: productEdit.createdAt,
      editedAt: Timestamp.now().toDate()
      
    });
    setIsLoading(false)
    toast.success("Product Edited Successfully")
    navigate("/admin/all-products")

  }catch(error){
    setIsLoading(false)
    toast.error(error.message)
  }
}

  return (
    <>
    {isLoading && <Loader/>}
    <div className={styles.product}>

      <h2>{detectForm(id, "Add New Product", "Edit Product")}</h2>
      <Card cardClass={styles.card}>

        <form onSubmit={detectForm(id, addProduct, editProduct)}>
          <label>Product Name: </label>
        <input type="text"
         placeholder='Product name'
          required name='name' 
          value={product.name} 
          onChange={(e)=> handleInputChange(e)}/>

          <label>Product Image:</label>
          <Card cardClass={styles.group}>

            {/* UPLOAD BAR DYNAMIC */}
            {uploadProgress === 0 ? null : (
              <div className={styles.progress}>

              <div className={styles["progress-bar"]} style={{width: `${uploadProgress}%`}}>
                {uploadProgress < 100 ? `Uploading ${uploadProgress}` : `Upload Completed ${uploadProgress}%`}
                {/* Uploading 50% */}
              </div>
            </div>
            )}
            


            <input type="file" accept="image*" placeholder="Product image" name='image' onChange={(e) => handleImageChange(e)}/>

            {/* DYNAMIC IMAGE URL */}
            {product.imageURL === "" ? null : (
              <input type="text"placeholder='Image URL' name="imageURL" value={product.imageURL} disabled/>

            )}

            {/* <input type="text"placeholder='Image URL' name="imageURL" value={product.imageURL} disabled/> */}

            <input type="number"
            placeholder='Product price'
            required name='price' 
            value={product.price} 
            onChange={(e)=> handleInputChange(e)}/>

            <label>Product category</label>
            <select required name='category' value={product.category} onChange={(e)=>handleInputChange(e)}>
              <option value="" disabled>
                select Product category
              </option>
              {categories.map((cat)=>{
                return(
                  <option key={cat.id} value={cat.name}>
                    {cat.name}

                  </option>
                )
              })}

            </select>

            <label>Product Brand: </label>
        <input type="text"
         placeholder='Product brand'
          required name='brand' 
          value={product.brand} 
          onChange={(e)=> handleInputChange(e)}/>
          <label>Product Description: </label>
          <textarea name='desc' required col="30" rows="10" value={product.desc} onChange={(e)=> handleInputChange(e)}></textarea>

{/* DYNAMIC BUTTON */}
          <button className='--btn --btn-primary'>{detectForm(id, "Save Product", "Save Edit")}</button>
          </Card>
        </form>
      </Card>
    </div>
    </>
  )
}

export default AddProduct
