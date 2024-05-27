import {createBrowserRouter} from 'react-router-dom'
import Layout from '../pages/Layout';
import Home from '../pages/Home'
import DetailPage from '../pages/DetailPage';
import ProfilePage from '../pages/ProfilePage';
import Profile_works from '../pages/Profile_works';
import Profile_favoriates from '../pages/Profile_favoriates';
import Profile_followings from '../pages/Profile_followings';
import Profile_followers from '../pages/Profile_followers';

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
                        index:true,
                        element:<Profile_works/>
                    },
                    {
                        path:'/profile/:uid/followers',
                        element:<Profile_followers/>
                    },
                    {
                        path:'/profile/:uid/followings',
                        element:<Profile_followings/>
                    },
                    {
                        path:'/profile/:uid/favoriates',
                        element:<Profile_favoriates/>
                    },
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