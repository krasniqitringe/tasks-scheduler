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
  const { register }: any = useAuth();

  const onFinish = (values: LoginState) => {
    register(values);

    navigate("/login");
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
          <h1>Register Form</h1>
          <Form.Item name="firstname" label="First name">
            <Input placeholder="Please enter the email" />
          </Form.Item>
          <Form.Item name="lastname" label="Last name">
            <Input placeholder="Please enter the email" />
          </Form.Item>
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
