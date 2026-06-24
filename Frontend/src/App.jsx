import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import ProjectDetails from "./pages/ProjectDetails";

import ProtectedRoute from "./routes/ProtectedRoute";

import Team from "./pages/Team";
import Analytics from "./pages/Analytics";
import Notifications from "./pages/Notifications";
import Chat from "./pages/Chat";
import Settings from "./pages/Settings";
function App() {
  return (
    <Routes>

      {/* Public Routes */}

      <Route
        path="/login"
        element={<Login />}
      />
<Route
  path="/notifications"
  element={
    <ProtectedRoute>
      <Notifications />
    </ProtectedRoute>
  }
/>

<Route
  path="/chat"
  element={
    <ProtectedRoute>
      <Chat />
    </ProtectedRoute>
  }
/>
      <Route
        path="/signup"
        element={<Signup />}
      />

      {/* Dashboard */}

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Projects */}

      <Route
        path="/projects"
        element={
          <ProtectedRoute>
            <Projects />
          </ProtectedRoute>
        }
      />

      {/* Single Project */}

      <Route
        path="/project/:id"
        element={
          <ProtectedRoute>
            <ProjectDetails />
          </ProtectedRoute>
        }
      />

      {/* Tasks */}

      <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <Tasks />
          </ProtectedRoute>
        }
      />

      {/* Team */}

      <Route
  path="/team"
  element={
    <ProtectedRoute>
      <Team />
    </ProtectedRoute>
  }
/>
      {/* Settings */}
<Route
  path="/analytics"
  element={
    <ProtectedRoute>
      <Analytics />
    </ProtectedRoute>
  }
/>
<Route
  path="/settings"
  element={
    <ProtectedRoute>
      <Settings />
    </ProtectedRoute>
  }
/>

    </Routes>
  );
}

export default App;