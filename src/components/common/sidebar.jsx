import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside style={{
        width: "220px",
        background: "#f4f4f4",
        padding: "1rem",
        minHeight: "calc(100vh - 60px)"
        }}>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/appointments">Appointments</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/users">Users</Link></li>
      </ul>
    </aside>
    );
}

export default Sidebar;