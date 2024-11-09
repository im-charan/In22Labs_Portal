import {
  IconAperture, IconCopy, IconLayoutDashboard, IconLogin, IconMoodHappy, IconTypography, IconUserPlus,IconUser,
  IconUsersGroup
} from '@tabler/icons-react';

import { uniqueId } from 'lodash';

const AdminMenuitems = [
  {
    navlabel: true,
    subheader: 'Admin',
  },
  {
    id: uniqueId(),
    title: 'Users',
    icon: IconUsersGroup,
    href: '/admin/users',
  },
  {
    id: uniqueId(),
    title: 'Dashboards',
    icon: IconLayoutDashboard,
    href: '/admin/dashboards',
  },
];

export default AdminMenuitems;
