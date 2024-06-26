/* Consultas */
USE inventario_taller_db;


-- USES
SELECT * FROM estado;
SELECT * FROM productos;
SELECT * FROM inventario;
SELECT * FROM entrada_productos;
SELECT * FROM salida;

-- verificar el stock de un producto
SELECT p.id_producto, p.nombre_producto, i.cantidad AS "Stock_Existente"
FROM productos p
JOIN inventario i ON p.id_producto = i.id_producto;

-- Lista de inventario
SELECT p.id_producto, p.nombre_producto, p.tipo_producto , concat(p.peso_neto, ' ', p.detalle_peso_neto ) AS 'Peso_Producto', p.precio, i.cantidad AS "Stock"
FROM productos p
JOIN inventario i ON p.id_producto = i.id_producto;

-- <---------- DASHBOARD --------------->
-- Total de stock de productos
SELECT count(*) AS "Productos_Registrados" FROM productos;
-- Total de stock de productos
SELECT SUM(cantidad) AS "Stocks_Existentes" FROM inventario;
-- Total stock bajo
SELECT count(*) AS "Productos_Stock_Bajo"  FROM inventario
where cantidad < 15;
-- Total sin stock
SELECT count(*) AS "Productos_Sin_Stock"  FROM inventario 
where cantidad = 0;
-- ---
-- Productos con mayor stock
SELECT p.id_producto, p.nombre_producto, p.tipo_producto, p.peso_neto, p.detalle_peso_neto, p.precio, i.cantidad AS "Stock_Existente"
FROM productos p
JOIN (
    SELECT id_producto, MAX(cantidad) AS cantidad
    FROM inventario
    GROUP BY id_producto
) i ON p.id_producto = i.id_producto
ORDER BY i.cantidad DESC
LIMIT 5;
-- --------------------------
-- INFORME Entradas
-- SELECT * From entrada_productos;
-- 
SELECT ep.id_entrada, concat(ep.fecha, ' - ', ep.hora ) AS "Fecha_Hora_Entrada", p.id_producto, p.nombre_producto,  ep.cantidad_entrada AS "Cantidad"
FROM entrada_productos ep
JOIN productos p ON ep.id_producto = p.id_producto
ORDER BY id_entrada DESC;
-- INFORME Salidas
-- SELECT * From salida;
-- 
SELECT s.id_salida, concat(s.fecha, ' - ', s.hora ) AS "Fecha_Hora_Salida", s.id_producto, p.nombre_producto, s.cantidad_salida, s.descripcion
FROM salida s
JOIN productos p ON s.id_producto = p.id_producto
ORDER BY s.id_salida DESC;
/*-------------------------------------*/