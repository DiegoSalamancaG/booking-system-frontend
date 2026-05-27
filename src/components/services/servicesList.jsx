import { useEffect, useState } from "react";
import api from "../../api/axios";

import Table from "../ui/table";
import Button from "../ui/button";
import StatusBadge from "../ui/statusBadge";
import Alert from "../ui/alert";

function ServicesList({ refreshKey, onEdit, onDelete }) {
    const [ apiError, setApiError ] = useState(null);
    const [ catServices, setCatServices ] = useState([]);

    const fetchServices = async () => {
        try {
            setApiError(null);
            const response = await api.get("/services?orderBy=createdAt&order=desc");
            setCatServices(response.data.data);
        } catch (error) {
            setApiError(error);
        }
    }

    useEffect(()=> {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchServices();
    }, [refreshKey]);

    const handleDelete = async (serviceId) => {
        if(!window.confirm("¿Estás seguro de eliminar este servicio?")) return;
        try {
            await api.delete(`/services/${serviceId}`);
            onDelete();
        } catch (error) {
            setApiError(error);
        }
    }

    const cellStyle = {
        padding: "16px 12px",
        fontSize: "0.9rem",
        borderBottom: "1px solid #eee"
    };

    return (
        <>
        {apiError && <Alert message={apiError} type="error" />}
        <Table title="Lista de Servicios"
            headers={["Id", "Nombre", "Descripción", "Precio", "Duración (min)", "Status", "Acciones"]}
            columnWidths={["5%", "16%", "28%", "10%", "14%", "10%", "17%"]}>
            {catServices.map((s) => (
                <tr key={s.id}>
                    <td style={cellStyle}>{s.id}</td>
                    <td style={cellStyle}>{s.name}</td>
                    <td style={cellStyle}>{s.description}</td>
                    <td style={cellStyle}>${s.price}</td>
                    <td style={cellStyle}>{s.durationMinutes} minutos</td>
                    <td style={cellStyle}>
                        <StatusBadge status={s.isActive} />
                    </td>
                    <td style={cellStyle}>
                    <div style= {{display: "flex", gap: "8px", justifyContent: "flex-start", flexWrap: "nowrap"}}>
                        <Button size="sm" fullWidth={false} onClick={() => onEdit(s)}>Editar</Button>
                        <Button variant="danger" size="sm" fullWidth={false} onClick={() => handleDelete(s.id)}>Eliminar</Button>
                    </div>
                    </td>
                </tr>
            ))}
        </Table>
        </>
    )
}

export default ServicesList;
