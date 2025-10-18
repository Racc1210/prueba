/**
 * @fileoverview Componente Header de la aplicación
 * 
 * Componente que muestra el título principal y subtítulo de la aplicación.
 * 
 * @author Roymar Castillo
 * @author Dilan Zamora
 * 
 * @version 1.0.0
 */

/**
 * Componente Header que muestra el título de la aplicación
 * 
 * El estilo visual
 * es controlado por CSS externo.
 * 
 * @component
 * @returns {JSX.Element} Header con título y subtítulo de la aplicación
 */
function Header() {
  return (
    <header>
      <h1>Algoritmo Genético</h1>
      <p>Optimización de subconjuntos con React</p>
    </header>
  );
}

export default Header;
