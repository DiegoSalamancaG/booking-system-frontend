function StatusBadge({ status }) {
    const normalizedStatus = typeof status === "string"
        ? status.toUpperCase()
        : status === true
            ? "ACTIVE"
            : "INACTIVE";

    const statusStyles = {
        ACTIVE: {
            label: "ACTIVE",
            backgroundColor: "#d1fae5",
            color: "#065f46"
        },
        INACTIVE: {
            label: "INACTIVE",
            backgroundColor: "#f3f4f6",
            color: "#374151"
        },
        BLOCKED: {
            label: "BLOCKED",
            backgroundColor: "#fee2e2",
            color: "#991b1b"
        }
    };

    const style = statusStyles[normalizedStatus] || {
        label: normalizedStatus,
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
            }}>
            {style.label}
        </span>
    )
}

export default StatusBadge;
