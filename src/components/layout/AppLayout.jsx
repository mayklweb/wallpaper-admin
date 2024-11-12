// import React, { useState } from 'react';
// import { MenuFoldOutlined, MenuUnfoldOutlined, } from '@ant-design/icons';
// import { Layout, Menu, Button, } from 'antd';
// import { Route, Routes, useLocation } from 'react-router-dom';
// import { routes } from '../../utils/routes';
// import { menuItems } from '../../constants/menuItems';
// const { Header, Sider, Content } = Layout;
// const AppLayout = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const locatin = useLocation()

//   return (
//     <Layout>
//       <Sider trigger={null} collapsible collapsed={collapsed}>
//         <div className="demo-logo-vertical" />
//         <Menu
//           theme="light"
//           mode="inline" 
//           defaultSelectedKeys={[locatin.pathname]}
//           items={menuItems}
//         />
//       </Sider>
//       <Layout>
//         <Header className='header'>
//           <Button
//             type="text"
//             icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//             onClick={() => setCollapsed(!collapsed)}
//             className='collapse-button'
//           />
//         </Header>
//         <Content className='main-content'>
//           <Routes>
//             {
//               routes.map(item => <Route path={item.path} key={item.id} element={item.component} />)
//             }
//           </Routes>
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };
// export default AppLayout;


import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
// import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { routes } from '../../utils/routes';
import { Link, Route, Routes, useLocation } from 'react-router-dom';

export default function AppLayout() {

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100%' }}>
        <Header />
        <Sidebar />

        <Box
          component="main"
          className="MainContent"
          sx={{
            px: { xs: 2, md: 4 },
            pt: {
              xs: 'calc(12px + var(--Header-height))',
              sm: 'calc(12px + var(--Header-height))',
              md: 3,
            },
            pb: { xs: 2, sm: 2, md: 2 },
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            width: "100%",
            height: '100%',
            gap: 1,
          }}
        >
          <Routes>
            {
              routes.map((route) => (
                <Route key={route.id} path={`/${route.path}`} element={route.component} />
              ))

            }
          </Routes>

        </Box>
      </Box>
    </CssVarsProvider>
  );
}
