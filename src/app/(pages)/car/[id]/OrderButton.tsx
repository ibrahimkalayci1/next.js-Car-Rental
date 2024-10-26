"use client"

import Loader from "@/app/components/Loader"
import { Car } from "@/app/types"
import {useState} from "react"



const OrderButton = ({ car }: { car: Car }) => {
   const [isLoading,setIsLoading] = useState(false)
    // sipariş butonuna tıklayınca
    const handleClick = () => {
        setIsLoading(true);

        //! 1) backendde ödeme sayfasının linkini oluşturması için istek at
        fetch("http://localhost:3000/api/checkout", {
            method: "POST",
            body: JSON.stringify(car),
        })
        //! 2 backend buraya  ödeme sayfasının linkini gönderecek 
        .then((res) => res.json() )
        
        //!3 kullanıcıyı satın alma sayfasına yçnlendir
        .then ((data) => {
            window.location.href = data.url;
        })
        //!4 son olarak isloading state ini false e çek
        .finally(() =>setIsLoading(false) )
    }
    return (

   <button 
   disabled={isLoading}
   onClick={handleClick}
   className="bg-blue-500 w-full p-2 rounded-lg text-white 
   font-bold transition hover:bg-blue-600" 
     >
      {isLoading ? <Loader /> : 
     "Aracı Kirala"}
     </button>
  )
}

export default OrderButton