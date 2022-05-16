import React, { useState, useContext } from "react";
import GoogleMapsComponent from "../../components/googleMap";
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

interface coordinates {
  lat: number;
  lng: number;
}

interface LocationProps {
  address: string;
  coordinates: coordinates;
}

const Dashboard: React.FC = () => {
  const { TextArea } = Input;
  const { createNotification, userData } = useContext(GlobalContext);
  const [coverSwitchOn, setCoverSwitchON] = useState<boolean>(false);
  const [ticketLimitSwitchOn, setTicketLimitSwitchON] =
    useState<boolean>(false);
  const [modalState, setModalState] = useState<"visible" | "hidden">("hidden");
  const [mapData, setMapData] = useState<LocationProps>();
  const { Option } = Select;
  const [currentImg, setCurrentImg] = useState<any>("awaiting...");
  const [form] = Form.useForm();
  const required = true;

  const onFinish = (values: any) => {
    createNotification(
      "info",
      "Loading...",
      "Processing your data to creating event"
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
          n_tickets: ticketLimitSwitchOn ? values.ticketLimit : -1,
          treasury_account: coverSwitchOn ? `${values.cardNumber}` : null,
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
          // IMAGE POST

          let data = new FormData();
          data.append("eventpic", currentImg);

          axios
            .post(
              `${process.env.NEXT_PUBLIC_NOT_BACKEND_URL}/resource/event_pic/set/${response.data.id}`,
              data,
              {
                headers: {
                  "Content-Type": `multipart/form-data`,
                  AUTH_TOKEN: `${process.env.NEXT_PUBLIC_NOT_BACKEND_TOKEN}`,
                },
              }
            )
            .then((response) => {
              form.resetFields();
              createNotification(
                "success",
                "Success!",
                "Event created successfully, you can now check your events tab"
              );
              console.log(response);
            })
            .catch((err) => {
              form.resetFields();
              console.error(err);
              createNotification(
                "success",
                "Event created successfully, without image",
                "Error uploading image, but event created successfully"
              );
            });
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
        form={form}
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
                  required: required,
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
                  required: required,
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
                        required: required,
                        message: "Please complete this field",
                      },
                    ]}
                  >
                    <Select style={{ width: "200px" }}>
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
                  </Form.Item>
                ) : (
                  <p>Your event is free</p>
                )}
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            {coverSwitchOn && (
              <Form.Item
                label="Payment Card Number"
                name="cardNumber"
                rules={[
                  {
                    required: required,
                    message:
                      "Please input your card's number to give you the money of the tickets",
                  },
                ]}
              >
                <Input type="number" />
              </Form.Item>
            )}
          </Col>

          <Col span={24}>
            <Row>
              <Col span={10} className={styles.spaceItemsVertical}>
                <p>{"Ticket's Limit"}</p>
                <Switch
                  onChange={() => setTicketLimitSwitchON(!ticketLimitSwitchOn)}
                />
              </Col>

              <Col span={14} className={styles.alignCenter}>
                {ticketLimitSwitchOn ? (
                  <Form.Item
                    name="ticketLimit"
                    rules={[
                      {
                        required: required,
                        message: "Please complete this field",
                      },
                    ]}
                  >
                    <Input type="number" />
                  </Form.Item>
                ) : (
                  <p>Your event has no guests limit</p>
                )}
              </Col>
            </Row>
          </Col>

          <Col span={24}>
            <input
              type="file"
              onChange={(e) =>
                e.target.files && setCurrentImg(e.target.files[0])
              }
            />
          </Col>

          <Col span={24}>
            <Form.Item
              label="Event Date"
              name="eventDate"
              rules={[
                {
                  required: required,
                  message: "Please input your event's Date!",
                },
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
                  required: required,
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
                  required: required,
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
                  required: required,
                  message: "Please input your event's location!",
                },
              ]}
            >
              <Input
                onChange={() => setModalState("visible")}
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
        maskClosable={false}
        visible={modalState === "visible" ? true : false}
        onOk={() => {
          setModalState("hidden");
          form.setFieldsValue({ eventLocation: mapData?.address });
        }}
        onCancel={() => setModalState("hidden")}
        bodyStyle={{ height: "450px" }}
      >
        <GoogleMapsComponent
          location={(data) => {
            setMapData(data);
          }}
        />
      </Modal>
    </section>
  );
};

export default Dashboard;
