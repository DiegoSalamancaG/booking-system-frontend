import { useEffect, useState } from "react";
import api from "../../api/axios";

import Table from "../ui/table";
import Button from "../ui/button";
import StatusBadge from "../ui/statusBadge";
import Alert from "../ui/alert";

function BarberList({refreshKey, onEdit, onDelete}) {
    const [ apiError, setApiError ] = useState(null);
    const [ barbers, setBarbers ] = useState([]);

    const fetchBarbers = async () => {
        try {
            setApiError(null);
            const response = await api.get("/barbers");
            setBarbers(response.data.data);
        } catch (error) {
            setApiError(error);
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchBarbers();
    }, [refreshKey]);

    const handleDelete = async (barberId) => {
        if(!window.confirm("¿Estás seguro de eliminar este barbero?")) return;
        try {
            await api.delete(`/barbers/${barberId}`);
            onDelete();
        } catch (error) {
            setApiError(error);
        }
    }
    const cellStyle = {
        padding: "16px 12px",
        fontSize: "0.9rem",
        borderBottom: "1px solid #eee",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        verticalAlign: "left"
    };

    return (
        <>
        {apiError && <Alert message={apiError} type="error" />}
        <Table
            title="Lista de Barberos"
            headers={["Id", "Nombre", "Email", "Rol", "EXP", "Biografía", "Status", "Acciones"]}
            columnWidths={["5%", "18%", "20%", "9%", "8%", "15%", "8%", "17%"]}
        >
            {barbers.map((b) => (
                <tr key={b.userId}>
                    <td style={cellStyle}>{b.userId}</td>
                    <td style={cellStyle}>{b.user.fullName}</td>
                    <td style={cellStyle}>{b.user.email}</td>
                    <td style={cellStyle}>{b.user.role}</td>
                    <td style={cellStyle}>{b.experienceYears}</td>
                    <td style={cellStyle}>
                        {b.bio.length > 25
                            ? `${b.bio.slice(0, 25)}...`
                            : b.bio}
                    </td>
                    <td style={cellStyle}>
                        <StatusBadge status={b.user.status} />
                    </td>
                    <td style={cellStyle}>
                        <div style={{ display: "flex", gap: "8px", justifyContent: "flex-start", flexWrap: "nowrap" }}>
                            <Button size="sm" fullWidth={false} onClick={() => onEdit(b)}>
                                Editar
                            </Button>
                            <Button
                                variant="danger"
                                size="sm"
                                fullWidth={false}
                                onClick={() => handleDelete(b.userId)}
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

export default BarberList;
