import axios from "axios"
import { createContext, useState } from "react"

export const DataContext = createContext(null);

export const DataProvider = ({children}) => {
    const [data, setdata] = useState();

    const fetchAllProducts = async () => {
        try{
            const res = await axios.get("https://fakestoreapi.in/api/products?limit=150");
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    return <DataContext.Provider value={{data, setdata, fetchAllProducts}}>{children}</DataContext.Provider>
}