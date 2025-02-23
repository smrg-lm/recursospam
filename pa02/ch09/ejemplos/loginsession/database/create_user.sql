-- Crear la tabla para usuario si no existe en la base de datos.
-- El hash de bcryt es de 60 caracteres.

CREATE TABLE IF NOT EXISTS users
(
    username varchar(255) NOT NULL UNIQUE,
    email varchar(255) NOT NULL,
    hash varchar(255) NOT NULL
)
