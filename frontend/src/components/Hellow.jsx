import { useState } from "react";
import { getData } from "../services/authservice";

const Hellow = () => {
  const [user, setUser] = useState(null);
  useState(() => {
    const getUser = async () => {
      try {
        const response = await getData();
        console.log(response);
        setUser(response.data.message.username);
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  });
  if (user === null) return <>Loading ...</>;
  return <div className="">Welcome {user}</div>;
};

export default Hellow;
