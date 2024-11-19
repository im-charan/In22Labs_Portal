import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import { element } from 'prop-types';
import ListUsers from '../views/admin/ListUsers';
import ListDashboards from '../views/admin/ListDashboards';
import AdminLayout from '../layouts/admin/AdminLayout';
import CreateUser from '../views/admin/CreateUsers';    
import Pbpage from '../views/dashboard/components/Pbpage';
import SpecificDash from '../views/admin/dashboards/SpecificDash';

import ContactUsPage from '../views/dashboard/AuthContactUs';
import ProfilePage from '../pages/ProfilePage';
import ListOrganisation from '../views/admin/ListOrganisation';
import AddOrganisation from '../views/admin/addorganisation';
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
      { path: "/", element: <Navigate to="/dashboard" /> },
      { path: "/dashboard", exact: true, element: <Dashboard /> },
      { path: "/sample-page", exact: true, element: <SamplePage /> },
      { path: "/icons", exact: true, element: <Icons /> },
      // { path: '*', element: <Navigate to="/auth/404" /> },
      { path: "/dashboard/product/:id", element: <Pbpage /> },
      { path: "/dashboard/ProfilePage" , element: <ProfilePage/>},
      { path: "/dashboard/ContactUsPage" , element: <ContactUsPage/>},
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      
      { path: '', element: <Navigate to="users" /> },  
      { path: 'users', exact: true, element: <ListUsers /> },
      { path: 'dashboards', exact: true, element: <ListDashboards /> },
      { path: 'organisation/:organizationName', element:<SpecificDash/> },
      { path: 'createuser', element:<CreateUser/> },
      // { path: 'dashboards/:product', element:<SpecificDash/> },
     {path: 'organisation', exact:true, element:<ListOrganisation/>},
     {path:'addorganisation',exact:true,element:<AddOrganisation/>}
    ],
  }
];

export default Router;
