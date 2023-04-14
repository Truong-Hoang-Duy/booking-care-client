import React from 'react';

export interface AdminNavigatorProps {
  name: string;
  menus: {
    name: string;
    link: string;
    subMenus?: {
      name: string;
      link: string;
    }[];
  }[];
}

export interface Submenu {
  name: string;
  link: string;
}

export interface MenuProps {
  name: string;
  active: boolean;
  hasSubMenu?: Submenu[];
  link: string;
  children: React.ReactNode;
}

export interface SubMenuProps {
  name: string;
  link: string;
  router?: {
    location: {
      pathname: string;
    };
  };
}

export const adminMenu: AdminNavigatorProps[] = [
  // Quản lý người dùng
  {
    name: 'menu.admin.manage-user',
    menus: [
      {
        name: 'menu.admin.CRUD-user',
        link: '/system/user-manage',
      },
      {
        name: 'menu.admin.manage-doctor',
        link: '/system/doctor-manage',
      },
      {
        name: 'menu.admin.manage-schedule',
        link: '/system/doctor/manage-schedule',
      },
    ],
  },

  // Quản lý chuyên khoa
  {
    name: 'menu.admin.specialty',
    menus: [
      {
        name: 'menu.admin.manage-specialty',
        link: '/system/manage-specialty',
      },
    ],
  },

  // Quản lý phòng khám
  {
    name: 'menu.admin.clinic',
    menus: [
      {
        name: 'menu.admin.manage-clinic',
        link: '/system/manage-clinic',
      },
    ],
  },

  // Quản lý cẩm nang
  {
    name: 'menu.admin.handbook',
    menus: [
      {
        name: 'menu.admin.manage-handbook',
        link: '/system/manage-handbook',
      },
    ],
  },
];

export const doctorMenu: AdminNavigatorProps[] = [
  // Quản lý kế hoạch khám bệnh của bác sĩ
  {
    name: 'menu.admin.manage-user',
    menus: [
      { name: 'menu.admin.manage-schedule', link: '/system/doctor/manage-schedule' },
      { name: 'menu.admin.manage-patient', link: '/system/doctor/manage-patient' },
    ],
  },
];
