import { Avatar, Dropdown, Image, Input, Layout, Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
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
// Context
import { useTheme } from "@/context/themeContext";
import { useAuth } from "@/context/authContext";

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme }: any = useTheme();
  const { logout }: any = useAuth();

  const onLogout = () => {
    logout();

    navigate("/login");
  };

  const items: MenuProps["items"] = [
    {
      label: <span onClick={() => toggleTheme()}>Toggle Theme</span>,
      key: "0",
    },
    {
      label: <span onClick={onLogout}>Logout</span>,
      key: "1",
    },
  ];

  const MenuItems = [
    {
      label: (
        <Link to="/">
          <DashboardIcon />
        </Link>
      ),
      key: "/",
    },
    {
      label: (
        <Link to="/timeline">
          <TimelineIcon />
        </Link>
      ),
      key: "/timeline",
    },
    {
      label: (
        <Link to="/task">
          <TaskIcon />
        </Link>
      ),
      key: "/task",
    },
    {
      label: (
        <Link to="/settings">
          <SettingsIcon />
        </Link>
      ),
      key: "/settings",
    },
  ];

  return (
    <Layout className={`page-wrapper ${theme}`}>
      <Sider
        width={94}
        theme="light"
        breakpoint="lg"
        className="side-menu-wrapper"
      >
        <Menu
          mode="inline"
          theme="light"
          selectedKeys={[location.pathname]}
          items={MenuItems}
        />
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
