/* Base de datos para el taller de inventario */
CREATE DATABASE inventario_taller_db;
USE inventario_taller_db;

-- DROP DATABASE inventario_taller_db;

-- 1 -- Tabla de estados
CREATE TABLE estado (
    id_estado INT AUTO_INCREMENT PRIMARY KEY,
    nombre_estado VARCHAR(30) NOT NULL
);

-- 2 -- Tabla de productos
CREATE TABLE productos (
    id_producto VARCHAR(10) PRIMARY KEY,
    nombre_producto VARCHAR(255) NOT NULL,
    tipo_producto VARCHAR(255) NOT NULL,
    peso_neto DECIMAL(10, 2) NOT NULL,
    detalle_peso_neto VARCHAR(45) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    id_estado INT,
    FOREIGN KEY (id_estado) REFERENCES estado(id_estado)
);

-- 3 -- Tabla de inventario
CREATE TABLE inventario (
    id_inventario INT AUTO_INCREMENT PRIMARY KEY,
    id_producto VARCHAR(10),
    cantidad INT NOT NULL,
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

-- 4 -- Tabla de salida
CREATE TABLE salida (
    id_salida INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    id_producto VARCHAR(10),
    descripcion TEXT NOT NULL,
    cantidad_salida INT NOT NULL,
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

-- Inserts 

INSERT INTO estado (nombre_estado) VALUES ('Inactivo'), ('Activo'), ('Dañado');

INSERT INTO productos (id_producto, nombre_producto, tipo_producto, peso_neto, detalle_peso_neto, precio, id_estado) 
VALUES 
('ARR-001','Arroz', 'Alimento', 1.0, 'kg', 2500, 1),
('LEC-001','Leche', 'Bebida', 1.0, 'L', 3200, 1),
('AZU-001','Azúcar', 'Alimento', 0.5, 'kg', 1800, 1),
('HAR-001','Harina', 'Alimento', 1.0, 'kg', 2300, 1),
('ACE-001','Aceite', 'Bebida', 1.0, 'L', 8000, 1),
('SAL-001','Sal', 'Condimento', 0.5, 'kg', 1200, 1),
('CAF-001','Café', 'Bebida', 0.25, 'kg', 10000, 1),
('HUE-001','Huevos', 'Alimento', 0.6, 'kg', 7000, 1),
('POL-001','Pollo', 'Carne', 1.5, 'kg', 9500, 1),
('PAN-001','Pan', 'Alimento', 0.5, 'kg', 1500, 1);



INSERT INTO inventario (id_producto, cantidad) 
VALUES 
('ARR-001', 100),
('LEC-001', 12),
('AZU-001', 39),
('HAR-001', 50),
('ACE-001', 10),
('SAL-001', 100),
('CAF-001', 200),
('HUE-001', 70),
('POL-001', 42),
('PAN-001', 57); 

INSERT INTO salida (fecha, hora, id_producto, descripcion, cantidad_salida)
VALUES 
('2024-06-20', '10:30:00', 'HAR-001', 'Producto dañado', 5);

-- USES
SELECT * FROM estado;
SELECT * FROM productos;
SELECT * FROM inventario;
SELECT * FROM salida;

-- verificar el stock de un producto
SELECT p.id_producto, p.nombre_producto,  p.peso_neto, p.detalle_peso_neto, i.cantidad
FROM productos p
JOIN inventario i ON p.id_producto = i.id_producto
	

