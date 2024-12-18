import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import { element } from 'prop-types';
import ListUsers from '../views/admin/ListUsers';
import ListDashboards from '../views/admin/ListDashboards';
import AdminLayout from '../layouts/admin/AdminLayout'; 
import Pbpage from '../views/dashboard/components/Pbpage';



import ContactUsPage from '../views/dashboard/AuthContactUs';
import ProfilePage from '../pages/ProfilePage';
import ListOrganisation from '../views/admin/ListOrganisation';
import AddOrganisation from '../views/admin/addorganisation';
import SpecificDash from '../views/admin/dashboards/SpecificDash';
import AddDashboard from '../views/admin/dashboards/add-dashboard';
import AddUser from '../views/admin/AddUser';
import Adminpbpage from '../views/admin/dashboards/Adminpbpage';
import ProtectedRoutes from './ProtectedRoutes';
;
/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')))
const SamplePage = Loadable(lazy(() => import('../views/sample-page/SamplePage')))
const Icons = Loadable(lazy(() => import('../views/icons/Icons')))
const TypographyPage = Loadable(lazy(() => import('../views/utilities/TypographyPage')))
const Shadow = Loadable(lazy(() => import('../views/utilities/Shadow')))
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Register = Loadable(lazy(() => import('../views/authentication/ForgotPassword')));
const Login2 = Loadable(lazy(() => import('../views/authentication/Login')));

const Router = [
  {
    path: "/auth",
    element: <BlankLayout />,
    children: [
      { path: "/auth", element: <Navigate to="/auth/login" /> },
      { path: "/auth/login", element: <Login2 /> },
      { path: "404", element: <Error /> },
      { path: "/auth/register", element: <Register /> },
      { path: "/auth/contactus", element: <ContactUsPage /> },
      { path: "*", element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <ProtectedRoutes element ={<Navigate to='/dashboard'/>} /> },
      { path: "/dashboard/:orgId", exact: true, element: (<ProtectedRoutes element ={<Dashboard/>} />) },
      { path: "/sample-page", exact: true, element: <SamplePage /> },
      { path: "/icons", exact: true, element: <Icons /> },
      // { path: '*', element: <Navigate to="/auth/404" /> },
      { path: "/dashboard/product/:id", element: (<ProtectedRoutes element ={<Pbpage/>} />) },
      { path: "/dashboard/ProfilePage" , element: (<ProtectedRoutes element ={<ProfilePage/>} />)},
      { path: "/dashboard/ContactUsPage" , element: (<ProtectedRoutes element ={<ContactUsPage/>} />)},
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      
      { path: '', element: (<ProtectedRoutes element ={<Navigate to='/users'/>} />) },  
      { path: 'users', exact: true, element: (<ProtectedRoutes element ={<ListUsers/>} />) },
      { path: 'dashboards', exact: true, element: (<ProtectedRoutes element ={<ListDashboards/>} />) },
      { path: 'organisation/:organizationName', element: (<ProtectedRoutes element ={<SpecificDash/>} />) },
      { path: 'createuser', element:(<ProtectedRoutes element ={<AddUser/>} />) },
      // { path: 'dashboards/:product', element:<SpecificDash/> },
     {path: 'organisation', exact:true, element:(<ProtectedRoutes element ={<ListOrganisation/>} />)},
     {path:'addorganisation',exact:true,element: (<ProtectedRoutes element ={<AddOrganisation/>} />)},
     {path:'organisation/:organizationName/add-dashboard',exact:true,element: (<ProtectedRoutes element ={<AddDashboard/>} />)},
     {path:'organisation/:organizationName/:id', exact:true,element:<Adminpbpage/>},
      {path:'dashboards/:id', exact:true, element:<Adminpbpage/>}
    ],
  }
];

export default Router;
