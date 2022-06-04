import { notification } from "antd";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

type NotificationType = "warning" | "info" | "success" | "error";

interface ticket {
  eventID: string;
  hash: string;
}

interface userData {
  username: string | undefined;
  bio: string | undefined;
  tickets: Array<ticket> | undefined;
}

interface createEvent {
  creator: string | undefined;
  name: string | undefined;
  bio: string | undefined;
  date: string | undefined;
  time_start: string | undefined;
  time_end: string | undefined;
  location_url: string | undefined;
  price: number | undefined;
}

interface GlobalContextProps {
  loginState: string | null;
  setLoginState: (data: string | null) => void;
  searchedEventID: string | undefined;
  setSearchedEventID: (data: string) => void;
  createNotification: (
    type: NotificationType,
    message: string,
    description: string,
    icon?: React.ReactElement
  ) => void;
  createEventData: createEvent;
  setCreateEventData: (data: createEvent) => void;
  userData: userData;
  setUserData: (data: userData) => void;
}

export const GlobalContext = createContext<GlobalContextProps>({
  loginState: null,
  searchedEventID: undefined,
  setSearchedEventID: () => {},
  setLoginState: () => {},
  createNotification: () => {},
  createEventData: {
    creator: undefined,
    name: undefined,
    bio: undefined,
    date: undefined,
    time_start: undefined,
    time_end: undefined,
    location_url: undefined,
    price: undefined,
  },
  setCreateEventData: () => {},
  userData: {
    username: undefined,
    bio: undefined,
    tickets: undefined,
  },
  setUserData: () => {},
});

export const GlobalContextProvider: React.FC = (props) => {
  const [loginState, setLoginState] = useState<string | null>(null);
  const [searchedEventID, setSearchedEventID] = useState<string | undefined>(
    undefined
  );
  const [createEventData, setCreateEventData] = useState<createEvent>({
    creator: undefined,
    name: undefined,
    bio: undefined,
    date: undefined,
    time_start: undefined,
    time_end: undefined,
    location_url: undefined,
    price: undefined,
  });
  const [userData, setUserData] = useState<userData>({
    username: undefined,
    bio: undefined,
    tickets: undefined,
  });

  const createNotification = (
    type: NotificationType,
    message: string,
    description: string,
    icon?: React.ReactElement
  ) => {
    notification[type]({
      message,
      description,
      icon,
    });
  };

  useEffect(() => {
    loginState && window.localStorage.setItem("loggedUserId", loginState);
  }, [loginState]);

  useEffect(() => {
    window.onload = () => {
      console.log(window.localStorage.getItem("loggedUserId"));
      const myLocalData = window.localStorage
        .getItem("loggedUserId")
        ?.split("|");

      axios
        .get(
          `${process.env.NEXT_PUBLIC_NOT_BACKEND_URL}/resource/user/${
            myLocalData && myLocalData[0]
          }`,
          {
            headers: {
              AUTH_TOKEN: `${process.env.NEXT_PUBLIC_NOT_BACKEND_TOKEN}`,
            },
          }
        )
        .then(async (response: any) => {
          if (response.data[0] && myLocalData) {
            if (response.data[0].password_hash === myLocalData[1]) {
              setLoginState(() => window.localStorage.getItem("loggedUserId"));
              setUserData({
                bio: response.data[0].bio,
                tickets: response.data[0].tickets,
                username: response.data[0].username,
              });
            }
          } else {
            window.localStorage.removeItem("loggedUserId");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        loginState,
        setLoginState,
        createNotification,
        createEventData,
        setCreateEventData,
        userData,
        setUserData,
        searchedEventID,
        setSearchedEventID,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
