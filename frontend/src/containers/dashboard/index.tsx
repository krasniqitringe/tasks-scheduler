import { Avatar, Dropdown, Image, Input, Layout, Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import { Link, Route, Routes, useLocation } from "react-router-dom";
// Components
import Task from "@/containers/dashboard/subviews/Task";
import Timeline from "@/containers/dashboard/subviews/Timeline";
import Overview from "@/containers/dashboard/subviews/Overview";
import Settings from "@/containers/dashboard/subviews/Settings";
// Images
import {
  ArrowDownIcon,
  DashboardIcon,
  NotificationIcon,
  SearchIcon,
  SettingsIcon,
  TaskIcon,
  TimelineIcon,
} from "@/assets/img";
import AvatarImage from "@/assets/img/avatar.png";

export default function Dashboard() {
  const location = useLocation();

  const items: MenuProps["items"] = [
    {
      label: <a href="https://www.antgroup.com">1st menu item</a>,
      key: "0",
    },
    {
      label: <a href="https://www.aliyun.com">2nd menu item</a>,
      key: "1",
    },
    {
      label: "3rd menu item",
      key: "3",
    },
  ];

  return (
    <Layout className="page-wrapper">
      <Sider
        width={94}
        theme="light"
        breakpoint="lg"
        className="side-menu-wrapper"
      >
        <Menu mode="inline" theme="light" selectedKeys={[location.pathname]}>
          <Menu.Item key="/">
            <Link to="/">
              <DashboardIcon />
            </Link>
          </Menu.Item>
          <Menu.Item key="/timeline">
            <Link to="/timeline">
              <TimelineIcon />
            </Link>
          </Menu.Item>
          <Menu.Item key="/task">
            <Link to="/task">
              <TaskIcon />
            </Link>
          </Menu.Item>
          <Menu.Item key="/settings">
            <Link to="/settings">
              <SettingsIcon />
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className="header-wrapper">
          <div className="search-wrapper">
            <Input placeholder="Search anything..." suffix={<SearchIcon />} />
          </div>
          <div className="actions-wrapper">
            <a href="#">
              <NotificationIcon />
            </a>
            <Dropdown menu={{ items }} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault()}>
                <Avatar
                  size={40}
                  icon={
                    <Image preview={false} src={AvatarImage} alt="avatar" />
                  }
                />
                <ArrowDownIcon />
              </a>
            </Dropdown>
          </div>
        </Header>
        <Content>
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/task" element={<Task />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}
