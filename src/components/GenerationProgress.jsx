/**
 * @fileoverview Componente GenerationProgress para visualizar el progreso del algoritmo genético
 * 
 * Este componente muestra las generaciones y sus respectivos individuos.
 * Permite navegar entre generaciones y visualizar
 * la información detallada de cada individuo en la población, incluyendo sus
 * aptitudes y subconjuntos seleccionados.
 * 
 * Características principales:
 * - Navegación tipo carrusel entre generaciones
 * - Destacado visual del mejor individuo de cada generación

 * 
 * @author Roymar Castillo
 * @author Dilan Zamora
 * 
 * @version 1.0.0
 */

import { useState } from 'react';

/**
 * Componente GenerationProgress para mostrar el progreso evolutivo
 * 
 * Muestra información detallada de cada generación del algoritmo genético,
 * incluyendo todos los individuos de la población, sus aptitudes y los
 * subconjuntos que representan.
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {Array<Object>} props.generaciones - Array con la información de cada generación
 * @param {number} props.generaciones[].numero - Número de la generación
 * @param {number} props.generaciones[].mejorAptitud - Mejor aptitud de la generación
 * @param {number} props.generaciones[].mejorSuma - Suma del mejor individuo
 * @param {Array<Object>} props.generaciones[].individuos - Array de individuos en la generación
 * @param {Array<number>} props.generaciones[].individuos[].cromosoma - Representación binaria del individuo
 * @param {number} props.generaciones[].individuos[].aptitud - Aptitud del individuo
 * @param {Array<number>} props.generaciones[].individuos[].subconjunto - Números seleccionados por el individuo
 * @returns {JSX.Element} Panel interactivo con el progreso de generaciones
 */
function GenerationProgress({ generaciones }) {
  /** @type {[number, Function]} Índice de la generación actualmente mostrada */
  const [currentGenIndex, setCurrentGenIndex] = useState(0);

  // Mostrar mensaje informativo cuando no hay datos disponibles
  if (!generaciones || generaciones.length === 0) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100%',
        color: '#e0e6f0',
        fontStyle: 'italic',
        fontSize: '1rem'
      }}>
        Aquí se mostrará el progreso de generaciones
      </div>
    );
  }

  // Obtener los datos de la generación actual
  const gen = generaciones[currentGenIndex];

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      padding: '0.75rem',
      gap: '0.5rem'
    }}>
      

      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        background: '#0d1320', 
        padding: '0.5rem 0.75rem', 
        borderRadius: '6px',
        flexShrink: 0
      }}>
        <button 
          onClick={() => setCurrentGenIndex(Math.max(0, currentGenIndex - 1))}
          disabled={currentGenIndex === 0}
          style={{ 
            padding: '0.4rem 0.8rem', 
            background: currentGenIndex === 0 ? '#374151' : '#60a5fa', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '4px',
            fontSize: '0.8rem',
            cursor: currentGenIndex === 0 ? 'not-allowed' : 'pointer'
          }}
        >
          ◀
        </button>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1rem', fontWeight: '700', color: '#60a5fa' }}>
            Gen {gen.numero} / {generaciones.length}
          </div>
          <div style={{ fontSize: '0.85rem', color: '#fbbf24', marginTop: '0.2rem' }}>
            Apt: {gen.mejorAptitud} | Suma: {gen.mejorSuma}
          </div>
        </div>
        
        <button 
          onClick={() => setCurrentGenIndex(Math.min(generaciones.length - 1, currentGenIndex + 1))}
          disabled={currentGenIndex === generaciones.length - 1}
          style={{ 
            padding: '0.4rem 0.8rem', 
            background: currentGenIndex === generaciones.length - 1 ? '#374151' : '#60a5fa', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '4px',
            fontSize: '0.8rem',
            cursor: currentGenIndex === generaciones.length - 1 ? 'not-allowed' : 'pointer'
          }}
        >
          ▶
        </button>
      </div>

    
      <div style={{ 
        background: '#0d1320', 
        borderRadius: '6px', 
        padding: '0.5rem',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ 
          fontSize: '0.9rem', 
          color: '#e0e6f0', 
          marginBottom: '0.5rem',
          textAlign: 'center',
          flexShrink: 0
        }}>
          Población ({gen.individuos.length} individuos)
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr', 
          gap: '0.4rem',
          width: '100%',
          maxHeight: gen.individuos.length > 10 ? '400px' : 'none',
          overflowY: gen.individuos.length > 10 ? 'auto' : 'visible'
        }}>
          {gen.individuos.map((ind, i) => (
            <div 
              key={i} 
              style={{ 
                padding: '0.4rem', 
                borderRadius: '4px', 
                background: ind.aptitud === gen.mejorAptitud ? '#1e3a1f' : '#1e293b',
                border: ind.aptitud === gen.mejorAptitud ? '1px solid #4ade80' : '1px solid #374151',
                fontSize: '0.7rem',
                lineHeight: '1.2'
              }}
            >
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginBottom: '-0.1rem',
                color: ind.aptitud === gen.mejorAptitud ? '#4ade80' : '#e0e6f0'
              }}>
                <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>
                  Ind {i + 1}{ind.aptitud === gen.mejorAptitud && ' ⭐'}
                </span>
                <span style={{ color: ind.aptitud === gen.mejorAptitud ? '#4ade80' : '#60a5fa', fontSize: '0.9rem' }}>
                  Apt: {ind.aptitud}
                </span>
              </div>
              <div style={{ 
                color: ind.aptitud === gen.mejorAptitud ? '#86efac' : '#cbd5e1',
                fontSize: '0.8rem'
              }}>
                [{ind.subconjunto.join(', ')}]
              </div>
            </div>
          ))}
        </div>
      </div>

    
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '0.2rem',
        flexShrink: 0,
        padding: '0.3rem'
      }}>
        {generaciones.slice(0, 20).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentGenIndex(idx)}
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: idx === currentGenIndex ? '#60a5fa' : '#374151',
              border: 'none',
              cursor: 'pointer',
              padding: 0
            }}
          />
        ))}
        {generaciones.length > 20 && (
          <span style={{ fontSize: '0.6rem', color: '#9ca3af', marginLeft: '0.2rem' }}>
            +{generaciones.length - 20}
          </span>
        )}
      </div>
    </div>
  );
}

export default GenerationProgress;
