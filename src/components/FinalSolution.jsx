
/**
 * @fileoverview Componente FinalSolution para mostrar la mejor solución encontrada
 * 
 * Este componente presenta de forma visual la mejor solución encontrada por
 * el algoritmo genético, incluyendo el subconjunto óptimo de números, la aptitud
 * alcanzada y la generación en la que se encontró la solución.
 * 
 * @author Roymar Castillo
 * @author Dilan Zamora
 * 

 * @version 1.0.0
 */

/**
 * Componente FinalSolution para mostrar resultados del algoritmo
 * 
 * Muestra la mejor solución encontrada por el algoritmo genético, incluyendo:
 * - El subconjunto óptimo de números seleccionados
 * - La aptitud (valor de la función objetivo) alcanzada
 * - La generación en la que se encontró esta solución
 * 
 * Si no hay resultados disponibles, muestra un mensaje informativo.
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {Object|null} props.resultado - Objeto con los resultados del algoritmo genético
 * @param {Array<number>} props.resultado.mejorSolucion - Cromosoma de la mejor solución (array binario)
 * @param {number} props.resultado.mejorAptitud - Valor de aptitud de la mejor solución
 * @param {number} props.resultado.generacionMejorSolucion - Generación donde se encontró la mejor solución
 * @param {Array<number>} props.numbers - Array de números originales disponibles
 * @returns {JSX.Element} Panel con la información de la mejor solución o mensaje de estado
 */
function FinalSolution({ resultado, numbers }) {
  // Caso cuando no hay resultados disponibles
  if (!resultado || !resultado.mejorSolucion) {
    return (
      <div>
        <h2 style={{ 
          fontSize: '1.3rem', 
          fontWeight: '600', 
          marginTop: '0', 
          marginBottom: '1rem', 
          color: '#1a1a1a', 
          borderBottom: '2px solid #1a1a1a', 
          paddingBottom: '0.5rem' 
        }}>
          Mejor solución encontrada
        </h2>
        <p style={{ 
          color: '#6b7280', 
          fontStyle: 'italic', 
          fontSize: '0.9rem' 
        }}>
          No se ha encontrado una solución aún.
        </p>
      </div>
    );
  }
  
  // Obtener los datos de la mejor solución
  const { mejorSolucion, mejorAptitud, generacionMejorSolucion } = resultado;
  
  // Convertir el individuo binario al subconjunto con los numeros enteros seleccionados
  const subconjuntoOptimo = numbers.filter((num, idx) => mejorSolucion[idx] === 1);
  
  return (
    <div>
      <h2 style={{ 
        fontSize: '1.3rem', 
        fontWeight: '600', 
        marginTop: '0', 
        marginBottom: '1rem', 
        color: '#1a1a1a', 
        borderBottom: '2px solid #1a1a1a', 
        paddingBottom: '0.5rem' 
      }}>
        Mejor solución encontrada
      </h2>
      
      <div style={{ 
        background: '#f0f9ff', 
        padding: '1rem', 
        borderRadius: '8px', 
        border: '2px solid #60a5fa' 
      }}>
        <p style={{ 
          marginBottom: '0.75rem', 
          fontSize: '0.95rem', 
          color: '#1a1a1a' 
        }}>
          <strong>Subconjunto óptimo:</strong>
        </p>
        
    
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '0.5rem', 
          marginBottom: '1rem' 
        }}>
          {subconjuntoOptimo.map((num, idx) => (
            <span 
              key={idx} 
              style={{ 
                background: '#1a2233', 
                color: '#fff', 
                padding: '0.4rem 0.7rem', 
                borderRadius: '6px', 
                fontSize: '0.95rem', 
                fontWeight: '600' 
              }}
            >
              {num}
            </span>
          ))}
        </div>
        
    
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          gap: '0.75rem' 
        }}>
          <p style={{ 
            marginBottom: '0', 
            fontSize: '0.95rem', 
            color: '#1a1a1a' 
          }}>
            <strong>Aptitud:</strong> 
            <span style={{ 
              color: '#2563eb', 
              fontSize: '1.1rem', 
              fontWeight: '700' 
            }}>
              {mejorAptitud}
            </span>
          </p>
          <p style={{ 
            marginBottom: '0', 
            fontSize: '0.95rem', 
            color: '#1a1a1a' 
          }}>
            <strong>Gen:</strong> 
            <span style={{ 
              color: '#d97706', 
              fontSize: '1.1rem', 
              fontWeight: '700' 
            }}>
              {generacionMejorSolucion}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default FinalSolution;
