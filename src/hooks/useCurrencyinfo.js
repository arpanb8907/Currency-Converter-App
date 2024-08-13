import { useEffect,useState } from "react";
// https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies/usd.json

function useCurrencyinfo(currency){

    const [data,setdata] = useState({})
    
   

    useEffect(()=>{

        const storeddata = JSON.parse(localStorage.getItem(currency))

        if(storeddata) setdata(storeddata)
            
        else{
            let url =   `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies/${currency}.json`;
        
            fetch(url).then((res)=> res.json())
            .then((res)=>{
                setdata(res[currency])
                localStorage.setItem(currency,JSON.stringify(res[currency]))
            })


        }


        


    },[currency])
    //console.log(data);
    
    return data
}

export default useCurrencyinfo;