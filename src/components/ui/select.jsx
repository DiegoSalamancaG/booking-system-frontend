function Select ({
    register,
    children
}) {
    return (
        <select
            {...register}
            style={{
                width: "100%",
                padding: "10px",
                marginBottom: "1rem",
                borderRadius: "6px",
                border: "1px solid #ccc",
                backgroundColor: "white",
                color: "#111827"
            }}
        >
            {children}
        </select>
    )
}

export default Select;