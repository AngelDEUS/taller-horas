/* Consultas */
USE inventario_taller_db;


-- USES
SELECT * FROM estado;
SELECT * FROM productos;
SELECT * FROM inventario;
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
JOIN inventario i ON p.id_producto = i.id_producto
GROUP BY i.cantidad DESC;
/*-------------------------------------*/