function Alert({
    message,
    type = "info"
}) {
    const style = {
        success: {
            backgroundColor: "#dcfce7",
            color: "#166534",
        },
        error: {
            backgroundColor: "#fee2e2",
            color: "#991b1b",
        },
        info: {
            backgroundColor: "#e0e7ff",
            color: "#3730a3",
        },
    }

    return (
        <div style={{
            padding: "1rem",
            borderRadius: "0.25rem",
            marginBottom: "1rem",
            marginTop: "1rem",
            ...style[type],
        }}>
            {message}
        </div>
    )
}

export default Alert;