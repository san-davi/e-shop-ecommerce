import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useStore } from 'react-redux';
import { toast } from 'react-toastify';
import { db } from '../firebase/config';

const useFetchDocument = (collectionName, documentID) => {
    const [document, setDocument] = useState(null)

    const getDocument = async () => {
        const docRef = doc(db, collectionName, documentID);
        const docSnap = await getDoc(docRef);
        // console.log("getting product")
        
        
        if (docSnap.exists()) {
          // console.log("Document data:", docSnap.data());
          // FOR ID 
          const obj = {
            id: documentID,
            ...docSnap.data()
          }
          setDocument(obj)
        
        } else {
      // doc.data() will be undefined in this case
      // console.log("No such document!");
      toast.error("Document Not Found")
    }
      }

      useEffect(()=>{
          getDocument()

      },[])
      return { document }
}

export default useFetchDocument