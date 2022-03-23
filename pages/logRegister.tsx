// Libraries
import { Button, Form, Input } from "antd";
import type { NextPage } from "next";
import { useContext, useState } from "react";
import axios from "axios";
import bcrypt from "bcryptjs";
import { GlobalContext } from "../e2e/globalContext";

// Styles
import styles from "../styles/scss/modules.module.scss";

interface UserData {
  username: string;
  mail: string;
  bio?: string;
  password_hash: string;
}

const LogRegister: NextPage = () => {
  const [selectedForm, setSelectedForm] = useState<"Login" | "Register">(
    "Register"
  );
  const { createNotification, setLoginState } = useContext(GlobalContext);

  const onFinish = async (values: UserData) => {
    const salt = bcrypt.genSaltSync(10);

    if (selectedForm === "Register") {
      const userData: UserData = {
        username: values.username,
        mail: values.mail,
        bio: "",
        password_hash: bcrypt.hashSync(values.password_hash, salt),
      };

      axios
        .post(
          `${process.env.NEXT_PUBLIC_NOT_BACKEND_URL}/user/pene`,
          userData,
          {
            headers: {
              AUTH_TOKEN: `${process.env.NEXT_PUBLIC_NOT_BACKEND_TOKEN}`,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            createNotification(
              "success",
              "User Registered",
              "You can now login"
            );
          } else {
            createNotification(
              "error",
              "Error Registering",
              "Please try again"
            );
          }
        })
        .catch((err) => {
          console.error(err);
          createNotification("error", "Error Registering", "Please try again");
        });
    }

    if (selectedForm === "Login") {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_NOT_BACKEND_URL}/user/${values.username}`,
          {
            headers: {
              AUTH_TOKEN: `${process.env.NEXT_PUBLIC_NOT_BACKEND_TOKEN}`,
            },
          }
        )
        .then(async (response) => {
          if (response.status === 200) {
            const result = await bcrypt.compare(
              values.password_hash,
              response.data[0].password_hash
            );
            if (result) {
              setLoginState(true);
              createNotification(
                "success",
                "Login Successfull",
                "Redirecting you"
              );
            } else {
              createNotification(
                "error",
                "Incorrect Password",
                "Check your password and try again"
              );
            }
          } else {
            createNotification(
              "error",
              "Error Logging You In",
              "Please try again"
            );
          }
        })
        .catch((err) => {
          console.error(err);
          createNotification(
            "error",
            "Error Logging You In",
            "Please try again"
          );
        });
    }
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
        {selectedForm === "Register" && (
          <Form.Item
            label="Mail"
            name="mail"
            rules={[{ required: true, message: "Please input your mail!" }]}
          >
            <Input />
          </Form.Item>
        )}

        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password_hash"
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
