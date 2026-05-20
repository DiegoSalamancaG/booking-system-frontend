import { useEffect, useState } from "react";
import api from "../../api/axios";

function BarberList({refreshKey, onEdit, onDelete}) {
    const [ apiError, setApiError ] = useState(null);
    const [ barbers, setBarbers ] = useState([]);

    useEffect(() => {
        fetchBarbers();
    }, [refreshKey]);

    const fetchBarbers = async () => {
        try {
            setApiError(null);
            const response = await api.get("/barbers");
            setBarbers(response.data.data);
        } catch (error) {
            setApiError(error.message);
        }
    }

    const handleDelete = async (barberId) => {
        if(!window.confirm("¿Estás seguro de eliminar este barbero?")) return;
        try {
            await api.delete(`/barbers/${barberId}`);
            onDelete();
        } catch (error) {
            setApiError(error.message);
        }
    }

    return (
        <div>
            <h3>Lista de Barberos</h3>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Años de Experiencia</th>
                        <th>Biografía</th>
                        <th>Status</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {barbers.map((b) => (
                        <tr key={b.userId}>
                            <td>{b.userId}</td>
                            <td>{b.user.fullName}</td>
                            <td>{b.user.email}</td>
                            <td>{b.user.role}</td>
                            <td>{b.experienceYears}</td>
                            <td>{b.bio}</td>
                            <td>{b.user.status==="ACTIVE" ? "Activo" : "Inactivo"}</td>
                            <td>
                                <button onClick={() => onEdit(b)}>Editar</button>
                                {b.user.status==="ACTIVE" ? (<button onClick={() => handleDelete(b.userId)}>Eliminar</button>) : null}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default BarberList;