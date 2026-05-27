import { Link } from "react-router-dom";
import useAuthStore from "../../store/authStore";

function Sidebar() {
  const user = useAuthStore((state) => state.user);
  return (
    <aside style={{
        width: "200px",
        background: "#f4f4f4",
        padding: "2rem 1rem",
        minHeight: "calc(100vh - 60px)",
        boxShadow: "2px 0 8px rgba(0,0,0,0.08)"
        }}>

        <h2 
          style={{color:"#111827",
          marginBottom: "2rem",
          textAlign: "center",
          fontSize: "1.5rem",
          fontWeight: "bold"
        }}
        >Navigate</h2>

        <nav style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          padding: "0 1rem",
        }}>
          <Link style={linkStyle} to="/dashboard">
            Dashboard
          </Link>
          {user?.role === "ADMIN" && (
            <Link style={linkStyle} to="/users">
              Users
            </Link>
          )}
          {user?.role === "ADMIN" && (
            <Link style={linkStyle} to="/barbers">
              Barbers
            </Link>
          )}
          {user?.role === "ADMIN" && (
            <Link style={linkStyle} to="/services">
              Services
            </Link>
          )}
          <Link style={linkStyle} to="/appointments">
            Appointments
          </Link>
        </nav>
    </aside>
    );
}

const linkStyle = {
  textDecoration: "none",
  color: "#374151",
  padding: "12px",
  borderRadius: "8px",
  transition: "0.2s",
  fontWeight: "450"
};

export default Sidebar;