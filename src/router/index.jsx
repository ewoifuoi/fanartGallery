import {createBrowserRouter} from 'react-router-dom'
import Layout from '../pages/Layout';
import Home from '../pages/Home'
import DetailPage from '../pages/DetailPage';

const router = createBrowserRouter([
    {
        path:'/',
        element: <Layout/>,
        children: [
            
            {
                path:'/illustration/:id',
                element:<DetailPage/>
            },
            {
                index:true,
                element: <Home/>
            }
        ]
    }
])

export default router;