import { useEffect, useState } from "react";
import api from "../../api/axios";

import Table from "../ui/table";
import Button from "../ui/button";
import Alert from "../ui/alert";
import AppointmentStatusBadge from "./appointmentStatusBadge";

function formatDateTime(value, localValue) {
    if (localValue) return localValue;
    if (!value) return "-";

    return new Intl.DateTimeFormat("es-CL", {
        dateStyle: "short",
        timeStyle: "short"
    }).format(new Date(value));
}

function AppointmentList({ refreshKey, onEdit, onDelete }) {
    const [apiError, setApiError] = useState(null);
    const [appointments, setAppointments] = useState([]);

    const fetchAppointments = async () => {
        try {
            setApiError(null);
            const response = await api.get("/reservations?orderBy=startTime&order=desc");
            setAppointments(response.data.data || []);
        } catch (error) {
            setApiError(error);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchAppointments();
    }, [refreshKey]);

    const handleDelete = async (appointmentId) => {
        if (!window.confirm("Estas seguro de eliminar esta reserva?")) return;

        try {
            await api.delete(`/reservations/${appointmentId}`);
            onDelete();
        } catch (error) {
            setApiError(error);
        }
    };

    const cellStyle = {
        padding: "16px 12px",
        fontSize: "0.9rem",
        borderBottom: "1px solid #eee",
        verticalAlign: "middle",
        textAlign: "left",
        overflow: "hidden",
        textOverflow: "ellipsis"
    };

    return (
        <>
            {apiError && <Alert message={apiError} type="error" />}
            <Table
                title="Lista de Reservas"
                headers={["Id", "Cliente", "Barbero", "Servicio", "Inicio", "Termino", "Estado", "Acciones"]}
                columnWidths={["5%", "14%", "14%", "14%", "13%", "13%", "10%", "17%"]}
            >
                {appointments.map((appointment) => {
                    const reservationId = appointment.reservationId || appointment.id;

                    return (
                    <tr key={reservationId}>
                        <td style={cellStyle}>{reservationId}</td>
                        <td style={cellStyle}>
                            {appointment.client?.name || appointment.client?.fullName || `Cliente #${appointment.clientId}`}
                        </td>
                        <td style={cellStyle}>
                            {appointment.barber?.name || appointment.barber?.user?.fullName || `Barbero #${appointment.barberId}`}
                        </td>
                        <td style={cellStyle}>
                            {appointment.service?.name || `Servicio #${appointment.serviceId}`}
                        </td>
                        <td style={cellStyle}>
                            {formatDateTime(appointment.startTimeUTC || appointment.startTime, appointment.starTimeLocal || appointment.startTimeLocal)}
                        </td>
                        <td style={cellStyle}>
                            {formatDateTime(appointment.endTimeUTC || appointment.endTime, appointment.endTimeLocal)}
                        </td>
                        <td style={cellStyle}>
                            <AppointmentStatusBadge status={appointment.status} />
                        </td>
                        <td style={cellStyle}>
                            <div style={{ display: "flex", gap: "8px", justifyContent: "flex-start", flexWrap: "nowrap" }}>
                                <Button size="sm" fullWidth={false} onClick={() => onEdit(appointment)}>
                                    Editar
                                </Button>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    fullWidth={false}
                                    onClick={() => handleDelete(reservationId)}
                                >
                                    Eliminar
                                </Button>
                            </div>
                        </td>
                    </tr>
                )})}
            </Table>
        </>
    );
}

export default AppointmentList;
