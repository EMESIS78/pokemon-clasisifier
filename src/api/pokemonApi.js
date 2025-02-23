import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export const obtenerPokemones = async () => {
  try {
    const response = await axios.get(`${API_URL}/pokemones_disponibles`);
    return response.data.pokemones_disponibles;
  } catch (error) {
    console.error("Error obteniendo la lista de Pokémon:", error);
    return [];
  }
};

export const predecirPokemon = async (nombre) => {
  try {
    const response = await axios.post(`${API_URL}/predict`, { nombre });
    return response.data;
  } catch (error) {
    console.error("Error al predecir Pokémon:", error);
    return null;
  }
};