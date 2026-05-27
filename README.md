# Booking System Frontend

![React](https://img.shields.io/badge/React-19.x-61DAFB?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=flat&logo=vite)
![Axios](https://img.shields.io/badge/Axios-HTTP-5A29E4?style=flat)
![Zustand](https://img.shields.io/badge/Zustand-State-orange?style=flat)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-Forms-EC5990?style=flat)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

Frontend administrativo para la gestion de reservas, usuarios, barberos y servicios.
Construido con **React, Vite y Axios**, conectado a una REST API dockerizada y protegido mediante autenticacion JWT y control de acceso por roles.

---

## Features

- **Authentication Flow:** Login conectado a la API, persistencia de token y proteccion de rutas privadas.
- **Role Based Access Control:** Acceso administrativo controlado mediante `RoleRoute`.
- **User Management:** Modulo para listar, crear, editar y eliminar usuarios del sistema.
- **Barber Management:** Gestion de barberos con datos asociados al usuario, experiencia y biografia.
- **Service Catalog:** Administracion de servicios, precios, duracion y estado activo/inactivo.
- **Reservation Management:** Creacion, edicion y listado de reservas conectadas a cliente, barbero y servicio.
- **Derived Reservation Data:** Vista previa de precio, duracion y hora de termino sin permitir edicion manual de esos datos.
- **Centralized API Client:** Cliente Axios con `baseURL`, token JWT y normalizacion de errores.
- **Reusable UI Components:** Componentes compartidos para tablas, formularios, botones, inputs, selects, alerts y badges.
- **Responsive Table Behavior:** Tablas con scroll horizontal y acciones compactas para evitar desbordes visuales.

---

## Tech Stack

- **Library:** React
- **Build Tool:** Vite
- **Routing:** React Router
- **Forms:** React Hook Form
- **HTTP Client:** Axios
- **State Management:** Zustand
- **Styles:** CSS / inline component styles
- **Linting:** ESLint

---

## Project Structure

```text
src/
|-- api/               # Cliente Axios e interceptores
|-- assets/            # Imagenes y assets estaticos
|-- components/
|   |-- appointments/  # Formulario, listado y badges de reservas
|   |-- barbers/       # Formulario y listado de barberos
|   |-- common/        # Navbar, sidebar y rutas protegidas
|   |-- services/      # Formulario y listado de servicios
|   |-- ui/            # Componentes UI reutilizables
|   `-- users/         # Formulario y listado de usuarios
|-- layouts/           # Layout principal del dashboard
|-- pages/
|   |-- appointments/  # Pagina de reservas
|   |-- auth/          # Login
|   |-- barbers/       # Pagina de barberos
|   |-- dashboard/     # Dashboard principal
|   |-- services/      # Pagina de servicios
|   `-- users/         # Pagina de usuarios
|-- routes/            # Definicion de rutas de la app
|-- store/             # Store de autenticacion con Zustand
|-- App.jsx
`-- main.jsx
```

---

## Main Modules

**Auth**

- Login de usuarios.
- Persistencia del token en `localStorage`.
- Envio automatico del token en cada request mediante Axios.

**Users**

- Listado de usuarios.
- Creacion y edicion.
- Eliminacion.
- Visualizacion de rol y estado.

**Barbers**

- Listado de barberos.
- Creacion y edicion.
- Eliminacion.
- Asociacion con usuario, experiencia y biografia.

**Services**

- Listado de servicios.
- Creacion y edicion.
- Eliminacion.
- Visualizacion de precio, duracion y estado.

**Reservations / Appointments**

- Listado de reservas.
- Creacion y edicion.
- Seleccion de cliente, barbero y servicio.
- Preview de datos derivados:
  - Precio al reservar.
  - Duracion del servicio.
  - Hora de termino calculada.
- Soporte visual para estados:
  - `SCHEDULED`
  - `COMPLETED`
  - `CANCELLED`
  - `NO_SHOW`

---

## Frontend Routes

| Route | Description | Access |
| --- | --- | --- |
| `/` | Login | Public |
| `/login` | Login | Public |
| `/dashboard` | Main dashboard | Authenticated user |
| `/users` | User management | `ADMIN` |
| `/barbers` | Barber management | `ADMIN` |
| `/services` | Service management | `ADMIN` |
| `/appointments` | Reservation management | `ADMIN` |

---

## Reservation Payload

El frontend envia solo los datos base necesarios para crear o actualizar una reserva.
El backend se encarga de calcular precio, duracion, hora de termino y validar conflictos de horario.

```js
{
  barberId,
  clientId,
  serviceId,
  startTime,
  status,
  notes
}
```

Formato esperado en el listado de reservas:

```js
{
  reservationId,
  startTimeUTC,
  endTimeUTC,
  starTimeLocal,
  endTimeLocal,
  status,
  client: { id, name },
  barber: { id, name },
  service: { id, name },
  notes,
  priceAtBooking,
  createdAt
}
```

---

## Installation

Sigue los pasos mostrados a continuacion para correr el proyecto:

1. **Clone the repository**

    ```bash
    git clone https://github.com/DiegoSalamancaG/booking-system-frontend
    cd booking-system-frontend
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Configure environment variables**

    Crea un archivo `.env` en la raiz del proyecto y agrega la URL base de la API:

    ```bash
    VITE_API_URL=http://localhost:3000/api/v1
    ```

4. **Initialize the App**

    ```bash
    npm run dev
    ```

5. **Build for production**

    ```bash
    npm run build
    ```

---

## Available Scripts

- `npm run dev`: Levanta el entorno de desarrollo con Vite.
- `npm run build`: Genera el build de produccion.
- `npm run lint`: Ejecuta ESLint sobre el proyecto.
- `npm run preview`: Previsualiza el build generado.

---

## Git Workflow

El proyecto utiliza un sistema de dos ramas principales:

- **main:** Codigo estable y probado para produccion.
- **develop:** Rama de desarrollo donde se integran las nuevas funcionalidades.

---

## Future Improvements

- [ ] Mejorar UI responsive para pantallas pequenas.
- [ ] Agregar filtros por fecha, barbero, cliente y estado en reservas.
- [ ] Agregar paginacion visual conectada al `meta` del backend.
- [ ] Implementar tests de componentes y flujos principales.
- [ ] Crear un sistema visual centralizado para estilos y temas.
- [ ] Agregar manejo especifico de estados de carga.
- [x] Modulo de usuarios.
- [x] Modulo de barberos.
- [x] Modulo de servicios.
- [x] Modulo de reservas.
- [x] Autenticacion y rutas protegidas.

---

## Author

- Developed by Diego Salamanca
- Frontend Developer | React | Vite

---

## License

This project is licensed under the MIT License.

---
