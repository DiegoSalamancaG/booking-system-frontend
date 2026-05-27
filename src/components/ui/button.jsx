function Button ({
    children,
    type = 'button',
    onClick,
    variant = 'primary',
    size = "md",
    fullWidth = true
}) {
    const style = {
        primary: {
            backgroundColor: '#2563eb',
            color: '#fff',
        },
        danger: {
            backgroundColor: '#dc2626',
            color: '#fff',
        },
        secondary: {
            backgroundColor: '#e5e7eb',
            color: '#000',
        },
    };

    const sizes = {
        sm: {
            padding: "6px 10px",
            fontSize: "0.8rem"
        },
        md: {
            padding: "10px 16px",
            fontSize: "1rem"
        },
        lg: {
            padding: "14px 20px",
            fontSize: "1.25rem"
        }
    };

    return (
        <button
            type={type}
            onClick={onClick}
            style={{
                padding: "0.5rem 1rem",
                border: "none",
                borderRadius: "0.25rem",
                cursor: "pointer",
                margin: "0.25rem",
                width: fullWidth ? "80%" : "auto",
                whiteSpace: "nowrap",
                ...style[variant],
                ...sizes[size]}}
        >
            {children}
        </button>
    )
}

export default Button;
