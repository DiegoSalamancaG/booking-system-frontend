import { Link } from "react-router-dom";
import useAuthStore from "../../store/authStore";

function Sidebar() {
  const user = useAuthStore((state) => state.user);
  return (
    <aside style={{
        width: "220px",
        background: "#f4f4f4",
        padding: "1rem",
        minHeight: "calc(100vh - 60px)"
        }}>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li><Link to="/dashboard">Dashboard</Link></li>
        {user?.role === "ADMIN" && (
          <li><Link to="/users">Users</Link></li>
        )}
        {user?.role === "ADMIN" && (
          <li><Link to="/barbers">Barbers</Link></li>
        )}
        {user?.role === "ADMIN" && (
          <li><Link to="/services">Services</Link></li>
        )}
        <li><Link to="/appointments">Appointments</Link></li>
      </ul>
    </aside>
    );
}

export default Sidebar;