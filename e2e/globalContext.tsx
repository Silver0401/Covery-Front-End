import { notification } from "antd";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import Avatar from "boring-avatars";

type NotificationType = "warning" | "info" | "success" | "error";

interface ticket {
  eventID: string;
  hash: string;
}

interface avatar {
  colors: string[];
}

interface userData {
  username: string;
  bio: string | undefined;
  tickets?: Array<ticket>;
  avatar: avatar;
  treasury_account?: string;
  treasury_account_activated: boolean;
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
  contextIsFetchingData: boolean;
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
  contextIsFetchingData: true,
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
    username: "awaiting...",
    bio: undefined,
    tickets: undefined,
    avatar: {
      colors: [],
    },
    treasury_account_activated: false,
  },
  setUserData: () => {},
});

export const GlobalContextProvider: React.FC = (props) => {
  const [loginState, setLoginState] = useState<string | null>(null);
  const [searchedEventID, setSearchedEventID] = useState<string | undefined>(
    undefined
  );
  const [contextIsFetchingData, setContextIsFetchingData] =
    useState<boolean>(true);
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
    username: "awaiting...",
    bio: undefined,
    tickets: undefined,
    avatar: {
      colors: ["#0286EC", "#FFA336", "#000000", "#FFF100", "#1BD4B3"],
    },
    treasury_account_activated: false,
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
    // console.log(window.localStorage.getItem("loggedUserId"));
    const myLocalData = window.localStorage.getItem("loggedUserId")?.split(" ");

    const LoginFetchDetection = async () => {
      let fetchedData: userData | undefined;

      await axios
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
              // console.log(response);
              setLoginState(() => window.localStorage.getItem("loggedUserId"));
              fetchedData = {
                ...userData,
                bio: response.data[0].bio,
                tickets: response.data[0].tickets,
                username: response.data[0].username,
                treasury_account: response.data[0].treasury_account
                  ? response.data[0].treasury_account
                  : null,
              };
            }
          } else {
            window.localStorage.removeItem("loggedUserId");
          }
        })
        .catch((err) => {
          console.log(err);
        });

      if (fetchedData) {
        await axios
          .get(
            `${process.env.NEXT_PUBLIC_NOT_BACKEND_URL}/resource/user_treasury/get/${fetchedData.username}`,
            {
              headers: {
                AUTH_TOKEN: `${process.env.NEXT_PUBLIC_NOT_BACKEND_TOKEN}`,
              },
            }
          )
          .then((res) => {
            if (fetchedData?.treasury_account === null) {
              setUserData({
                ...userData,
                ...fetchedData,
              });
            } else {
              setUserData({
                ...userData,
                ...fetchedData,
                treasury_account: res.data.id,
                treasury_account_activated:
                  res.data.details_submitted && res.data.payouts_enabled,
              });
            }
          })
          .catch((err) => {
            console.error(err);
            setUserData({
              ...userData,
              ...fetchedData,
            });
          });
      }

      setContextIsFetchingData(false);
    };

    LoginFetchDetection();
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        loginState,
        setLoginState,
        createNotification,
        contextIsFetchingData,
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
