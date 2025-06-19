<?php
defined('YII_DEBUG') or define('YII_DEBUG', true);
defined('YII_ENV') or define('YII_ENV', 'test');

require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../vendor/yiisoft/yii2/Yii.php';

// Configuración específica para pruebas
$config = [
    'id' => 'unit-tests',
    'basePath' => dirname(__DIR__),
    'bootstrap' => ['log'], // Asegúrate de incluir esto
    'components' => [
        'db' => [
            'class' => 'yii\db\Connection',
            'dsn' => 'mysql:host=database:3306;dbname=inventario_test',
            'username' => 'root',
            'password' => 'tiger',
            'charset' => 'utf8',
        ],
        'urlManager' => [
            'enablePrettyUrl' => true,
            'showScriptName' => false,
            'enableStrictParsing' => true,
            'rules' => [
                ['class' => 'yii\rest\UrlRule', 'controller' => 'producto'],
                ['class' => 'yii\rest\UrlRule', 'controller' => 'categoria'],
                'GET producto/filtrar' => 'producto/filtrar'
            ],
        ],
        'request' => [
            'cookieValidationKey' => 'test-key',
            'enableCsrfValidation' => false,
            'parsers' => [
                'application/json' => 'yii\web\JsonParser',
            ],
        ],
        'user' => [
            'identityClass' => 'app\models\User',
            'enableAutoLogin' => false,
            'enableSession' => false,
        ],
        'cache' => [
            'class' => 'yii\caching\DummyCache',
        ],
        // Añade estos componentes esenciales
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning'],
                ],
            ],
        ],
        'i18n' => [
            'translations' => [
                '*' => [
                    'class' => 'yii\i18n\PhpMessageSource',
                ],
            ],
        ],
    ],
    'container' => [ // Configuración explícita del contenedor DI
        'definitions' => [
            'yii\di\Container' => function() {
                return Yii::$container;
            },
        ],
    ],
    'aliases' => [
        '@app' => dirname(__DIR__),
    ],
];

// Inicialización de la aplicación
$app = new yii\web\Application($config);

// ==============================================
// 1. FUNCIÓN PARA EJECUTAR MIGRACIONES
// ==============================================
function runMigrations()
{
    echo "\nEjecutando migraciones...\n";
    
    // Configuración temporal para consola
    $consoleConfig = require __DIR__ . '/../config/console.php';
    $consoleConfig['components']['db'] = Yii::$app->db; // Reusar la misma conexión
    
    // Crear aplicación de consola temporal
    $consoleApp = new yii\console\Application($consoleConfig);
    
    try {
        // Ejecutar migraciones
        $consoleApp->runAction('migrate/up', [
            'migrationPath' => '@app/migrations',
            'interactive' => 0, // Modo no interactivo
        ]);
        
        echo "Migraciones aplicadas correctamente.\n";
    } catch (\Exception $e) {
        die("\nError al ejecutar migraciones: " . $e->getMessage() . "\n");
    }
}

// ==============================================
// 2. EJECUTAR MIGRACIONES SI ES NECESARIO
// ==============================================
$needsMigration = false;

// Verificar si las tablas principales existen
try {
    $tables = Yii::$app->db->schema->getTableNames();
    if (!in_array('producto', $tables) || !in_array('categoria', $tables)) {
        $needsMigration = true;
    }
} catch (\yii\db\Exception $e) {
    die("Error al verificar tablas: " . $e->getMessage());
}

if ($needsMigration) {
    runMigrations();
}

// ==============================================
// 3. VERIFICACIÓN DEL MODELO PRODUCTO
// ==============================================
if (!class_exists('app\models\Producto')) {
    $modelPath = Yii::getAlias('@app/models/Producto.php');
    if (!file_exists($modelPath)) {
        die("ERROR: El archivo del modelo no existe en: $modelPath");
    }
    require_once $modelPath;
    
    if (!class_exists('app\models\Producto')) {
        die("ERROR: La clase Producto no existe después de ser cargada. Verifica el namespace.");
    }
}

// ==============================================
// 4. DATOS INICIALES PARA PRUEBAS (OPCIONAL)
// ==============================================
try {
    // Insertar categorías si no existen
    if (Yii::$app->db->createCommand("SELECT COUNT(*) FROM categoria")->queryScalar() == 0) {
        Yii::$app->db->createCommand()->batchInsert('categoria', ['nombre'], [
            ['Electrónicos'],
            ['Oficina'],
            ['Hogar']
        ])->execute();
        echo "Datos de prueba insertados en categoría.\n";
    }
    
    // Insertar productos básicos si no existen
    if (Yii::$app->db->createCommand("SELECT COUNT(*) FROM producto")->queryScalar() == 0) {
        Yii::$app->db->createCommand()->batchInsert('producto', [
            'nombre', 'descripcion', 'precio', 'stock', 'categoria_id'
        ], [
            ['Teclado', 'Teclado mecánico RGB', 99.99, 50, 1],
            ['Mouse', 'Mouse inalámbrico', 49.99, 30, 1],
            ['Monitor', 'Monitor 24 pulgadas', 199.99, 20, 1]
        ])->execute();
        echo "Datos de prueba insertados en producto.\n";
    }
} catch (\Exception $e) {
    die("Error al insertar datos de prueba: " . $e->getMessage());
}