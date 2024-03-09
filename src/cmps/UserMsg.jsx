import { useEffect, useState } from "react";
import closeIcon from "../assets/imgs/ic_close.png";
import { eventBusService } from "../services/eventbus.service";
export function UserMsg() {
  const [msg, setMsg] = useState({
    type: "success",
    txt: "this is good",
    show: false,
  });

  useEffect(() => {
    eventBusService.on("show-use-msg", (msg) => {
      setMsg(msg);
      setTimeout(closeMsg, 2000);
    });
  }, []);

  function closeMsg() {
    setMsg((prevMsg) => ({ ...prevMsg, show: false }));
  }

  const msgClass = msg.show ? `show ${msg.type}` : "";

  return (
    <div className={`user-msg ${msgClass}`}>
      <div>{msg.txt}</div>
      <div onClick={closeMsg} className="close-msg">
        <img src={closeIcon} alt="" />
      </div>
    </div>
  );
}
