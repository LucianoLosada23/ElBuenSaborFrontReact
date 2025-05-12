import {createBrowserRouter} from "react-router-dom"



import Landing from "./views/Landing"
import Layout from "./layouts/Layout"
import Order from "./views/Order"
export const router = createBrowserRouter ([
    {
        path : "/",
        element : <Layout/>,
        
        children : [
            {
                element : <Landing/>,
                index : true,
              
            },
            {
                path : "catalogo",
                element : <Order/>,
            },
          
        ]
    }
])