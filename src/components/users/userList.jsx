import { useEffect, useState } from "react";
import api from "../../api/axios";

function UserList({refreshKey, onEdit, onDelete}) {
    const [ apiError, setApiError ] = useState(null);
    const [ users, setUsers ] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, [refreshKey]);

    const fetchUsers = async () => {
        try {
            setApiError(null);
            const response = await api.get("/users?status=ACTIVE");
            setUsers(response.data.data);
        } catch (error) {
            setApiError(error.message);
        }
    }

    const handleDelete = async (userId) => {
        if(!window.confirm("¿Estás seguro de eliminar este usuario?")) return;
        try {
            await api.delete(`/users/${userId}`);
            onDelete();
        } catch (error) {
            setApiError(error.message);
        }
    }

    return (
        <div>
            <h3>Lista de Usuarios</h3>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => (
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.fullName}</td>
                            <td>{u.email}</td>
                            <td>{u.role}</td>
                            <td>
                                <button onClick={() => onEdit(u)}>Editar</button>
                                <button onClick={() => handleDelete(u.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default UserList;