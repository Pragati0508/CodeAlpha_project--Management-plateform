// import { useEffect, useState, useRef } from "react";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
// import socket from "../socket";

// const Chat = () => {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [onlineUsers, setOnlineUsers] = useState([]);

//   const chatRef = useRef(null);
//   const fileInputRef = useRef(null);

//   const currentUser =
//     localStorage.getItem("username") || "User";

//   useEffect(() => {
//     socket.emit("join", currentUser);

//     socket.on("receiveMessage", (data) => {
//       setMessages((prev) => [...prev, data]);
//     });

//     socket.on("receiveFile", (data) => {
//       setMessages((prev) => [...prev, data]);
//     });

//     socket.on("onlineUsers", (users) => {
//       setOnlineUsers(users);
//     });

//     return () => {
//       socket.off("receiveMessage");
//       socket.off("receiveFile");
//       socket.off("onlineUsers");
//     };
//   }, []);

//   useEffect(() => {
//     if (chatRef.current) {
//       chatRef.current.scrollTop =
//         chatRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const sendMessage = () => {
//     if (!message.trim()) return;

//     socket.emit("sendMessage", {
//       user: currentUser,
//       text: message,
//       time: new Date().toLocaleTimeString(),
//     });

//     setMessage("");
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];

//     if (!file) return;

//     const reader = new FileReader();

//     reader.onload = () => {
//       socket.emit("sendFile", {
//         user: currentUser,
//         fileName: file.name,
//         fileData: reader.result,
//         time: new Date().toLocaleTimeString(),
//         type: "file",
//       });
//     };

//     reader.readAsDataURL(file);
//   };

//   return (
//     <>
//       <Navbar />

//       <div style={{ display: "flex" }}>
//         <Sidebar />

//         <div
//           style={{
//             flex: 1,
//             padding: "30px",
//             background:
//               "linear-gradient(135deg,#fefce8,#dbeafe)",
//             minHeight: "100vh",
//           }}
//         >
//           <div
//             style={{
//               background:
//                 "linear-gradient(135deg,#2563eb,#7c3aed)",
//               padding: "30px",
//               borderRadius: "25px",
//               color: "white",
//               marginBottom: "25px",
//             }}
//           >
//             <h1>💬 Team Collaboration Chat</h1>

//             <p>
//               Real-time communication with your
//               team members.
//             </p>
//           </div>

//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns:
//                 "280px 1fr",
//               gap: "20px",
//             }}
//           >            {/* Online Users */}

//             <div
//               style={{
//                 background: "white",
//                 borderRadius: "25px",
//                 padding: "20px",
//                 boxShadow:
//                   "0 10px 25px rgba(0,0,0,0.08)",
//                 minHeight: "220px",
//               }}
//             >
//               <h3
//                 style={{
//                   marginBottom: "20px",
//                 }}
//               >
//                 🟢 Online Members (
//                 {onlineUsers.length})
//               </h3>

//               {onlineUsers.length === 0 ? (
//                 <p>No Users Online</p>
//               ) : (
//                 onlineUsers.map((user) => (
//                   <div
//                     key={user.socketId}
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: "10px",
//                       marginBottom: "12px",
//                       padding: "10px",
//                       background: "#f8fafc",
//                       borderRadius: "12px",
//                     }}
//                   >
//                     <div
//                       style={{
//                         width: "40px",
//                         height: "40px",
//                         borderRadius: "50%",
//                         background: "#2563eb",
//                         color: "white",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent:
//                           "center",
//                         fontWeight: "bold",
//                       }}
//                     >
//                       {user.username
//                         ?.charAt(0)
//                         .toUpperCase()}
//                     </div>

//                     <span>
//                       {user.username}
//                     </span>
//                   </div>
//                 ))
//               )}
//             </div>

//             {/* Chat Area */}

//             <div
//               style={{
//                 background: "white",
//                 borderRadius: "25px",
//                 padding: "20px",
//                 boxShadow:
//                   "0 10px 25px rgba(0,0,0,0.08)",
//                 display: "flex",
//                 flexDirection: "column",
//                 height: "650px",
//               }}
//             >
//               <div
//                 style={{
//                   borderBottom:
//                     "1px solid #e5e7eb",
//                   paddingBottom: "15px",
//                   marginBottom: "15px",
//                 }}
//               >
//                 <h2
//                   style={{
//                     margin: 0,
//                   }}
//                 >
//                   💬 Team Chat
//                 </h2>

//                 <p
//                   style={{
//                     color: "#64748b",
//                   }}
//                 >
//                   Real-time messaging
//                 </p>
//               </div>

//               {/* Messages */}

//               <div
//                 ref={chatRef}
//                 style={{
//                   flex: 1,
//                   overflowY: "auto",
//                   padding: "10px",
//                 }}
//               >
//                 {messages.length === 0 && (
//                   <div
//                     style={{
//                       textAlign: "center",
//                       marginTop: "100px",
//                       color: "#94a3b8",
//                     }}
//                   >
//                     <h2>
//                       💬 Start Conversation
//                     </h2>

//                     <p>
//                       Send your first
//                       message.
//                     </p>
//                   </div>
//                 )}

//                 {messages.map(
//                   (msg, index) => {
//                     const isMine =
//                       msg.user ===
//                       currentUser;

//                     return (
//                       <div
//                         key={index}
//                         style={{
//                           display:
//                             "flex",
//                           justifyContent:
//                             isMine
//                               ? "flex-end"
//                               : "flex-start",
//                           marginBottom:
//                             "15px",
//                         }}
//                       >
//                         <div
//                           style={{
//                             maxWidth:
//                               "55%",
//                             background:
//                               isMine
//                                 ? "#2563eb"
//                                 : "#f1f5f9",

//                             color:
//                               isMine
//                                 ? "white"
//                                 : "#0f172a",

//                             padding:
//                               "12px 15px",

//                             borderRadius:
//                               "18px",
//                           }}
//                         >
//                           <strong>
//                             {msg.user}
//                           </strong>

//                           {msg.type ===
//                           "file" ? (
//                             <div
//                               style={{
//                                 marginTop:
//                                   "8px",
//                               }}
//                             >
//                               <a
//                                 href={
//                                   msg.fileData
//                                 }
//                                 download={
//                                   msg.fileName
//                                 }
//                                 target="_blank"
//                                 rel="noreferrer"
//                                 style={{
//                                   color:
//                                     isMine
//                                       ? "white"
//                                       : "#2563eb",
//                                   fontWeight:
//                                     "bold",
//                                   textDecoration:
//                                     "none",
//                                 }}
//                               >
//                                 📎{" "}
//                                 {
//                                   msg.fileName
//                                 }
//                               </a>
//                             </div>
//                           ) : (
//                             <p>
//                               {msg.text}
//                             </p>
//                           )}

//                           <small>
//                             ⏰{" "}
//                             {msg.time}
//                           </small>
//                         </div>
//                       </div>
//                     );
//                   }
//                 )}
//               </div>

//               {/* Input */}

//               <div
//                 style={{
//                   display: "flex",
//                   gap: "10px",
//                   marginTop: "15px",
//                 }}
//               >
//                 <input
//                   type="text"
//                   placeholder="Type message..."
//                   value={message}
//                   onChange={(e) =>
//                     setMessage(
//                       e.target.value
//                     )
//                   }
//                   onKeyDown={(e) => {
//                     if (
//                       e.key ===
//                       "Enter"
//                     ) {
//                       sendMessage();
//                     }
//                   }}
//                   style={{
//                     flex: 1,
//                     padding: "14px",
//                     borderRadius:
//                       "12px",
//                     border:
//                       "1px solid #cbd5e1",
//                   }}
//                 />

//                 <button
//                   onClick={() =>
//                     fileInputRef.current.click()
//                   }
//                   style={{
//                     background:
//                       "#10b981",
//                     color: "white",
//                     border: "none",
//                     padding:
//                       "14px 18px",
//                     borderRadius:
//                       "12px",
//                     cursor:
//                       "pointer",
//                   }}
//                 >
//                   📎
//                 </button>

//                 <input
//                   type="file"
//                   ref={fileInputRef}
//                   style={{
//                     display:
//                       "none",
//                   }}
//                   onChange={
//                     handleFileUpload
//                   }
//                 />

//                 <button
//                   onClick={
//                     sendMessage
//                   }
//                   style={{
//                     background:
//                       "linear-gradient(135deg,#2563eb,#7c3aed)",
//                     color:
//                       "white",
//                     border: "none",
//                     padding:
//                       "14px 25px",
//                     borderRadius:
//                       "12px",
//                     cursor:
//                       "pointer",
//                     fontWeight:
//                       "600",
//                   }}
//                 >
//                   🚀 Send
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Chat;
import { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import socket from "../socket";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const chatRef = useRef(null);
  const fileInputRef = useRef(null);

  const userData = JSON.parse(
    localStorage.getItem("user")
  );

  const currentUser =
    userData?.name || "User";

  useEffect(() => {
    socket.emit("join", currentUser);

    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("receiveFile", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("receiveFile");
      socket.off("onlineUsers");
    };
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop =
        chatRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;

    socket.emit("sendMessage", {
      user: currentUser,
      text: message,
      time: new Date().toLocaleTimeString(),
    });

    setMessage("");
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      socket.emit("sendFile", {
        user: currentUser,
        fileName: file.name,
        fileData: reader.result,
        time: new Date().toLocaleTimeString(),
        type: "file",
      });
    };

    reader.readAsDataURL(file);
  };

  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div
          style={{
            flex: 1,
            padding: "30px",
            background:
              "linear-gradient(135deg,#fefce8,#dbeafe)",
            minHeight: "100vh",
          }}
        >
          <div
            style={{
              background:
                "linear-gradient(135deg,#2563eb,#7c3aed)",
              padding: "30px",
              borderRadius: "25px",
              color: "white",
              marginBottom: "25px",
            }}
          >
            <h1>💬 Team Collaboration Chat</h1>

            <p>
              Real-time communication with your
              team members.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "280px 1fr",
              gap: "20px",
            }}
          >            {/* Online Users */}

            <div
              style={{
                background: "white",
                borderRadius: "25px",
                padding: "20px",
                boxShadow:
                  "0 10px 25px rgba(0,0,0,0.08)",
                minHeight: "220px",
              }}
            >
              <h3
                style={{
                  marginBottom: "20px",
                }}
              >
                🟢 Online Members (
                {onlineUsers.length})
              </h3>

              {onlineUsers.length === 0 ? (
                <p>No Users Online</p>
              ) : (
                onlineUsers.map((user, index) => (
                  <div
                    key={user.socketId}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "12px",
                      padding: "10px",
                      background: "#f8fafc",
                      borderRadius: "12px",
                    }}
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background:
                          [
                            "#2563eb",
                            "#7c3aed",
                            "#16a34a",
                            "#ea580c",
                            "#ec4899",
                          ][index % 5],
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent:
                          "center",
                        fontWeight: "bold",
                      }}
                    >
                      {user.username
                        ?.charAt(0)
                        .toUpperCase()}
                    </div>

                    <span>
                      {user.username}
                    </span>
                  </div>
                ))
              )}
            </div>

            {/* Chat Area */}

            <div
              style={{
                background: "white",
                borderRadius: "25px",
                padding: "20px",
                boxShadow:
                  "0 10px 25px rgba(0,0,0,0.08)",
                display: "flex",
                flexDirection: "column",
                height: "650px",
              }}
            >
              <div
                style={{
                  borderBottom:
                    "1px solid #e5e7eb",
                  paddingBottom: "15px",
                  marginBottom: "15px",
                }}
              >
                <h2
                  style={{
                    margin: 0,
                  }}
                >
                  💬 Team Chat
                </h2>

                <p
                  style={{
                    color: "#64748b",
                  }}
                >
                  Real-time messaging
                </p>
              </div>

              {/* Messages */}

              <div
                ref={chatRef}
                style={{
                  flex: 1,
                  overflowY: "auto",
                  padding: "10px",
                }}
              >
                {messages.length === 0 && (
                  <div
                    style={{
                      textAlign: "center",
                      marginTop: "100px",
                      color: "#94a3b8",
                    }}
                  >
                    <h2>
                      💬 Start Conversation
                    </h2>

                    <p>
                      Send your first
                      message.
                    </p>
                  </div>
                )}

                {messages.map(
                  (msg, index) => {
                    const isMine =
                      msg.user ===
                      currentUser;

                    return (
                      <div
                        key={index}
                        style={{
                          display:
                            "flex",
                          justifyContent:
                            isMine
                              ? "flex-end"
                              : "flex-start",
                          marginBottom:
                            "15px",
                        }}
                      >
                        <div
                          style={{
                            maxWidth:
                              "60%",
                            background:
                              isMine
                                ? "#2563eb"
                                : "#f1f5f9",

                            color:
                              isMine
                                ? "white"
                                : "#0f172a",

                            padding:
                              "12px 15px",

                            borderRadius:
                              "18px",
                          }}
                        >
                          <div
                            style={{
                              display:
                                "flex",
                              alignItems:
                                "center",
                              gap: "8px",
                              marginBottom:
                                "6px",
                            }}
                          >
                            <div
                              style={{
                                width:
                                  "28px",
                                height:
                                  "28px",
                                borderRadius:
                                  "50%",
                                background:
                                  isMine
                                    ? "#1d4ed8"
                                    : "#64748b",
                                color:
                                  "white",
                                display:
                                  "flex",
                                alignItems:
                                  "center",
                                justifyContent:
                                  "center",
                                fontSize:
                                  "12px",
                                fontWeight:
                                  "bold",
                              }}
                            >
                              {msg.user?.charAt(
                                0
                              )}
                            </div>

                            <strong>
                              {msg.user}
                            </strong>
                          </div>

                          {msg.type ===
                          "file" ? (
                            <div
                              style={{
                                marginTop:
                                  "8px",
                              }}
                            >
                              <a
                                href={
                                  msg.fileData
                                }
                                download={
                                  msg.fileName
                                }
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                  color:
                                    isMine
                                      ? "white"
                                      : "#2563eb",
                                  fontWeight:
                                    "bold",
                                  textDecoration:
                                    "none",
                                }}
                              >
                                📎{" "}
                                {
                                  msg.fileName
                                }
                              </a>
                            </div>
                          ) : (
                            <p>
                              {msg.text}
                            </p>
                          )}

                          <small>
                            ⏰{" "}
                            {msg.time}
                          </small>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>

              {/* Input */}

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "15px",
                }}
              >
                <input
                  type="text"
                  placeholder="Type message..."
                  value={message}
                  onChange={(e) =>
                    setMessage(
                      e.target.value
                    )
                  }
                  onKeyDown={(e) => {
                    if (
                      e.key ===
                      "Enter"
                    ) {
                      sendMessage();
                    }
                  }}
                  style={{
                    flex: 1,
                    padding: "14px",
                    borderRadius:
                      "12px",
                    border:
                      "1px solid #cbd5e1",
                  }}
                />

                <button
                  onClick={() =>
                    fileInputRef.current.click()
                  }
                  style={{
                    background:
                      "#10b981",
                    color: "white",
                    border: "none",
                    padding:
                      "14px 18px",
                    borderRadius:
                      "12px",
                    cursor:
                      "pointer",
                  }}
                >
                  📎
                </button>

                <input
                  type="file"
                  ref={fileInputRef}
                  style={{
                    display:
                      "none",
                  }}
                  onChange={
                    handleFileUpload
                  }
                />

                <button
                  onClick={
                    sendMessage
                  }
                  style={{
                    background:
                      "linear-gradient(135deg,#2563eb,#7c3aed)",
                    color:
                      "white",
                    border: "none",
                    padding:
                      "14px 25px",
                    borderRadius:
                      "12px",
                    cursor:
                      "pointer",
                    fontWeight:
                      "600",
                  }}
                >
                  🚀 Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;