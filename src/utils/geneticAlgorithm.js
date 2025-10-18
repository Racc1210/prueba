
/**
 * @fileoverview Implementación del Algoritmo Genético para optimización de subconjuntos
 * 
 * Este módulo contiene la implementación completa de un algoritmo genético diseñado
 * para resolver el problema de la mochila simplificado El objetivo es encontrar el subconjunto
 *  de números que maximice la suma sin exceder un límite establecido.
 * 
 * El algoritmo utiliza:
 * - Representación binaria (cromosomas de 0s y 1s)
 * - Selección por torneo
 * - Cruzamiento de un punto
 * - Mutación bit-flip
 * 
 * @author Roymar Castillo
 * @author Dilan Zamora
 * 
 * @version 1.0.0
 */

/**
 * Genera una población inicial aleatoria para el algoritmo genético
 * 
 * Cada individuo es representado como un array binario donde cada posición
 * indica si el número correspondiente está incluido (1) o no (0) en el subconjunto.
 * 
 * @function
 * @param {number} tamanoPoblacion - Número de individuos en la población
 * @param {number} cantidadNumeros - Longitud del cromosoma (cantidad de números disponibles)
 * @returns {Array<Array<number>>} Población inicial con individuos binarios aleatorios
 */
function generarPoblacionInicial(tamanoPoblacion, cantidadNumeros) {
  const poblacion = [];
  for (let i = 0; i < tamanoPoblacion; i++) {
    const individuo = [];
    for (let j = 0; j < cantidadNumeros; j++) {
      individuo.push(Math.random() < 0.5 ? 0 : 1);
    }
    poblacion.push(individuo);
  }
  return poblacion;
}

/**
 * Calcula la suma total de los números seleccionados por un individuo
 * 
 * Recorre el cromosoma binario y suma los números correspondientes
 * a las posiciones que tienen valor 1.
 * 
 * @function
 * @param {Array<number>} individuo - Cromosoma binario del individuo
 * @param {Array<number>} numeros - Array de números disponibles
 * @returns {number} Suma total de los números seleccionados
 */
function calcularSuma(individuo, numeros) {
  let suma = 0;
  for (let i = 0; i < individuo.length; i++) {
    if (individuo[i] === 1) {
      suma = suma + numeros[i];
    }
  }
  return suma;
}

/**
 * Calcula la aptitud (fitness) de un individuo
 * 
 * La aptitud es igual a la suma de los números seleccionados si no excede
 * el límite, o 0 si lo excede (penalización por infactibilidad).
 * 
 * @function
 * @param {Array<number>} individuo - Cromosoma binario del individuo
 * @param {Array<number>} numeros - Array de números disponibles
 * @param {number} limite - Límite superior que no debe ser excedido
 * @returns {number} Valor de aptitud del individuo
 */
function calcularAptitud(individuo, numeros, limite) {
  const suma = calcularSuma(individuo, numeros);
  if (suma > limite) {
    return 0; // Penalización por exceder el límite
  }
  return suma;
}

/**
 * Selecciona un individuo mediante selección por torneo
 * 
 * Elige dos individuos aleatorios y retorna el que tenga mayor aptitud.
 * Este método mantiene diversidad mientras favorece a los mejores individuos.
 * 
 * @function
 * @param {Array<Array<number>>} poblacion - Población actual de individuos
 * @param {Array<number>} aptitudes - Array con las aptitudes correspondientes
 * @returns {Array<number>} Individuo seleccionado como padre
 */
function seleccionTorneo(poblacion, aptitudes) {
  const indice1 = Math.floor(Math.random() * poblacion.length);
  const indice2 = Math.floor(Math.random() * poblacion.length);
  if (aptitudes[indice1] > aptitudes[indice2]) {
    return poblacion[indice1];
  } else {
    return poblacion[indice2];
  }
}

/**
 * Realiza el cruzamiento entre dos padres
 * 
 * Utiliza cruzamiento de un punto: selecciona un punto de corte aleatorio
 * e intercambia las secciones de los cromosomas para generar dos hijos.
 * 
 * @function
 * @param {Array<number>} padre1 - Primer padre para el cruzamiento
 * @param {Array<number>} padre2 - Segundo padre para el cruzamiento
 * @returns {Array<Array<number>>} Array con los dos hijos generados
 */
function cruzar(padre1, padre2) {
  const puntoCorte = Math.floor(Math.random() * padre1.length);
  const hijo1 = [];
  const hijo2 = [];
  for (let i = 0; i < padre1.length; i++) {
    if (i < puntoCorte) {
      hijo1.push(padre1[i]);
      hijo2.push(padre2[i]);
    } else {
      hijo1.push(padre2[i]);
      hijo2.push(padre1[i]);
    }
  }
  return [hijo1, hijo2];
}

/**
 * Aplica mutación a un individuo
 * 
 * Utiliza mutación bit-flip: cada bit tiene una probabilidad de cambiar
 * su valor (de 0 a 1 o de 1 a 0). Esto introduce diversidad genética en la población.
 * 
 * @function
 * @param {Array<number>} individuo - Individuo a mutar
 * @param {number} probabilidadMutacion - Probabilidad de mutación por bit (0-1)
 * @returns {Array<number>} Individuo mutado
 */
function mutar(individuo, probabilidadMutacion) {
  const individuoMutado = [];
  for (let i = 0; i < individuo.length; i++) {
    if (Math.random() < probabilidadMutacion) {
      individuoMutado.push(individuo[i] === 0 ? 1 : 0);
    } else {
      individuoMutado.push(individuo[i]);
    }
  }
  return individuoMutado;
}

/**
 * Ejecuta el algoritmo genético completo para optimización de subconjuntos
 * 
 * Esta es la función principal que orquesta todo el proceso evolutivo:
 * 1. Genera la población inicial
 * 2. Evalúa la aptitud de todos los individuos
 * 3. Selecciona padres, cruza y muta para crear nueva generación
 * 4. Mantiene el elitismo (preserva el mejor individuo)
 * 5. Repite el proceso por el número especificado de generaciones
 * 
 * @function
 * @param {Array<number>} numeros - Array de números disponibles para seleccionar
 * @param {number} limite - Límite superior que no debe ser excedido por la suma
 * @param {number} [tamanoPoblacion=10] - Número de individuos por generación
 * @param {number} [numeroGeneraciones=100] - Número de generaciones a evolucionar
 * @returns {Object} Objeto con los resultados del algoritmo
 * @returns {Array} returns.generaciones - Historial detallado de cada generación
 * @returns {Array<number>} returns.mejorSolucion - Mejor cromosoma encontrado
 * @returns {number} returns.generacionMejorSolucion - Generación donde se encontró la mejor solución
 * @returns {number} returns.mejorAptitud - Mejor aptitud alcanzada
 */
export function runGeneticAlgorithm(numeros, limite, tamanoPoblacion = 10, numeroGeneraciones = 100) {
  const resultados = {
    generaciones: [],
    mejorSolucion: null,
    generacionMejorSolucion: 0,
    mejorAptitud: 0
  };
  
  // Generar población inicial aleatoria
  let poblacion = generarPoblacionInicial(tamanoPoblacion, numeros.length);
  
  // Evolucionar por el número especificado de generaciones
  for (let generacion = 1; generacion <= numeroGeneraciones; generacion++) {
    // Evaluar aptitud de toda la población
    const aptitudes = [];
    for (let i = 0; i < poblacion.length; i++) {
      const aptitud = calcularAptitud(poblacion[i], numeros, limite);
      aptitudes.push(aptitud);
    }
    
    // Encontrar el mejor individuo de esta generación
    let mejorIndiceGeneracion = 0;
    for (let i = 1; i < aptitudes.length; i++) {
      if (aptitudes[i] > aptitudes[mejorIndiceGeneracion]) {
        mejorIndiceGeneracion = i;
      }
    }
    
    const mejorIndividuoGeneracion = poblacion[mejorIndiceGeneracion];
    const mejorAptitudGeneracion = aptitudes[mejorIndiceGeneracion];
    const sumaGeneracion = calcularSuma(mejorIndividuoGeneracion, numeros);
    
    // Guardar información detallada de la generación
    resultados.generaciones.push({
      numero: generacion,
      mejorAptitud: mejorAptitudGeneracion,
      mejorSuma: sumaGeneracion,
      mejorIndividuo: mejorIndividuoGeneracion.slice(),
      individuos: poblacion.map((ind, idx) => ({
        cromosoma: ind.slice(),
        aptitud: aptitudes[idx],
        subconjunto: ind.map((bit, i) => bit === 1 ? numeros[i] : null).filter(x => x !== null)
      }))
    });
    
    // Actualizar el mejor resultado global si es necesario
    if (mejorAptitudGeneracion > resultados.mejorAptitud) {
      resultados.mejorAptitud = mejorAptitudGeneracion;
      resultados.mejorSolucion = mejorIndividuoGeneracion.slice();
      resultados.generacionMejorSolucion = generacion;
    }

    // Crear nueva generación mediante selección, cruzamiento y mutación
    const nuevaPoblacion = [];
    
    // Elitismo: preservar el mejor individuo
    nuevaPoblacion.push(mejorIndividuoGeneracion.slice());
    
    // Generar el resto de la población
    while (nuevaPoblacion.length < tamanoPoblacion) {
      const padre1 = seleccionTorneo(poblacion, aptitudes);
      const padre2 = seleccionTorneo(poblacion, aptitudes);
      const hijos = cruzar(padre1, padre2);
      const hijo1Mutado = mutar(hijos[0], 0.1); // 10% probabilidad de mutación
      const hijo2Mutado = mutar(hijos[1], 0.1);
      
      nuevaPoblacion.push(hijo1Mutado);
      if (nuevaPoblacion.length < tamanoPoblacion) {
        nuevaPoblacion.push(hijo2Mutado);
      }
    }
    poblacion = nuevaPoblacion;
  }
  
  return resultados;
}
