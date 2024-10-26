import Card from "@/app/components/Card";
import Container from "../../../components/Container";
import {Car} from "@/app/types";
import { headers } from "next/headers";


const host = headers().get("host")
const protocol = headers().get("x-forwarded-proto")
const baseUrl = `${protocol}://${host}`

type ReturnType = {
  message: string;
  data: Car[];
}

//! async fonksiyonu return ederken Promise ve<>
const getCars = async (): Promise<ReturnType> => {
  try {

  const res = await fetch(`http://localhost:3000/api/vehicles`);
    
  return res.json()
} catch (err) {
  console.log("HATA VAR", err)
  throw new Error("Araçları alırken bir sorun oluştu");
}
}

 async function delay (ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const List = async () => {
  await delay (3000)

  const {data} = await getCars();


return (
        <Container>
<h1 className='text-2xl md:text-3xl font-bold'>
  Bütün Araçları  Keşfedin
  </h1>       

  <div className="grid grid-cols-1 sm:grid-cols-2 
  lg:grid-cols-3 gap-4 mt-5">
    {data.map((car) =>  <div>
      <Card car={car}/>
    </div>  )}
  </div>
   </Container>
    )
}

export default List