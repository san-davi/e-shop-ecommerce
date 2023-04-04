import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { db } from "../firebase/config"






const useFetchCollection =(collectionName)=>{
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const getCollection = ()=>{
        setIsLoading(true)
    
        try{
          // FORM FIREBASE
          const docRef = collection(db, collectionName);
          // DATA LIMIT FROM ORDER LIMIT
          const q = query(docRef, orderBy("createdAt", "desc"));
          // FROM GET REAL TIME DUC
          // const q = query(collection(db, "cities"), where("state", "==", "CA"));
          onSnapshot(q, (snapshot) => {
            // console.log(snapshot.docs)
            const allData = snapshot.docs.map((doc)=>({
              id: doc.id,
              ...doc.data()
            }))
          //  console.log(allData)
           setData(allData)
           setIsLoading(false)
    
          });
    
        }catch(error){
          isLoading(false)
          toast.error(error.message)
        }
      }
      useEffect(()=>{
          getCollection()
      }, [])

      return{data, isLoading}
}


export default useFetchCollection