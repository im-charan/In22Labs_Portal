import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import { element } from 'prop-types';
import ListUsers from '../views/admin/ListUsers';
import ListDashboards from '../views/admin/ListDashboards';
import AdminLayout from '../layouts/admin/AdminLayout';
import CreateUser from '../views/admin/CreateUsers';
import Pbpage from '../views/dashboard/components/Pbpage';
// import ContactUsPage from '../views/authentication/auth/AuthContactUs';
import ContactUsPage from '../views/authentication/auth/AuthContactus';
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
const Login = Loadable(lazy(() => import('../views/authentication/Login')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/dashboard" /> },
      { path: '/dashboard', exact: true, element: <Dashboard /> },
      { path: '/sample-page', exact: true, element: <SamplePage /> },
      { path: '/icons', exact: true, element: <Icons /> },
      { path: '/ui/typography', exact: true, element: <TypographyPage /> },
      { path: '/ui/shadow', exact: true, element: <Shadow /> },
      // { path: '*', element: <Navigate to="/auth/404" /> },
      { path: '/dashboard/product/:id', element: <Pbpage /> },
      
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/login', element: <Login /> },
      { path: '/auth/contactus',element:<ContactUsPage/>},
      { path: '*', element: <Navigate to="/auth/404" /> },
      
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { path: '/admin/', element: <Navigate to="/admin/users" /> },
      { path: '/admin/users', exact: true, element: <ListUsers/> },
      { path: '/admin/dashboards', exact: true, element: <ListDashboards/>},
      { path: '/admin/createuser', exact: true, element: <CreateUser/>},
    ],
  },
];

export default Router;
