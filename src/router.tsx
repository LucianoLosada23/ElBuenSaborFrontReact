import {createBrowserRouter} from "react-router-dom"



import Landing from "./views/Landing"
import Layout from "./layouts/Layout"
export const router = createBrowserRouter ([
    {
        path : "/",
        element : <Layout/>,
        
        children : [
            {
                element : <Landing/>,
                index : true,
              
            },
            /*{
                path : "clientes",
                element : <Clients/>,

            },
            {
                path : "vehiculos",
                element : <Vehicle/>,
            },
            {
                path : "citas",
                element : <Appointments/>,
            },*/
          
        ]
    }
])