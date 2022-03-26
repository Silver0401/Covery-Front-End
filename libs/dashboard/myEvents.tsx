import React, { useEffect, useContext } from "react";
import axios from "axios";
import { GlobalContext } from "../../e2e/globalContext";

const MyEvents: React.FC = () => {
  const { userData } = useContext(GlobalContext);

  useEffect(() => {
    axios
      .post(
        `https://covery-api.herokuapp.com/queries/filter_events`,
        { username: userData.username },
        {
          headers: {
            AUTH_TOKEN: `${process.env.NEXT_PUBLIC_NOT_BACKEND_TOKEN}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <div>
      <div className="filler"></div>
      <div className="filler"></div>
      <div className="filler"></div>
      <div className="filler"></div>
      <div className="filler"></div>
    </div>
  );
};

export default MyEvents;
