function FormContainer({ title, children }) {
    return (
        <div style={{
            backgroundColor: "#f9f9f9",
            padding: "2rem",
            borderRadius: "0.5rem",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            marginBottom: "2rem",

            maxWidth: "500px",
            width: "100%",
            marginInline: "auto"
        }}
        >
            <h2
                style={{
                    color: "#111827",
                    marginBottom: "1rem"
                }}
                >
                {title}
            </h2>
            {children}
        </div>
    )
}

export default FormContainer;