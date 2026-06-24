import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Team = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users/all");
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
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
            background: "#f8fafc",
            minHeight: "100vh",
          }}
        >
          <h1
            style={{
              color: "#0f172a",
              marginBottom: "10px",
            }}
          >
            👥 Team Members
          </h1>

          <p
            style={{
              color: "#64748b",
              marginBottom: "30px",
            }}
          >
            Manage your team and collaborators.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
              gap: "20px",
              marginBottom: "30px",
            }}
          >
            <div
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "20px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
              }}
            >
              <h3>Total Members</h3>
              <h1>{users.length}</h1>
            </div>

            <div
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "20px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
              }}
            >
              <h3>Active Members</h3>
              <h1>{users.length}</h1>
            </div>
          </div>

          <div
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "20px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr
                  style={{
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  <th style={{ textAlign: "left", padding: "15px" }}>
                    Member
                  </th>

                  <th style={{ textAlign: "left", padding: "15px" }}>
                    Email
                  </th>

                  <th style={{ textAlign: "left", padding: "15px" }}>
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    style={{
                      borderBottom: "1px solid #f1f5f9",
                    }}
                  >
                    <td style={{ padding: "15px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <div
                          style={{
                            width: "45px",
                            height: "45px",
                            borderRadius: "50%",
                            background: "#2563eb",
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "bold",
                          }}
                        >
                          {user.name?.charAt(0)}
                        </div>

                        <strong>{user.name}</strong>
                      </div>
                    </td>

                    <td style={{ padding: "15px" }}>
                      {user.email}
                    </td>

                    <td style={{ padding: "15px" }}>
                      <span
                        style={{
                          background: "#dcfce7",
                          color: "#166534",
                          padding: "6px 12px",
                          borderRadius: "20px",
                          fontSize: "14px",
                        }}
                      >
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Team;