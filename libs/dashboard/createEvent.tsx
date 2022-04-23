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

const Dashboard: React.FC = () => {
  const router = useRouter();
  const { TextArea } = Input;
  const { setCreateEventData, createEventData, createNotification, userData } =
    useContext(GlobalContext);
  const [coverSwitchOn, setCoverSwitchON] = useState<boolean>(false);

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
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <section id="DashboardElementSection" className={styles.alignCenter}>
      <Form
        id="CreateEventForm"
        style={{
          overflow: "scroll",
          display: "grid",
          placeItems: "center",
        }}
        name="basic"
        initialValues={{ remember: true, username: userData.username }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row
          gutter={[20, 20]}
          style={{
            width: "90%",
            height: "100%",
            marginTop: "100px",
          }}
        >
          <Col span={24}>
            <h2> Create your Event </h2>
            <h3> Fill the information below </h3>
          </Col>
          <Col span={24}>
            <Form.Item label="Username" name="username">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Event Name"
              rules={[
                {
                  required: true,
                  message: "Please complete this field",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Event Description"
              rules={[
                {
                  required: true,
                  message: "Please complete this field",
                },
              ]}
            >
              <TextArea
                placeholder="short description about the event"
                showCount
                maxLength={100}
                style={{ height: 120 }}
              />
            </Form.Item>
          </Col>

          <Col span={24}>
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
                        message: "Please complete this field",
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
          </Col>
          <Col span={24}>
            <Form.Item
              label="Event Date"
              name="eventDate"
              rules={[
                { required: true, message: "Please input your event's Date!" },
              ]}
            >
              <DatePicker />
            </Form.Item>
          </Col>

          <Col span={24}>
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
          </Col>

          <Col span={24}>
            <Form.Item
              label="End Time"
              name="endTime"
              rules={[
                {
                  required: true,
                  message: "Please input your event's end time!",
                },
              ]}
            >
              <TimePicker />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Event Location"
              name="eventLocation"
              rules={[
                {
                  required: true,
                  message: "Please input your event's location!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={24} style={{ marginBottom: "50px" }}>
            <Button type="primary" block size="large">
              Create Event
            </Button>
          </Col>
        </Row>
      </Form>
    </section>
  );
};

export default Dashboard;
