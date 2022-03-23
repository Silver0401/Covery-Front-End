import { notification } from "antd";
import React, { createContext, useState } from "react";

type NotificationType = "warning" | "info" | "success" | "error";

interface GlobalContextProps {
  loginState: boolean;
  setLoginState: (boolean: boolean) => void;
  createNotification: (
    type: NotificationType,
    message: string,
    description: string
  ) => void;
}

export const GlobalContext = createContext<GlobalContextProps>({
  loginState: false,
  setLoginState: () => {},
  createNotification: () => {},
});

export const GlobalContextProvider: React.FC = (props) => {
  const [loginState, setLoginState] = useState<boolean>(false);
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
      value={{ loginState, setLoginState, createNotification }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
