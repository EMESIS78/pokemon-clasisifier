import { useEffect, useState } from "react";
import { obtenerPokemones, predecirPokemon } from "./api/pokemonApi";

function App() {
  const [pokemones, setPokemones] = useState([]);
  const [seleccionado, setSeleccionado] = useState("");
  const [resultado, setResultado] = useState(null);
  const [mensajeFinal, setMensajeFinal] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await obtenerPokemones();
      setPokemones(data);
    };
    fetchData();
  }, []);

  const handlePredict = async () => {
    if (seleccionado) {
      const resultado = await predecirPokemon(seleccionado);
      setResultado(resultado);

      if (resultado && resultado.recorrido.length > 0) {
        const ultimoNodo = resultado.recorrido[resultado.recorrido.length - 1];
        setMensajeFinal(
          `El Pokémon '${seleccionado}' terminó en el nodo ${ultimoNodo.nodo} basado en el criterio '${ultimoNodo.criterio}'.`
        );
      } else {
        setMensajeFinal("No se pudo determinar el recorrido.");
      }
    }
  };

  return (
    <div style={styles.appContainer}>
      <div style={styles.card}>
        <h1 style={styles.title}>Clasificador de Pokémon</h1>

        <select 
          onChange={(e) => setSeleccionado(e.target.value)} 
          value={seleccionado} 
          style={styles.select}
        >
          <option value="">Selecciona un Pokémon</option>
          {pokemones.map((nombre) => (
            <option key={nombre} value={nombre}>
              {nombre}
            </option>
          ))}
        </select>

        <button onClick={handlePredict} style={styles.button}>
          Predecir
        </button>

        {resultado && (
          <div style={styles.resultContainer}>
            <h2 style={styles.resultTitle}>Resultado:</h2>
            <p><strong>Nombre:</strong> {resultado.nombre}</p>
            <p><strong>Clasificación de Velocidad:</strong> {resultado.clase}</p>
            <p style={styles.message}><strong>{mensajeFinal}</strong></p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  appContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(to right, #74ebd5, #acb6e5)",
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    width: "350px",
  },
  title: {
    color: "#333",
    marginBottom: "15px",
  },
  select: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "10px 15px",
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
    transition: "0.3s",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  resultContainer: {
    marginTop: "20px",
    padding: "10px",
    borderRadius: "5px",
    background: "#f8f9fa",
    boxShadow: "inset 0px 0px 5px rgba(0, 0, 0, 0.1)",
  },
  resultTitle: {
    color: "#007bff",
  },
  message: {
    marginTop: "10px",
    color: "#28a745",
    fontWeight: "bold",
  },
};

export default App;