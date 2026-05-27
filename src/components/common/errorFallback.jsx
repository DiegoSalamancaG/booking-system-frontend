
function ErrorFallback({ error, resetErrorBoundary }) {
    return (
        <div 
        style={{
            padding: "2rem",
            textAlign: "center",
            display: 'flex',
            flexDirection: 'column',
        }}>
            <h2>Opps! Algo salió mal.</h2>
            <p>{error.message}</p>
            <button 
                style={{
                    marginTop: "1rem",
                    padding: "0.5rem 1rem",
                    border: "none",
                    borderRadius: "0.25rem",
                }}
                onClick={resetErrorBoundary}>Intentar de nuevo</button>
        </div>
    )
}

export default ErrorFallback;