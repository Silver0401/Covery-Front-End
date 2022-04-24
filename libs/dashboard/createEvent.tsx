import React, { useState, useContext } from "react";
import { GoogleMap, useJsApiLoader, Circle } from "@react-google-maps/api";
import {
  Button,
  Form,
  Input,
  Modal,
  DatePicker,
  TimePicker,
  Switch,
  Row,
  Col,
  Select,
} from "antd";
import styles from "../../styles/scss/modules.module.scss";
import { GlobalContext } from "../../e2e/globalContext";
import axios from "axios";
import moment from "moment";

const Dashboard: React.FC = () => {
  const { TextArea } = Input;
  const { createNotification, userData } = useContext(GlobalContext);
  const [coverSwitchOn, setCoverSwitchON] = useState<boolean>(false);
  const [modalState, setModalState] = useState<"visible" | "hidden">("hidden");
  const { Option } = Select;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCLK4wlMhNfLl93M-BsUB8l1cfBADDPkYY",
  });

  const containerStyle = {
    width: "470px",
    height: "400px",
  };

  const center = {
    lat: 25.65096525299222,
    lng: -100.28974385015961,
  };

  const onFinish = (values: any) => {
    createNotification(
      "info",
      "Loading...",
      "Processing your data and creating event"
    );
    axios
      .post(
        `${process.env.NEXT_PUBLIC_NOT_BACKEND_URL}/resource/event/pene`,
        {
          bio: values.bio,
          creator: values.username,
          date: moment(values.startTime).format("YYYY/MM/DD"),
          location_url: values.eventLocation,
          name: values.eventName,
          time_end: moment(values.endTime).format("hh:mm:ss a"),
          time_start: moment(values.startTime).format("hh:mm:ss a"),
          price: coverSwitchOn ? values.cover : 0,
        },
        {
          headers: {
            AUTH_TOKEN: `${process.env.NEXT_PUBLIC_NOT_BACKEND_TOKEN}`,
          },
        }
      )
      .then((response) => {
        if (response.data.satus === 400) {
          createNotification(
            "error",
            "Error in request!",
            "Error creating event, try again"
          );
        } else {
          console.log(response);
          createNotification(
            "success",
            "Success!",
            "Event created successfully, you can now check your events tab"
          );
        }
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
              name="eventName"
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
              name="bio"
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
                    <Select defaultValue={200} style={{ width: "200px" }}>
                      <Option value={500}>500 $mxn</Option>
                      <Option value={400}>400 $mxn</Option>
                      <Option value={300}>300 $mxn</Option>
                      <Option value={200}>200 $mxn</Option>
                      <Option value={100}>100 $mxn</Option>
                      <Option value={90}>90 $mxn</Option>
                      <Option value={80}>80 $mxn</Option>
                      <Option value={70}>70 $mxn</Option>
                      <Option value={60}>60 $mxn</Option>
                      <Option value={50}>50 $mxn</Option>
                    </Select>
                    {/* <Input placeholder="$ cost per ticket" suffix="mxn" /> */}
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
              <Input
                onClick={() => {
                  setModalState("visible");
                }}
              />
            </Form.Item>
          </Col>

          <Col span={24} style={{ marginBottom: "50px" }}>
            <Button type="primary" htmlType="submit" block size="large">
              Create Event
            </Button>
          </Col>
        </Row>
      </Form>

      <Modal
        title="Select a Place"
        visible={modalState === "visible" ? true : false}
        onOk={() => setModalState("hidden")}
        onCancel={() => setModalState("hidden")}
      >
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            onClick={(data: any) => console.log(data)}
          >
            {/* Child components, such as markers, info windows, etc. */}
            <>
              <Circle center={center} radius={5} />
              {/* <DirectionsService
                callback={(data: any) => console.log(data)}
                options={directions}
              /> */}
            </>
          </GoogleMap>
        ) : (
          <h4>Loading...</h4>
        )}
      </Modal>
    </section>
  );
};

export default Dashboard;
