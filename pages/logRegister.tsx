// Libraries
import { Button, Checkbox, Form, Input } from "antd";
import type { NextPage } from "next";
import { useState } from "react";

// Styles
import styles from "../styles/scss/modules.module.scss";

const LogRegister: NextPage = () => {
  const [selectedForm, setSelectedForm] = useState<"Login" | "Register">(
    "Register"
  );

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <section className={styles.spaceItemsVertical}>
      <h2>{selectedForm}</h2>
      <Form
        id="LogRegisterForm"
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>

        <p
          onClick={() =>
            setSelectedForm(selectedForm === "Login" ? "Register" : "Login")
          }
        >
          {selectedForm === "Login"
            ? "Don't have an account? Click here to Register"
            : "Already have an account? Click here to login"}
        </p>
      </Form>
    </section>
  );
};

export default LogRegister;
