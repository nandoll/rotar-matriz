# Rotación de Matriz - Aplicación Next.js

Esta aplicación rota matrices cuadradas de NxN en sentido anti-horario (90 grados). Desarrollada con Next.js 15 y TypeScript.

## Características

- Rotación de matrices cuadradas NxN en sentido anti-horario (90 grados)
- Validación de entrada para matrices válidas
- Manejo de errores
- Soporte para matrices de cualquier dimensión NxN (2x2, 3x3, 4x4, etc.)
- Interfaz de usuario intuitiva para ingresar y visualizar matrices

## Demostración

### Ejemplos de Rotación

**Matriz 2x2:**

```
Input: [[1,2], [3,4]]
Output: [[2,4], [1,3]]
```

**Matriz 3x3:**

```
Input: [[1,2,3], [4,5,6], [7,8,9]]
Output: [[3,6,9], [2,5,8], [1,4,7]]
```

## Pruebas Unitarias

El proyecto incluye pruebas unitarias para verificar el correcto funcionamiento del algoritmo de rotación:

```bash
npm run test
# o
yarn test
```

Las pruebas incluyen:

- Rotación de matrices 2x2
- Rotación de matrices 3x3
- Manejo de matrices vacías
- Validación de matrices no cuadradas

## Tecnologías Utilizadas

- **Next.js 15**: Framework de React
- **TypeScript**: Tipado para JavaScript
- **TailwindCSS**: Framework CSS
- **Jest**: Framework de pruebas
- **React Testing Library**: Utilidades para pruebas de componentes React
