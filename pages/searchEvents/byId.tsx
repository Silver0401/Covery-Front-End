import { useState, useContext } from "react";
import type { NextPage } from "next";
import { Button, Form, Input } from "antd";
import styles from "../../styles/scss/modules.module.scss";
import axios from "axios";
import { GlobalContext } from "../../e2e/globalContext";
import { useRouter } from "next/router";

interface searchID {
  idIntroduced: string;
}

const IdInputPage: NextPage = () => {
  const { createNotification, setSearchedEventID } = useContext(GlobalContext);
  const router = useRouter();
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const onFinish = (values: searchID) => {
    setButtonLoading(true);
    axios
      .post(
        `${process.env.NEXT_PUBLIC_NOT_BACKEND_URL}/queries/filter_events`,
        { _id: values.idIntroduced },
        {
          headers: {
            AUTH_TOKEN: `${process.env.NEXT_PUBLIC_NOT_BACKEND_TOKEN}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        createNotification(
          "success",
          "Event found",
          "redirecting you to event"
        );
        setSearchedEventID(values.idIntroduced);
        setButtonLoading(false);
        router.push(`/searchEvents/${values.idIntroduced}`);
      })
      .catch((err) => {
        console.error(err);
        createNotification(
          "error",
          "Event not found",
          "try again with another id"
        );
        setButtonLoading(false);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log(errorInfo);
  };

  return (
    <section id="GlobalSection" className={styles.alignCenterVertical}>
      <h2>Search events by ID</h2>

      <Form
        className={styles.card}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Id:"
          name="idIntroduced"
          rules={[{ required: true, message: "Please input an event Id" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            loading={buttonLoading}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
};

export default IdInputPage;
