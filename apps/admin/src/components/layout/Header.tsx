export default function Header() {
  return (
    <header
      style={{
        height: "64px",
        background: "#111827",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        borderBottom: "1px solid #1f2937",
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: 22,
        }}
      >
        SYNERQO ERP
      </h2>

      <div
        style={{
          display: "flex",
          gap: 20,
          alignItems: "center",
        }}
      >
        <span>🔔</span>

        <span>👤 Admin</span>
      </div>
    </header>
  );
}