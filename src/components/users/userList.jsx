import { useEffect, useState } from "react";
import api from "../../api/axios";

import Table from "../ui/table";
import Button from "../ui/button";
import StatusBadge from "../ui/statusBadge";
import Alert from "../ui/alert";

function UserList({refreshKey, onEdit, onDelete}) {
    const [ apiError, setApiError ] = useState(null);
    const [ users, setUsers ] = useState([]);

    const fetchUsers = async () => {
        try {
            setApiError(null);
            const response = await api.get("/users?orderBy=createdAt&order=desc");
            setUsers(response.data.data);
        } catch (error) {
            setApiError(error);
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchUsers();
    }, [refreshKey]);

    const handleDelete = async (userId) => {
        if(!window.confirm("¿Estás seguro de eliminar este usuario?")) return;
        try {
            await api.delete(`/users/${userId}`);
            onDelete();
        } catch (error) {
            setApiError(error);
        }
    }

    const cellStyle = {
        padding: "16px 12px",
        fontSize: "0.9rem",
        borderBottom: "1px solid #eee",
        verticalAlign: "middle",
        textAlign: "left"
    };

    const actionCellStyle = {
        ...cellStyle,
        whiteSpace: "nowrap", 
        minWidth: "150px"
    };

    return (
        <>
        {apiError && <Alert message={apiError} type="error" />}
        <Table
            title="Lista de Usuarios"
            headers={["Id", "Nombre", "Email", "Rol", "Estado", "Acciones"]}
            columnWidths={["5%", "25%", "30%", "10%", "10%", "20%"]}
        >
            {users.map((u) => (
            <tr key={u.id}>
                <td style={cellStyle}>{u.id}</td>
                <td style={cellStyle}>{u.fullName}</td>
                <td style={cellStyle}>{u.email}</td>
                <td style={cellStyle}>{u.role}</td>
                <td style={cellStyle}>
                <StatusBadge status={u.status} />
                </td>
                <td style={actionCellStyle}>
                <div style={{ display: "flex", gap: "8px", justifyContent: "flex-start", flexWrap: "nowrap" }}>
                    <Button size="sm" fullWidth={false} onClick={() => onEdit(u)}>
                    Editar
                    </Button>
                    <Button 
                        variant="danger"
                        size="sm"
                        fullWidth={false}
                        onClick={() => handleDelete(u.id)}
                    >
                        Eliminar
                    </Button>
                </div>
                </td>
            </tr>
            ))}
        </Table>
        </>
    );
}

export default UserList;
