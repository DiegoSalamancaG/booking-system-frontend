function Input({
    type = "text",
    placeholder,
    register = {},
    autoComplete = "off",
    value,
    disabled = false,
    readOnly = false,
}) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            autoComplete={autoComplete}
            value={value}
            disabled={disabled}
            readOnly={readOnly}
            {...register}
            style={{
                width: "100%",
                padding: "0.5rem",
                marginBottom: "0.5rem",
                borderRadius: "0.25rem",
                border: "1px solid #ccc",
                backgroundColor: disabled || readOnly ? "#f3f4f6" : "white",
                color: disabled || readOnly ? "#6b7280" : "#111827",
            }}
        />
    )
}

export default Input;
