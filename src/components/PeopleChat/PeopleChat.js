import React from "react";

export default function PeopleChat({ message, username }) {
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
