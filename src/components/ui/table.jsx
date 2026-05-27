function Table({
  headers,
  children,
  title,
  columnWidths = []
}) {
  return (
    <div
      style={{
        backgroundColor: "#f0f0f0",
        padding: "2rem",
        borderRadius: "0.5rem",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        marginBottom: "2rem",
      }}
    >
      {title && (
        <h2
          style={{
            color: "#111827",
            marginBottom: "1rem"
          }}
        >
          {title}
        </h2>
      )}

      <div
        style={{
          overflowX: "auto",
          width: "100%",
        }}
      >
        <table
          style={{
            width: "100%",
            minWidth: "760px",
            tableLayout: "fixed",
            borderCollapse: "collapse",
            marginTop: "1rem"
          }}
        >
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th
                  key={header}
                  style={{
                    border: "1px solid #ccc",
                    padding: "0.5rem",
                    fontSize: "1rem",
                    backgroundColor: "#e0e0e0",
                    textAlign: "left",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    width: columnWidths[index] || "auto"
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {children}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
