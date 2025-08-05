# Inventario - Gestión de Productos y Transacciones

Aplicación web de inventario con arquitectura de microservicios en .NET Core y Angular.  
Permite crear, editar, eliminar y consultar productos y transacciones de inventario con filtros avanzados.

---

## 🧰 Requisitos

- .NET SDK 7 o superior
- Node.js v18 o superior
- Angular CLI
- SQL Server 
- Visual Studio Code o Visual Studio 2022+

---

## creacion bdd
CREATE DATABASE InventarioDb;
CREATE DATABASE TransaccionesDb;



## ⚙️ Ejecución del Backend

Cada microservicio es un proyecto independiente en .NET Core.

### 1. ProductoService

Ubicación: `ProductoService`

**Pasos:**

cd ProductoService
dotnet restore
dotnet ef database update
dotnet run

Ubicación: `TransaccionService`

cd TransaccionService
dotnet restore
dotnet ef database update
dotnet run


##ejecucion frontend

cd inventario-app
npm install
ng serve




