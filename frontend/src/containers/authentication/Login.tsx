/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth } from "@/context/authContext";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

interface LoginState {
  email: string;
  password: string;
}

export default function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { login }: any = useAuth();

  const onFinish = (values: LoginState) => {
    login(values).then((response: any) => {
      if (response.success) {
        navigate("/");
      }
    });
  };

  return (
    <div className="container login-container">
      <img src="/src/assets/img/settingsBackground.png" alt="background" />

      <div className="form-wrapper">
        <Form
          form={form}
          name="normal_login"
          className="login-form"
          onFinish={onFinish}
          layout="vertical"
        >
          <h1>Login Form</h1>
          <Form.Item name="email" label="Email">
            <Input placeholder="Please enter the email" />
          </Form.Item>
          <Form.Item name="password" label="Password">
            <Input placeholder="Please enter your password" type="password" />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" className="btn">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
