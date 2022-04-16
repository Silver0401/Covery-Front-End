import type { NextPage } from "next";
// import bcrypt from "bcryptjs";
import { useRouter } from "next/router";
import { useEffect } from "react";
// import { useEffect } from "react";

const EndPage: NextPage = () => {
  const { username, eventID } = useRouter().query;

  // useEffect(() => {

  //   const CompareSecretHash = async () => {
  //     const result = await bcrypt.compare(
  //       values.password_hash,
  //       response.data[0].password_hash
  //     );

  //   }

  //     console.log(username)
  //     console.log(eventID)
  //     console.log(secret_hash)
  // },[])

  useEffect(() => {
    console.log(username, eventID);
  }, []);

  return <div>{username && eventID ? <h1>Success</h1> : <h1>Error</h1>}</div>;
};

export default EndPage;
