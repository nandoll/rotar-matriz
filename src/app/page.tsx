// "use client"; // No necesitamos "use client" para este simple HMTL

// NO importes ningún componente personalizado para esta prueba
// (No MatrixBackground, no hooks, no MatrixToggle)

export default function Home() {
  return (
    <div
      style={{
        padding: "50px",
        color: "white",
        backgroundColor: "black",
        minHeight: "100vh",
      }}
    >
      <h1>Prueba de Despliegue Vercel</h1>
      <p>
        Si puedes ver esto, la configuración base de Next.js y el despliegue en
        Vercel funcionan.
      </p>
    </div>
  );
}
