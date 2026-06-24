
import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

const Settings = () => {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [name, setName] = useState(
    user?.name || ""
  );

  const [password, setPassword] =
    useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const token =
        localStorage.getItem("token");

      const res = await API.put(
        "/auth/update-profile",
        {
          name,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert(
        "Profile Updated Successfully"
      );

      window.location.reload();

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Update Failed"
      );
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
            background:
              "linear-gradient(135deg,#f8fafc,#eef2ff)",
            minHeight: "100vh",
          }}
        >
          <h1
            style={{
              marginBottom: "25px",
              color: "#0f172a",
            }}
          >
            ⚙ Account Settings
          </h1>

          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "24px",
              boxShadow:
                "0 10px 30px rgba(0,0,0,0.08)",
              maxWidth: "700px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                marginBottom: "25px",
              }}
            >
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg,#2563eb,#7c3aed)",
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "32px",
                  fontWeight: "bold",
                }}
              >
                {user?.name?.charAt(0) || "U"}
              </div>

              <div>
                <h2
                  style={{
                    margin: 0,
                    color: "#0f172a",
                  }}
                >
                  {user?.name}
                </h2>

                <p
                  style={{
                    color: "#64748b",
                  }}
                >
                  {user?.email}
                </p>
              </div>
            </div>

            <hr />

            <form
              onSubmit={handleUpdate}
              style={{
                marginTop: "25px",
              }}
            >
              <label>
                Full Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                style={{
                  width: "100%",
                  padding: "12px",
                  marginTop: "8px",
                  marginBottom: "15px",
                  borderRadius: "10px",
                  border:
                    "1px solid #d1d5db",
                }}
              />

              <label>
                Email Address
              </label>

              <input
                type="email"
                value={user?.email}
                disabled
                style={{
                  width: "100%",
                  padding: "12px",
                  marginTop: "8px",
                  marginBottom: "15px",
                  borderRadius: "10px",
                  border:
                    "1px solid #d1d5db",
                  background:
                    "#f1f5f9",
                }}
              />

              <label>
                New Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                placeholder="Enter new password"
                autoComplete="new-password"
                style={{
                  width: "100%",
                  padding: "12px",
                  marginTop: "8px",
                  marginBottom: "20px",
                  borderRadius: "10px",
                  border:
                    "1px solid #d1d5db",
                }}
              />

              <button
                type="submit"
                style={{
                  background:
                    "linear-gradient(135deg,#2563eb,#7c3aed)",
                  color: "white",
                  border: "none",
                  padding:
                    "12px 25px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "15px",
                }}
              >
                💾 Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;

