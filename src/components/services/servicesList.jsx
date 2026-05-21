import { useEffect, useState } from "react";
import api from "../../api/axios";

function ServicesList({ refreshKey, onEdit, onDelete }) {
    const [ apiError, setApiError ] = useState(null);
    const [ catServices, setCatServices ] = useState([]);

    useEffect(()=> {
        fetchServices();
    }, [refreshKey]);

    const fetchServices = async () => {
        try {
            setApiError(null);
            const response = await api.get("/services?status=ACTIVE");
            setCatServices(response.data.data);
        } catch (error) {
            setApiError(error);
        }
    }

    const handleDelete = async (serviceId) => {
        if(!window.confirm("¿Estás seguro de eliminar este servicio?")) return;
        try {
            await api.delete(`/services/${serviceId}`);
            onDelete();
        } catch (error) {
            setApiError(error);
        }
    }

    return (
        <div>
            <h3>Lista de Servicios</h3>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Precio</th>
                    <th>Duración</th>
                    <th>Status</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {catServices.map((s) => (
                    <tr key={s.id}>
                        <td>{s.id}</td>
                        <td>{s.name}</td>
                        <td>{s.description}</td>
                        <td>${s.price}</td>
                        <td>{s.durationMinutes} minutos</td>
                        <td>{s.isActive===true ? "Activo" : "Inactivo"}</td>
                        <td>
                            <td>
                                <button onClick={() => onEdit(s)}>Editar</button>
                                <button onClick={() => handleDelete(s.id)}>Eliminar</button>
                            </td>
                        </td>
                    </tr>
                ))}
            </tbody> 
        </div>
    )
}

export default ServicesList;