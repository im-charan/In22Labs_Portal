import { color } from '@mui/system';
import {
  IconAperture, IconCopy, IconLayoutDashboard, IconLogin, IconMoodHappy, IconTypography, IconUserPlus,IconUser,
  IconUsersGroup,
  IconLogout,
  IconBuilding
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
    title: 'All Clients Dashboards',
    icon: IconLayoutDashboard,
    href: '/admin/dashboards',
  },
  {
    id: uniqueId(),
    title: 'Organisation',
    icon: IconBuilding,
    href: '/admin/organisation',
  },
];

export default AdminMenuitems;
