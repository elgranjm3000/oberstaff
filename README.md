<p align="center">
    <a href="https://github.com/yiisoft" target="_blank">
        <img src="https://avatars0.githubusercontent.com/u/993323" height="100px">
    </a>
    <h1 align="center">Yii 2 Proyecto Prueba</h1>
    <br>
</p>

# 🛠 Instrucciones de Instalación del Proyecto

## 📋 Requisitos

- PHP 8.0 o superior
- Node.js 18
- MySQL
- Composer
- Yarn

## 🔁 1. Clonar el repositorio

```bash
git clone https://github.com/usuario/repositorio.git
```

## 📂 2. Ingresar al directorio del proyecto y ejecutar Composer

```bash
cd nombre_del_proyecto
composer install
# o si prefieres actualizar dependencias
composer update
```

## ⚙️ 3. Configurar la base de datos principal

Editar el archivo `config/db.php` con los datos de conexión de tu base de datos:

```php
return [
    'class' => 'yii\\db\\Connection',
    'dsn' => 'mysql:host=localhost;dbname=nombre_base_de_datos',
    'username' => 'usuario',
    'password' => 'contraseña',
    'charset' => 'utf8',
];
```

## 🧪 4. Configurar la base de datos para pruebas

Editar el archivo `config/test_db.php` con los datos de tu base de datos de testing.

## 🧱 5. Ejecutar las migraciones

```bash
php yii migrate
# o también
php yii migrate/up
```

## 🚀 6. Probar el API

Puedes acceder al API en la siguiente ruta:

```
http://localhost/carpeta_proyecto/web/producto
```

## 🌐 7. Ejecutar el Frontend (carpeta `oberstaff`)

```bash
cd oberstaff
yarn install
```

Luego, crear un archivo `.env` dentro de la carpeta `oberstaff` y agregar lo siguiente:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost/carpeta_proyecto/web/
NEXT_PUBLIC_TOKEN=TOKEN_COMPARTIDO_CORREO
```

Finalmente, ejecutar el servidor de desarrollo:

```bash
yarn dev
```

Esto levantará la aplicación frontend. Deberías poder verla accediendo a la dirección indicada en consola (por lo general `http://localhost:3000`).