import React from "react";
import ReactFlow, { MiniMap, Controls, Background } from "reactflow";
import "reactflow/dist/style.css";



const ArbolDecision = ({ nodoRaiz }) => {
    if (!nodoRaiz) {
        console.error("❌ Error: nodoRaiz es NULL o UNDEFINED.");
        return <p>No hay árbol para mostrar.</p>;
    }
    console.log("✅ nodoRaiz recibido:", nodoRaiz);

    // 🔹 Función recursiva para construir los nodos y conexiones
    const construirGrafo = (nodo, x = 0, y = 0, nodes = [], edges = []) => {
        if (!nodo || nodo.nodo === undefined) { // Verificar nodo.nodo en lugar de nodo.id
            console.warn("⚠️ Nodo inválido encontrado:", nodo);
            return;
        }

        // Agregar nodo al array de nodos
        nodes.push({
            id: nodo.nodo.toString(),  // Usar nodo.nodo en lugar de nodo.id
            data: { label: `${nodo.criterio || "Nodo Final"}` },
            position: { x, y },
        });

        // Si hay nodo izquierdo, agregarlo y conectar
        if (nodo.izquierda) {
            edges.push({
                id: `e${nodo.nodo}-${nodo.izquierda.nodo}`,
                source: nodo.nodo.toString(),
                target: nodo.izquierda.nodo.toString(),
                label: `<= ${nodo.umbral}`,
            });
            construirGrafo(nodo.izquierda, x - 100, y + 100, nodes, edges);
        }

        // Si hay nodo derecho, agregarlo y conectar
        if (nodo.derecha) {
            edges.push({
                id: `e${nodo.nodo}-${nodo.derecha.nodo}`,
                source: nodo.nodo.toString(),
                target: nodo.derecha.nodo.toString(),
                label: `> ${nodo.umbral}`,
            });
            construirGrafo(nodo.derecha, x + 100, y + 100, nodes, edges);
        }

        return { nodes, edges };
    };

    // Generar los nodos y conexiones
    const { nodes, edges } = construirGrafo(nodoRaiz);

    return (
        <div style={{ width: "100%", height: "500px", border: "1px solid #ccc" }}>
            <ReactFlow nodes={nodes} edges={edges}>
                <MiniMap />
                <Controls />
                <Background />
            </ReactFlow>
        </div>
    );
};

export default ArbolDecision;