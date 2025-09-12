# Estructura de Tests

Esta es la nueva estructura de tests organizada por funcionalidad:

## 📁 Estructura de Directorios

```
src/
├── components/
│   └── __tests__/              # Tests de componentes globales
│       ├── MatrixBackground.test.tsx
│       ├── MatrixRainEffect.test.tsx
│       └── MatrixToggle.test.tsx
├── features/
│   └── matrix/
│       ├── __tests__/          # Tests específicos del feature matrix
│       │   └── matrixService.test.js
│       ├── components/
│       │   └── __tests__/      # Tests de componentes
│       │       ├── EnhancedMatrixInput.test.tsx
│       │       ├── MatrixHistory.test.tsx
│       │       └── AnimatedMatrixVisualization.test.tsx
│       └── hooks/
│           └── __tests__/      # Tests de hooks
│               └── useMatrixRotationWithHistory.test.tsx
└── __tests__/                  # Tests de integración/e2e (futuro)
    └── README.md
```

## 🎯 Ventajas de esta Estructura

1. **Cohesión**: Los tests están cerca del código que prueban
2. **Mantenibilidad**: Es más fácil encontrar y actualizar tests
3. **Escalabilidad**: Cada feature puede tener sus propios tests
4. **Estándar Next.js**: Sigue las mejores prácticas recomendadas

## 🧪 Tipos de Tests

### Tests de Componentes (`src/components/__tests__/`)

- Tests de componentes reutilizables
- Tests de UI y comportamiento
- Tests de props y estados

### Tests de Features (`src/features/*/__tests__/`)

- Tests específicos de cada funcionalidad
- Tests de servicios y hooks
- Tests de lógica de negocio

### Tests de Hooks (`src/features/*/hooks/__tests__/`)

- Tests de hooks personalizados
- Tests de estado y efectos
- Tests de lógica de componentes

### Tests de Componentes (`src/features/*/components/__tests__/`)

- Tests de componentes de UI
- Tests de interacciones del usuario
- Tests de props y estados

### Tests de Integración (`src/__tests__/`)

- Tests end-to-end
- Tests de integración entre features
- Tests de flujos completos

## 🚀 Ejecutar Tests

```bash
# Todos los tests
npm test

# Tests específicos
npm test -- MatrixToggle

# Tests con coverage
npm test -- --coverage

# Tests en modo watch
npm test -- --watch
```

## 📝 Convenciones

- **Naming**: `*.test.tsx` para componentes, `*.test.js` para servicios
- **Ubicación**: Cada test en el directorio `__tests__` de su módulo
- **Imports**: Usar rutas absolutas con `@/` cuando sea posible
- **Mocks**: Colocar mocks cerca de los tests que los usan
