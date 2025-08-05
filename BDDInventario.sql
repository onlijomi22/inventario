--BDD InventarioDB
CREATE DATABASE InventarioDb;
USE InventarioDb;

CREATE TABLE Productos (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Nombre NVARCHAR(100) NOT NULL,
    Descripcion NVARCHAR(250),
    Categoria NVARCHAR(100),
    Imagen NVARCHAR(MAX),
    Precio DECIMAL(18,2) NOT NULL,
    Stock INT NOT NULL
);




CREATE DATABASE TransaccionesDb;
USE TransaccionesDb;

CREATE TABLE Transacciones (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Fecha DATETIME2 NOT NULL DEFAULT GETDATE(),
    Tipo NVARCHAR(10) NOT NULL,
    ProductoId INT NOT NULL,
    Cantidad INT NOT NULL,
    PrecioUnitario DECIMAL(18,2) NOT NULL,
    PrecioTotal AS (Cantidad * PrecioUnitario) PERSISTED,
    Detalle NVARCHAR(250)
);
