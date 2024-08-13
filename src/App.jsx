import { useEffect, useState } from 'react'
// https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies/usd.json

import "./index.css";

import InputBox from './Components/InputBox';
import useCurrencyinfo from './hooks/useCurrencyinfo';

function App() {
  
  // const [amount,setamount] = useState()
  // const [from,setfrom] = useState("usd")
  // const [to,setto] = useState("inr")
  // const [convertedamount,setconvertedamount] = useState()

  const [amount, setamount] = useState(localStorage.getItem('amount') || '');
    const [from, setfrom] = useState(localStorage.getItem('from') || 'usd');
    const [to, setto] = useState(localStorage.getItem('to') || 'inr');
    const [convertedamount, setconvertedamount] = useState(localStorage.getItem('convertedamount') || '');


  const currencyinfo = useCurrencyinfo(from)

  const currency_options = Object.keys(currencyinfo)

  
  useEffect(() => {
    // Store values in localStorage when they change
    localStorage.setItem('amount', amount);
    localStorage.setItem('from', from);
    localStorage.setItem('to', to);
    localStorage.setItem('convertedamount', convertedamount);
}, [amount, from, to, convertedamount]);

  const swap = ()=>{
    setfrom(to)
    setto(from)
    setconvertedamount(amount)
    setamount(convertedamount)
  }

  const convert = ()=>{

    //console.log(currencyinfo);
    

    //console.log(typeof currency_options);
    
    
    setconvertedamount(amount*currencyinfo[to])
    
  }

  return (
    <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{
            backgroundImage: `url('https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
        }}
    >
        <div className="w-full">
            <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        convert()
                       
                    }}
                >
                    <div className="w-full mb-1">
                        <InputBox
                            label="From"
                            amount={amount}
                            currencyoptions={currency_options}
                            onCurrencyChange={(currency) => setamount(amount)}
                            selectcurrency={from}
                            onAmountChange={(amount) => setamount(amount)}
                        />
                    </div>
                    <div className="relative w-full h-0.5">
                        <button
                            type="button"
                            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                            onClick={swap}
                        >
                            swap
                        </button>
                    </div>
                    <div className="w-full mt-1 mb-4">
                        <InputBox
                            label="To"
                            amount={convertedamount}
                            currencyoptions={currency_options}
                            onCurrencyChange={(currency) => setto(currency)}
                            selectcurrency={to}
                            amountDisable
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                        Convert {from.toUpperCase()} to {to.toUpperCase()}
                    </button>
                </form>
            </div>
        </div>
    </div>
);
}

export default App
