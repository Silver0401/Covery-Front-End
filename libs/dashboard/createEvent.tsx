import React, { useState, useContext } from "react";
import {
  Button,
  Form,
  Input,
  Steps,
  Tooltip,
  DatePicker,
  TimePicker,
  Switch,
  Row,
  Col,
} from "antd";
import {
  UserSwitchOutlined,
  ScheduleOutlined,
  ExceptionOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import styles from "../../styles/scss/modules.module.scss";
import { GlobalContext } from "../../e2e/globalContext";
import { useRouter } from "next/router";
import axios from "axios";

type steps = "1) Creator Info" | "2) Event Description" | "3) Review";
type stepsKeys = {
  [key in steps]: React.ReactElement;
};

const Dashboard: React.FC = () => {
  const router = useRouter();
  const { Step } = Steps;
  const { TextArea } = Input;
  const { setCreateEventData, createEventData, createNotification, userData } =
    useContext(GlobalContext);
  const [currentStep, setCurrentStep] = useState<steps>("1) Creator Info");
  const [coverSwitchOn, setCoverSwitchON] = useState<boolean>(false);

  const StepsFormsObject: stepsKeys = {
    "1) Creator Info": (
      <>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="Bio"
          name="bio"
          rules={[
            { required: true, message: "Please input a short biography!" },
          ]}
        >
          <TextArea
            placeholder="short bio about you and the event"
            showCount
            maxLength={100}
            style={{ height: 120 }}
          />
        </Form.Item>

        <Row>
          <Col span={10} className={styles.spaceItemsVertical}>
            <p>Cover</p>
            <Switch onChange={() => setCoverSwitchON(!coverSwitchOn)} />
          </Col>

          <Col span={14} className={styles.alignCenter}>
            {coverSwitchOn ? (
              <Form.Item
                name="cover"
                rules={[
                  {
                    required: true,
                    message: "Please input the price per ticket",
                  },
                ]}
              >
                <Input placeholder="$ cost per ticket" suffix="mxn" />
              </Form.Item>
            ) : (
              <p>Your event is free</p>
            )}
          </Col>
        </Row>
      </>
    ),
    "2) Event Description": (
      <>
        <Form.Item
          label="Event Name"
          name="eventName"
          rules={[
            { required: true, message: "Please input your event's name!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Event Date"
          name="eventDate"
          rules={[
            { required: true, message: "Please input your event's Date!" },
          ]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          label="Start Time"
          name="startTime"
          rules={[
            {
              required: true,
              message: "Please input your event's start time!",
            },
          ]}
        >
          <TimePicker />
        </Form.Item>
        <Form.Item
          label="End Time"
          name="endTime"
          rules={[
            { required: true, message: "Please input your event's end time!" },
          ]}
        >
          <TimePicker />
        </Form.Item>
        <Form.Item
          label="Event Location"
          name="eventLocation"
          rules={[
            { required: true, message: "Please input your event's location!" },
          ]}
        >
          <Input />
        </Form.Item>
      </>
    ),
    "3) Review": (
      <>
        <h4>Please check your info is correct</h4>
        {Object.entries(createEventData).map((entry) => {
          const [key, value] = entry;
          return (
            <div key={key}>
              <p>{`${key}: ${value} `}</p>
            </div>
          );
        })}
      </>
    ),
  };

  const createEventPost = () => {
    createNotification(
      "info",
      "Loading...",
      "Processing your data and creating event"
    );
    axios
      .post(
        `${process.env.NEXT_PUBLIC_NOT_BACKEND_URL}/event/pene`,
        createEventData,
        {
          headers: {
            AUTH_TOKEN: `${process.env.NEXT_PUBLIC_NOT_BACKEND_TOKEN}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        createNotification(
          "success",
          "Success!",
          "Event created successfully, you can now check your events tab"
        );
      })
      .catch((err) => {
        console.error(err);
        createNotification(
          "error",
          "Error in request!",
          "Error creating event, try again"
        );
      });
  };

  const onFinish = (values: any) => {
    setCreateEventData({
      bio: values.bio ? values.bio : createEventData.bio,
      creator: values.username ? values.username : createEventData.creator,
      date: values.eventDate
        ? values.eventDate._d.toString()
        : createEventData.date,
      location_url: values.eventLocation
        ? values.eventLocation
        : createEventData.location_url,
      name: values.eventName ? values.eventName : createEventData.name,
      time_end: values.endTime
        ? values.endTime._d.toString()
        : createEventData.time_end,
      time_start: values.startTime
        ? values.startTime._d.toString()
        : createEventData.time_start,
      price:
        coverSwitchOn && values.cover
          ? values.cover
          : createEventData.price
          ? createEventData.price
          : 0,
    });
    StepSwitcher("next");
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
          createEventPost();
          break;
      }
    }
  };

  return (
    <section
      id="DashboardElementSection"
      className={styles.spaceItemsHorizontal}
    >
      <div
        id="instructionsBox"
        className={styles.spaceItemsVertical}
        style={{ width: "50%", height: "100%" }}
      >
        <h3>Fill in the information to create your event</h3>

        <Steps direction="vertical" style={{ width: "50%", height: "50%" }}>
          <Step
            // onClick={() => setCurrentStep("1) Creator Info")}
            status={
              currentStep === "1) Creator Info"
                ? "process"
                : currentStep === "2) Event Description" ||
                  currentStep === "3) Review"
                ? "finish"
                : "wait"
            }
            title="1) Creator Info"
            icon={<UserSwitchOutlined />}
          />
          <Step
            // onClick={() => setCurrentStep("2) Event Description")}
            status={
              currentStep === "2) Event Description"
                ? "process"
                : currentStep === "3) Review"
                ? "finish"
                : "wait"
            }
            title="2) Event Description"
            icon={<ExceptionOutlined />}
          />
          <Step
            // onClick={() => {
            //   setCurrentStep("3) Review");
            //   console.log(createEventData);
            // }}
            status={currentStep === "3) Review" ? "process" : "wait"}
            title="3) Review"
            icon={<ScheduleOutlined />}
          />
        </Steps>
      </div>

      <Form
        id="LogRegisterForm"
        style={{ height: "100%", width: "50%" }}
        name="basic"
        initialValues={{ remember: true, username: userData.username }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {StepsFormsObject[currentStep]}

        {/* Left Right Buttons */}

        <Form.Item
          style={{
            position: "absolute",
            left: "20px",
            bottom: "-15px",
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
            bottom: "-15px",
            width: "33px",
          }}
        >
          <Tooltip title="next step">
            <Button
              type="primary"
              htmlType="submit"
              shape="circle"
              icon={<ArrowRightOutlined />}
            />
          </Tooltip>
        </Form.Item>
      </Form>
    </section>
  );
};

export default Dashboard;
