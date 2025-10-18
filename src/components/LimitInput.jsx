/**
 * @fileoverview Componente LimitInput para configurar el límite del algoritmo
 * 
 * Este componente permite al usuario establecer el valor límite superior (L)
 * que el algoritmo genético utilizará como restricción para la optimización
 * de subconjuntos.
 * 
 * @author Roymar Castillo
 * @author Dilan Zamora
 * 
 * @version 1.0.0
 */

import { useState } from 'react';

/**
 * Componente LimitInput para entrada del valor límite
 * 
 * Renderiza un campo de entrada numérico que permite al usuario establecer
 * el límite superior para el problema de optimización.
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {Function} props.onLimitChange - Función callback que se ejecuta cuando cambia el límite
 * @returns {JSX.Element} Input numérico con label para el valor límite
 */
function LimitInput({ onLimitChange, onPopulationChange, onGenerationsChange, onCantidadNumerosChange }) {
  // Estado local para los cuatro inputs
  const [limit, setLimit] = useState('');
  const [population, setPopulation] = useState(10);
  const [generations, setGenerations] = useState(100);
  const [cantidadNumeros, setCantidadNumeros] = useState(15);

  // Maneja el cambio de valor en el input de límite
  const handleLimitChange = (e) => {
    const value = parseInt(e.target.value);
    setLimit(value);
    onLimitChange(value);
  };

  // Maneja el cambio de valor en el input de población
  const handlePopulationChange = (e) => {
    const value = parseInt(e.target.value);
    setPopulation(value);
    onPopulationChange(value);
  };

  // Maneja el cambio de valor en el input de generaciones
  const handleGenerationsChange = (e) => {
    const value = parseInt(e.target.value);
    setGenerations(value);
    onGenerationsChange(value);
  };

  // Maneja el cambio de valor en el input de cantidad de números
  const handleCantidadNumerosChange = (e) => {
    const value = parseInt(e.target.value);
    setCantidadNumeros(value);
    onCantidadNumerosChange(value);
  };

  return (
    <div style={{ 
      marginBottom: '0.75rem',
      display: 'grid',
      gridTemplateColumns: 'auto 1fr auto 1fr',
      gap: '0.4rem',
      alignItems: 'center',
      fontSize: '0.85rem'
    }}>
      <label htmlFor="limit" style={{ fontSize: '0.85rem', marginRight: '0.25rem' }}>Límite:</label>
      <input
        type="number"
        id="limit"
        value={limit}
        onChange={handleLimitChange}
        placeholder="L"
        min="1"
        style={{ width: '100%', fontSize: '0.85rem', padding: '0.3rem' }}
      />
      
      <label htmlFor="population" style={{ fontSize: '0.85rem', marginRight: '0.25rem' }}>Población:</label>
      <input
        type="number"
        id="population"
        value={population}
        onChange={handlePopulationChange}
        min="2"
        max="100"
        style={{ width: '100%', fontSize: '0.85rem', padding: '0.3rem' }}
      />
      
      <label htmlFor="cantidadNumeros" style={{ fontSize: '0.85rem', marginRight: '0.25rem' }}>Cant. números:</label>
      <input
        type="number"
        id="cantidadNumeros"
        value={cantidadNumeros}
        onChange={handleCantidadNumerosChange}
        min="2"
        max="50"
        style={{ width: '100%', fontSize: '0.85rem', padding: '0.3rem' }}
      />
      
      <label htmlFor="generations" style={{ fontSize: '0.85rem', marginRight: '0.25rem' }}>Generaciones:</label>
      <input
        type="number"
        id="generations"
        value={generations}
        onChange={handleGenerationsChange}
        min="1"
        max="1000"
        style={{ width: '100%', fontSize: '0.85rem', padding: '0.3rem' }}
      />
    </div>
  );
}

export default LimitInput;
