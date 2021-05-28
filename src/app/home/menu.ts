import { NbMenuItem } from '@nebular/theme';

let menus: Array<any>;
menus = [];
menus[1] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/dashboard',
    home: true,
  },
  {
    title: 'OPERATIONS',
    group: true,
  },
  {
    title: 'Operations',
    icon: 'layout-outline',
    children: [
      {
        title: 'User Onboard',
        link: '/operation/newUser',
      },
    ],
  },
  {
    title: 'Reports',
    group: true,
  },
  {
    title: 'Reports',
    icon: 'layout-outline',
    children: [
      {
        title: 'Money Transfer',
        link: '/reports/dmt',
      },
      {
        title: 'AEPS',
        link: '/reports/aeps',
      },
      {
        title: 'MATM',
        link: '/reports/matm',
      },
      {
        title: 'Recharge',
        link: '/reports/recharge',
      },
      {
        title: 'CMS',
        link: '/reports/cms',
      },
      {
        title: 'Insurance',
        link: '/reports/insurance',
      },
    ],
  },
];
menus[2] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/dashboard',
    home: true,
  },
  {
    title: 'Onboard',
    group: true,
  },
];

menus[4] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/dashboard',
    home: true,
  },
  {
    title: 'SERVICES',
    group: true,
  },
  {
    title: 'Services',
    icon: 'layout-outline',
    children: [
      {
        title: 'Money Trasfer',
        link: '/services/dmt',
      },
      {
        title: 'AEPS',
        link: '/services/aeps',
      },
      {
        title: 'AEPSNEW',
        link: '/services/aepsNew',
      },
      {
        title: 'MATM',
        link: '/services/matm',
      },
      {
        title: 'Recharge',
        link: '/services/recharge',
      },
      {
        title: 'CMS',
        link: '/services/cms',
      },
      {
        title: 'Insurance',
        pathMatch: 'prefix',
        link: '/pages/layout/tabs',
      },
    ],
  },
  {
    title: 'REPORTS',
    group: true,
  },
  {
    title: 'Reports',
    icon: 'layout-outline',
    children: [
      {
        title: 'Money Transfer',
        link: '/reports/dmt',
      },
      {
        title: 'AEPS',
        link: '/reports/aeps',
      },
      {
        title: 'MATM',
        link: '/reports/matm',
      },
      {
        title: 'Recharge',
        link: '/reports/recharge',
      },
      {
        title: 'CMS',
        link: '/reports/cms',
      },
      {
        title: 'Insurance',
        link: '/reports/insurance',
      },
    ],
  },
];
menus[9] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/dashboard',
    home: true,
  },
  {
    title: 'Members',
    icon: 'person-add-outline',
    children: [
      {
        title: 'Show Users',
        link: '/members',
      },
      {
        title: 'Users Service',
        link: '/member/service',
      },
    ],
  },
  {
    title: 'Reports',
    icon: 'person-add-outline',
    children: [
      {
        title: 'Wallet',
        link: '/reports/statement',
      },
      {
        title: 'AEPS',
        link: '/reports/aeps',
      },
      {
        title: 'Onboarding',
        link: '/reports/bconboarding',
      },
    ],
  },
];
menus[11] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/dashboard',
    home: true,
  },
  {
    title: 'Members',
    icon: 'person-add-outline',
    children: [
      {
        title: 'Show Users',
        link: '/members',
      },
    ],
  },
  {
    title: 'Reports',
    icon: 'person-add-outline',
    children: [
      {
        title: 'Wallet',
        link: '/reports/statement',
      },
      {
        title: 'AEPS',
        link: '/reports/aeps',
      },
      {
        title: 'Onboarding',
        link: '/reports/bconboarding',
      },
    ],
  },
];
export const MENU_ITEMS: NbMenuItem[] = menus;

/*[
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/dashboard',
    home: true,
  },
  {
    title: 'SERVICES',
    group: true,
  },
  {
    title: 'Services',
    icon: 'layout-outline',
    children: [
      {
        title: 'Money Trasfer',
        link: '/services/dmt',
      },
      {
        title: 'AEPS',
        link: '/services/aeps',
      },
      {
        title: 'MATM',
        link: '/services/matm',
      },
      {
        title: 'Recharge',
        link: '/services/recharge',
      },
      {
        title: 'CMS',
        link: '/services/cms',
      },
      {
        title: 'Insurance',
        pathMatch: 'prefix',
        link: '/pages/layout/tabs',
      },
    ],
  },
  /!* {
    title: 'Forms',
    icon: 'edit-2-outline',
    children: [
      {
        title: 'Form Inputs',
        link: '/pages/forms/inputs',
      },
      {
        title: 'Form Layouts',
        link: '/pages/forms/layouts',
      },
      {
        title: 'Buttons',
        link: '/pages/forms/buttons',
      },
      {
        title: 'Datepicker',
        link: '/pages/forms/datepicker',
      },
    ],
  },
  {
    title: 'UI Features',
    icon: 'keypad-outline',
    link: '/pages/ui-features',
    children: [
      {
        title: 'Grid',
        link: '/pages/ui-features/grid',
      },
      {
        title: 'Icons',
        link: '/pages/ui-features/icons',
      },
      {
        title: 'Typography',
        link: '/pages/ui-features/typography',
      },
      {
        title: 'Animated Searches',
        link: '/pages/ui-features/search-fields',
      },
    ],
  },
  {
    title: 'Modal & Overlays',
    icon: 'browser-outline',
    children: [
      {
        title: 'Dialog',
        link: '/pages/modal-overlays/dialog',
      },
      {
        title: 'Window',
        link: '/pages/modal-overlays/window',
      },
      {
        title: 'Popover',
        link: '/pages/modal-overlays/popover',
      },
      {
        title: 'Toastr',
        link: '/pages/modal-overlays/toastr',
      },
      {
        title: 'Tooltip',
        link: '/pages/modal-overlays/tooltip',
      },
    ],
  },
  {
    title: 'Extra Components',
    icon: 'message-circle-outline',
    children: [
      {
        title: 'Calendar',
        link: '/pages/extra-components/calendar',
      },
      {
        title: 'Progress Bar',
        link: '/pages/extra-components/progress-bar',
      },
      {
        title: 'Spinner',
        link: '/pages/extra-components/spinner',
      },
      {
        title: 'Alert',
        link: '/pages/extra-components/alert',
      },
      {
        title: 'Calendar Kit',
        link: '/pages/extra-components/calendar-kit',
      },
      {
        title: 'Chat',
        link: '/pages/extra-components/chat',
      },
    ],
  },
  {
    title: 'Maps',
    icon: 'map-outline',
    children: [
      {
        title: 'Google Maps',
        link: '/pages/maps/gmaps',
      },
      {
        title: 'Leaflet Maps',
        link: '/pages/maps/leaflet',
      },
      {
        title: 'Bubble Maps',
        link: '/pages/maps/bubble',
      },
      {
        title: 'Search Maps',
        link: '/pages/maps/searchmap',
      },
    ],
  },
  {
    title: 'Charts',
    icon: 'pie-chart-outline',
    children: [
      {
        title: 'Echarts',
        link: '/pages/charts/echarts',
      },
      {
        title: 'Charts.js',
        link: '/pages/charts/chartjs',
      },
      {
        title: 'D3',
        link: '/pages/charts/d3',
      },
    ],
  },
  {
    title: 'Editors',
    icon: 'text-outline',
    children: [
      {
        title: 'TinyMCE',
        link: '/pages/editors/tinymce',
      },
      {
        title: 'CKEditor',
        link: '/pages/editors/ckeditor',
      },
    ],
  },
  {
    title: 'Tables & Data',
    icon: 'grid-outline',
    children: [
      {
        title: 'Smart Table',
        link: '/pages/tables/smart-table',
      },
      {
        title: 'Tree Grid',
        link: '/pages/tables/tree-grid',
      },
    ],
  },
  {
    title: 'Miscellaneous',
    icon: 'shuffle-2-outline',
    children: [
      {
        title: '404',
        link: '/pages/miscellaneous/404',
      },
    ],
  },
  {
    title: 'Auth',
    icon: 'lock-outline',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  }, *!/
];*/
