import { Col, Form, Image, Input, Row, Tabs, TabsProps } from "antd";
import settignsBackground from "@/assets/img/settingsBackground.png";
import profile from "@/assets/img/profile.png";

export default function Settings() {
  const [form] = Form.useForm();

  const onFinish = () => {
    console.log("on form finish");
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "My details",
      children: (
        <Row gutter={24}>
          <Col xs={24} lg={12}>
            <Form.Item name="firstName" label="First name">
              <Input placeholder="Please enter the first name" />
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item name="lastName" label="Last name">
              <Input placeholder="Please enter the last name" />
            </Form.Item>
          </Col>
          <Col lg={24}>
            <Form.Item name="email" label="Email">
              <Input placeholder="Please enter the email" />
            </Form.Item>
          </Col>
          <Col lg={24}>
            <Form.Item name="role" label="Role">
              <Input placeholder="Please enter the role" />
            </Form.Item>
          </Col>
        </Row>
      ),
    },
    {
      key: "2",
      label: "Profile",
      children: "Content of Tab Pane 2",
    },
    {
      key: "3",
      label: "Password",
      children: "Content of Tab Pane 3",
    },
    {
      key: "4",
      label: "Team",
      children: "Content of Tab Pane 3",
    },
    {
      key: "5",
      label: "Plan",
      children: "Content of Tab Pane 3",
    },
    {
      key: "6",
      label: "Billing",
      children: "Content of Tab Pane 3",
    },
    {
      key: "7",
      label: "Email",
      children: "Content of Tab Pane 3",
    },
    {
      key: "8",
      label: "Notifications",
      children: "Content of Tab Pane 3",
    },
  ];

  return (
    <div className="container settings-wrapper">
      <Image
        preview={false}
        src={settignsBackground}
        alt="abstract background"
        className="settings-background"
      />
      <div className="settings-header">
        <div className="settings-title">
          <Image
            preview={false}
            src={profile}
            alt="abstract background"
            className="profile-background"
          />
          <h3 className="title">Settings</h3>
        </div>
        <div className="actions-wrapper">
          <a href="#" className="btn btn-secondary">
            Cancel
          </a>
          <a href="#" className="btn">
            Save
          </a>
        </div>
      </div>
      <Form
        form={form}
        name="normal_login"
        className="login-form"
        onFinish={onFinish}
        layout="vertical"
      >
        <Tabs defaultActiveKey="1" items={items} />
      </Form>
    </div>
  );
}
