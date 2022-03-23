import React, { useEffect, useState } from "react";
import { Button, Form, Input, Steps, Tooltip } from "antd";
import {
  UserSwitchOutlined,
  ScheduleOutlined,
  ExceptionOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import styles from "../styles/scss/modules.module.scss";

type steps = "1) Creator Info" | "2) Event Description" | "3) Review";
type stepStatus = "finish" | "process" | "wait";
type stepsKeys = {
  [key in steps]: stepStatus;
};

const CreateEvent: React.FC = () => {
  const { Step } = Steps;
  const { TextArea } = Input;
  const [currentStep, setCurrentStep] = useState<steps>("1) Creator Info");
  const [selectedStep, setSelectedStep] = useState<stepsKeys>({
    "1) Creator Info": "process",
    "2) Event Description": "wait",
    "3) Review": "wait",
  });

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const StepSwitcher = (arrow: "previous" | "next") => {
    if (arrow === "previous") {
      switch (currentStep) {
        case "1) Creator Info":
          setCurrentStep("1) Creator Info");
          break;
        case "2) Event Description":
          setCurrentStep("1) Creator Info");
          break;
        case "3) Review":
          setCurrentStep("2) Event Description");
          break;
      }
    }
    if (arrow === "next") {
      switch (currentStep) {
        case "1) Creator Info":
          setCurrentStep("2) Event Description");
          break;
        case "2) Event Description":
          setCurrentStep("3) Review");
          break;
        case "3) Review":
          setCurrentStep("3) Review");
          break;
      }
    }
  };

  useEffect(() => {}, [currentStep]);

  return (
    <section className={styles.spaceItemsVertical}>
      <h3>Fill in the information to create your event</h3>

      <Steps style={{ width: "80%" }}>
        <Step
          status={selectedStep["1) Creator Info"]}
          title="1) Creator Info"
          icon={<UserSwitchOutlined />}
        />
        <Step
          status={selectedStep["2) Event Description"]}
          title="2) Event Description"
          icon={<ExceptionOutlined />}
        />
        <Step
          status={selectedStep["3) Review"]}
          title="3) Review"
          icon={<ScheduleOutlined />}
        />
      </Steps>

      <Form
        id="LogRegisterForm"
        name="basic"
        style={{ position: "relative" }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Bio"
          name="biography"
          rules={[
            { required: true, message: "Please input a short biography!" },
          ]}
        >
          <TextArea showCount maxLength={100} style={{ height: 120 }} />
        </Form.Item>

        <Form.Item></Form.Item>

        <Form.Item
          style={{
            position: "absolute",
            left: "20px",
            bottom: "0",
            width: "33px",
          }}
        >
          <Tooltip title="previous step">
            <Button
              type="primary"
              shape="circle"
              onClick={() => {
                StepSwitcher("previous");
              }}
              icon={<ArrowLeftOutlined />}
            />
          </Tooltip>
        </Form.Item>

        <Form.Item
          style={{
            position: "absolute",
            right: "20px",
            bottom: "0",
            width: "33px",
          }}
        >
          <Tooltip title="next step">
            <Button
              type="primary"
              shape="circle"
              onClick={() => {
                StepSwitcher("next");
              }}
              icon={<ArrowRightOutlined />}
            />
          </Tooltip>
        </Form.Item>
      </Form>
    </section>
  );
};

export default CreateEvent;
