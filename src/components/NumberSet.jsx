/**
 * @fileoverview Componente NumberSet para mostrar el conjunto de números generados
 * 
 * Este componente muestra de forma visual el conjunto de números aleatorios
 * que serán utilizados por el algoritmo genético para la optimización.
 * 
 * @author Roymar Castillo
 * @author Dilan Zamora
 * @version 1.0.0
 */

/**
 * Componente NumberSet para visualizar números generados
 * 
 * Renderiza el conjunto de números aleatorios generados para el algoritmo
 * genético. 
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {Array<number>} props.numbers - Array de números enteros a mostrar
 * @returns {JSX.Element} Contenedor con el título y la lista de números
 */
function NumberSet({ numbers }) {
  return (
    <div style={{ marginTop: '1.5rem' }}>
      <h3 style={{ 
        fontSize: '1.15rem', 
        fontWeight: '600', 
        marginBottom: '1rem', 
        color: '#2d3a4a' 
      }}>
        Conjunto de números generados
      </h3>
      <div className="number-set">
        {numbers.length === 0 ? (
          <p style={{ 
            color: '#6b7280', 
            fontStyle: 'italic' 
          }}>
            No hay números generados aún.
          </p>
        ) : (
          numbers.map((num, index) => (
            <span key={index}>{num}</span>
          ))
        )}
      </div>
    </div>
  );
}

export default NumberSet;
