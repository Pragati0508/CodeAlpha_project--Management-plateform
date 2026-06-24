import { useEffect, useState } from "react";
import socket from "../socket";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.on("receiveNotification", (data) => {
      setNotifications((prev) => [data, ...prev]);
    });

    return () => {
      socket.off("receiveNotification");
    };
  }, []);

  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div
          style={{
            flex: 1,
            padding: "30px",
          }}
        >
          <h1>Notifications 🔔</h1>

          {notifications.length === 0 ? (
            <p>No Notifications Yet</p>
          ) : (
            notifications.map((n, index) => (
              <div
                key={index}
                style={{
                  padding: "12px",
                  marginBottom: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  background: "#f8fafc",
                }}
              >
                <strong>{n.message}</strong>

                <p
                  style={{
                    marginTop: "5px",
                    color: "gray",
                  }}
                >
                  {n.time}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Notifications;