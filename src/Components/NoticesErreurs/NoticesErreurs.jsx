import React, { useState, useEffect } from "react";
import Card4 from "../Générique/Card_4";
import Card8 from "../Générique/Card_8";
import TabNotice from "./TabNotice";
import TabPPNNotice from "./TabPPNNotice";
import { modifKey } from "./notices";
import { Row } from "react-bootstrap";

function NoticesErreurs() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [notices, setNotices] = useState({});
  const [data_notices, setDataNotices] = useState([]);

  useEffect(() => {
    fetch("/getNotices")
      .then((res) => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          console.log("data", data);
          setNotices(data);

          const data_notices = modifKey(data);
          console.log("data_notice", data_notices);
          setDataNotices(data_notices);
        },
        (e) => {
          setIsLoaded(true);
          setError(e);
        }
      );
  }, []);

  if (error) {
    return (
      <div>
        Error:
        {error.message}
      </div>
    );
  }
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <h2>Historique des notices erronées</h2>
      <br></br>
      <Row>
        <Card4
          title={"Notices erronées"}
          content={<TabNotice listNotices={data_notices} />}
        />
        <Card8
          title={"Détail des notices"}
          content={<TabPPNNotice notices={notices} />}
        />
      </Row>
    </div>
  );
}

export default NoticesErreurs;