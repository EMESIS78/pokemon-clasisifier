class NodoDecision {
    constructor(nodo, criterio, umbral, izquierda = null, derecha = null) {
      this.nodo = nodo;        // ID del nodo
      this.criterio = criterio; // Criterio de decisión (Ej: "Ataque", "Velocidad")
      this.umbral = umbral;     // Valor de comparación
      this.izquierda = izquierda; // Nodo hijo izquierdo (menor que umbral)
      this.derecha = derecha;     // Nodo hijo derecho (mayor o igual que umbral)
    }
  }
  
  export default NodoDecision;