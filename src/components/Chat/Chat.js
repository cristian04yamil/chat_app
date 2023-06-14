import React from "react";

export default function Chat({ message, username }) {

  const getTimeDifference = (timestamp) => {
    const now = Date.now();
    const difference = now - timestamp;
    const minutesDifference = Math.floor(difference / 60000);
  
    if (minutesDifference < 5) {
      return 'now';
    } else {
      const messageTime = new Date(timestamp).toLocaleString();
      return messageTime;
    }
  };

  return (
    <>
      {message.userName !== username ? (
        <div
          className="d-flex flex-row justify-content-start mb-4"
          key={message.id}
        >
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
            alt="avatar 1"
            style={{ width: "45px", height: "100%" }}
          />
          <div
            className="p-3 ms-3"
            style={{
              borderRadius: "15px",
              backgroundColor: "rgba(57, 192, 237,.2)",
            }}
          >
            <p className="small mb-0">{message.text}</p>
            <p className="small mb-0">{getTimeDifference(message.timestamp)}</p>
          </div>
        </div>
      ) : (
        <div
          className="d-flex flex-row justify-content-end mb-4"
          key={message.id}
        >
          <div
            className="p-3 me-3 border"
            style={{ borderRadius: "15px", backgroundColor: "#fbfbfb" }}
          >
            <p className="small mb-0">{message.text}</p>
            <p className="small mb-0">{getTimeDifference(message.timestamp)}</p>
          </div>
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
            alt="avatar 1"
            style={{ width: "45px", height: "100%" }}
          />
        </div>
      )}
    </>
  );
}
