// component's config object.
const components = {
  //Customer
  CDashboard: {
    url: "/dashboard",
    title: "Dashboard",
    icon: "Dashboard",
    component: "CustomerDashboardPage",
    layout: "/customer",
    module: 1
  },
  CProfile: {
    url: "/user",
    title: "Perfil",
    icon: "Person",
    component: "CustomerProfile",
    layout: "/customer",
    module: 1
  },
  //Retail

  RDashboard: {
    url: "/dashboard",
    title: "Dashboard",
    icon: 'Dashboard',
    component: 'RetailDashboardPage',
    layout: "/retail",
    module: 1
  },
  RetailProfile: {
    url: "/user",
    title: "Perfil",
    icon: 'Person',
    component: 'RetailProfile',
    layout: "/retail",
    module: 1
  },
  ListFeedback: {
    url: "/list-feedbacks",
    title: "Listar Feedbacks",
    icon: "content_paste",
    component: 'ListFeedback',
    layout: "/retail",
    module: 1
  },
  ListQRCodes: {
    url: "/list-qr",
    title: "Listar QR codes",
    icon: "content_paste",
    component: 'ListQRCodes',
    layout: "/retail",
    module: 1
  },
  CreateShop: {
    url: "/shop",
    title: "Cadastrar Loja",
    icon: 'LocationOn',
    component: 'CreateShop',
    layout: "/retail",
    module: 1
  },


  // admin: {
  //   component: 'AdminOnly',
  //   url: '/admin-only',
  //   title: 'Admin Only',
  //   icon: 'menu',
  //   module: 1
  // },
  // users: {
  //   component: 'Users',
  //   url: '/users',
  //   title: 'Users',
  //   icon: 'menu',
  //   module: 1
  // },
  // dashboard: {
  //   component: 'Dashboard',
  //   url: '/dashboard',
  //   title: 'Dashboard',
  //   icon: 'menu',
  //   module: 1
  // },
  // manager: {
  //   component: 'Manager',
  //   url: '/manager',
  //   title: 'Manager',
  //   icon: 'menu',
  //   module: 1
  // },
  // customers: {
  //   component: 'Customers',
  //   url: '/customers',
  //   title: 'Customers',
  //   icon: 'menu',
  //   module: 1
  // },
  // service1: {
  //   component: 'Service1',
  //   url: '/service1',
  //   title: 'Service1',
  //   icon: 'menu',
  //   module: 1
  // },
  // service2: {
  //   component: 'Service2',
  //   url: '/service2',
  //   title: 'Service2',
  //   icon: 'menu',
  //   module: 1
  // }
};

// modules for grouping.
const modules = {
  0: {
    title: 'Dashboard',
    icon: 'home',
    isExpendable: true
  }
};

// component's access to roles.
const rolesConfig = {
  admin: {
    routes: [...Object.values(components)]
  },
  retail: {
    routes: [
      components.RDashboard,
      components.RetailProfile,
      components.ListFeedback,
      components.ListQRCodes
    ]
  },
  customer: {
    routes: [
      components.CDashboard,
      components.CProfile
    ]
  },
  // common: {
  //   routes: [
  //     {
  //       component: 'Home',
  //       url: '/',
  //       title: 'Home',
  //       icon: 'menu',
  //       module: 1
  //     },
  // {
  //   component: 'Profile',
  //   url: '/profile',
  //   title: 'Profile',
  //   icon: 'menu',
  //   module: 1
  // }
  // ]
  // }
};

export { modules, rolesConfig };