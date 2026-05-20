import useAuthStore from "../../store/authStore";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    }

    return (
        <nav style={{
            height: "60px",
            backgroundColor: "#111",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 2rem"
        }}>
        <h2>Barber Admin</h2>

        <button onClick={handleLogout}>
            Logout
        </button>
        </nav>
    );
}

export default Navbar;