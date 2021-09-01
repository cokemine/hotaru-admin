import React, { FC, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Drawer, Layout as AntdLayout } from 'antd';
import routes from '../routes/admin';
import Sider from '../components/Sider';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { StatusContextProvider } from '../Context/StatusContext';


const Layout: FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => setCollapsed(state => !state);

  return (
    <AntdLayout className="min-h-screen">
      {/* Desktop SideBar */}
      <AntdLayout.Sider
        collapsible
        collapsed={ collapsed }
        onCollapse={ toggleCollapsed }
        trigger={ null }
        className="hidden lg:block"
      >
        <Sider isCollapsed={ collapsed } />
      </AntdLayout.Sider>
      {/* Mobile SideBar */}
      <Drawer
        placement="left"
        className="block lg:hidden"
        visible={ collapsed }
        onClose={ () => setCollapsed(false) }
        width={ 208 }
        bodyStyle={ { padding: 0 } }
      >
        <Sider isCollapsed={ collapsed } />
      </Drawer>
      <AntdLayout>
        <AntdLayout.Header className="bg-white py-2 pl-6 shadow">
          <Header collapsed={ { isCollapsed: collapsed, toggleCollapsed } } />
        </AntdLayout.Header>
        <AntdLayout.Content>
          <div className="container mx-auto px-6 max-w-screen-xl">
            <StatusContextProvider>
              <Switch>
                {routes.map(route => <Route exact key={ route.path } path={ `${route.path}` } component={ route.component } />)}
                <Redirect exact from="/" to="/dashboard" />
              </Switch>
            </StatusContextProvider>
          </div>
        </AntdLayout.Content>
        <AntdLayout.Footer>
          <Footer />
        </AntdLayout.Footer>
      </AntdLayout>
    </AntdLayout>
  );
};

export default Layout;