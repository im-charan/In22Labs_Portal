import {
  IconAperture, IconCopy, IconLayoutDashboard, IconLogin, IconMoodHappy, IconTypography, IconUserPlus,IconUser,
  IconUsersGroup,
  IconPhone
} from '@tabler/icons-react';

import { uniqueId } from 'lodash';

const Menuitems = [
 

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: `/dashboard`,
  },
  {
    id: uniqueId(),
    title: "Contact Us",
    icon: IconPhone,
    href: "/dashboard/ContactUsPage",
  },
  // {
  //   navlabel: true,
  //   subheader: 'Admin',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Users',
  //   icon: IconUsersGroup,
  //   href: '/admin/users',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Dashboards',
  //   icon: IconLayoutDashboard,
  //   href: '/admin/dashboards',
  // },
  // {
  //   navlabel: true,
  //   subheader: 'Auth',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Login',
  //   icon: IconLogin,
  //   href: '/auth/login',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Register',
  //   icon: IconUserPlus,
  //   href: '/auth/register',
  // },

  // {
  //   navlabel: true,
  //   subheader: 'Extra',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Icons',
  //   icon: IconMoodHappy,
  //   href: '/icons',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Sample Page',
  //   icon: IconAperture,
  //   href: '/sample-page',
  // },
];

export default Menuitems;
