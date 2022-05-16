import { notification } from "antd";
import React, { createContext, useState } from "react";

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
  loginState: boolean;
  setLoginState: (boolean: boolean) => void;
  searchedEventID: string | undefined;
  setSearchedEventID: (data: string) => void;
  createNotification: (
    type: NotificationType,
    message: string,
    description: string
  ) => void;
  createEventData: createEvent;
  setCreateEventData: (data: createEvent) => void;
  userData: userData;
  setUserData: (data: userData) => void;
}

export const GlobalContext = createContext<GlobalContextProps>({
  loginState: false,
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
  const [loginState, setLoginState] = useState<boolean>(false);
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
    description: string
  ) => {
    notification[type]({
      message,
      description,
    });
  };

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
