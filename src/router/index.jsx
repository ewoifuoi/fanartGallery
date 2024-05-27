import {createBrowserRouter} from 'react-router-dom'
import Layout from '../pages/Layout';
import Home from '../pages/Home'
import DetailPage from '../pages/DetailPage';
import ProfilePage from '../pages/ProfilePage';
import Profile_works from '../pages/Profile_works';

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
                path:'/profile/:uid',
                element:<ProfilePage/>,
                children:[
                    {
                        path:'/profile/:uid/works',
                        element:<Profile_works/>
                    }
                ]
            },
            { 
                index:true,
                element: <Home/>
            },
        ]
    }
])

export default router;