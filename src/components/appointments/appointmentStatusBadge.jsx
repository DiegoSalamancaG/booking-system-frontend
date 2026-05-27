const statusStyles = {
    SCHEDULED: {
        label: "Agendada",
        backgroundColor: "#dbeafe",
        color: "#1e40af"
    },
    COMPLETED: {
        label: "Completada",
        backgroundColor: "#d1fae5",
        color: "#065f46"
    },
    CANCELLED: {
        label: "Cancelada",
        backgroundColor: "#fee2e2",
        color: "#991b1b"
    },
    NO_SHOW: {
        label: "No asistio",
        backgroundColor: "#fef3c7",
        color: "#92400e"
    }
};

function AppointmentStatusBadge({ status }) {
    const style = statusStyles[status] || {
        label: status || "Sin estado",
        backgroundColor: "#e5e7eb",
        color: "#374151"
    };

    return (
        <span
            style={{
                padding: "4px 8px",
                fontSize: "0.8rem",
                borderRadius: "6px",
                fontWeight: "bold",
                display: "inline-block",
                backgroundColor: style.backgroundColor,
                color: style.color,
                whiteSpace: "nowrap"
            }}
        >
            {style.label}
        </span>
    );
}

export default AppointmentStatusBadge;
