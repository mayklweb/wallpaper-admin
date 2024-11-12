import { Banner, Categories, Content, Dashboard, Logout, Products } from "../pages";

export const routes = [
  {
    id: 1,
    path: '/',
    component: <Dashboard />
  },
  {
    id: 2,
    path: '/products',
    component: <Products />
  },
  {
    id: 3,
    path: '/categories',
    component: <Categories />
  },
  {
    id: 4,
    path: '/logout',
    component: <Logout />
  },
  {
    id: 5,
    path: '*',
    component: <Dashboard />
  },
  {
    id: 6,
    path: '/banner',
    component: <Banner />
  },
  {
    id: 7,
    path: '/content',
    component: <Content />
  },

]
