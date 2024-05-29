import {
  Button,
  Col,
  Form,
  Image,
  Input,
  Row,
  Spin,
  Tabs,
  TabsProps,
  Upload,
  message,
} from "antd";
import settignsBackground from "@/assets/img/settingsBackground.png";
import profile from "@/assets/img/profile.png";
import type { UploadProps } from "antd";
import { UploadIcon } from "@/assets/img";
import { UserState, useUser } from "@/context/usersContext";
import { useEffect } from "react";

export default function Settings() {
  const [form] = Form.useForm();
  const { Dragger } = Upload;
  const { user, fetchUserById, updateUser, loading }: any = useUser();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchUserById(userId);
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      ...user,
    });
  }, [user]);

  const onFinish = (values: UserState) => {
    updateUser(userId, values);
  };

  const uploadProps: UploadProps = {
    name: "file",
    multiple: true,
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "My details",
      children: loading ? (
        <Spin />
      ) : (
        <Row gutter={24}>
          <Col xs={24} lg={12}>
            <Form.Item name="firstname" label="First name">
              <Input placeholder="Please enter the first name" />
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item name="lastname" label="Last name">
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
          <Col lg={24}>
            <Form.Item name="profileImage" label="Profile Image">
              <Dragger {...uploadProps}>
                <p className="ant-upload-drag-icon">
                  <UploadIcon />
                </p>
                <p className="ant-upload-text">
                  Click to upload or drag and drop SVG, PNG, JPG or GIF (max,
                  800x400px)
                </p>
              </Dragger>
            </Form.Item>
          </Col>
        </Row>
      ),
    },
    {
      key: "2",
      label: "Profile",
      children: "Work in progress!",
    },
    {
      key: "3",
      label: "Password",
      children: "Work in progress!",
    },
    {
      key: "4",
      label: "Team",
      children: "Work in progress!",
    },
    {
      key: "5",
      label: "Plan",
      children: "Work in progress!",
    },
    {
      key: "6",
      label: "Billing",
      children: "Work in progress!",
    },
    {
      key: "7",
      label: "Email",
      children: "Work in progress!",
    },
    {
      key: "8",
      label: "Notifications",
      children: "Work in progress!",
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
      <Form
        form={form}
        name="normal_login"
        className="login-form"
        onFinish={onFinish}
        layout="vertical"
      >
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
            <Button className="btn btn-secondary">Cancel</Button>
            <Button htmlType="submit" className="btn">
              Submit
            </Button>
          </div>
        </div>
        <Tabs defaultActiveKey="1" items={items} />
      </Form>
    </div>
  );
}
