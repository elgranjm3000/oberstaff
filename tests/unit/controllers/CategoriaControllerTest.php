<?php
namespace tests\controllers;

use app\controllers\CategoriaController;
use app\models\Categoria;
use yii\web\Request;
use Yii;
use Codeception\Test\Unit;

class CategoriaControllerTest extends Unit
{
    protected function _before()
    {
        // Configurar aplicación
        $this->mockApplication();
        
        // Limpiar datos en el orden correcto y desactivando restricciones
        Yii::$app->db->createCommand('SET FOREIGN_KEY_CHECKS = 0')->execute();
        Yii::$app->db->createCommand()->truncateTable('producto')->execute();
        Yii::$app->db->createCommand()->truncateTable('categoria')->execute();
        Yii::$app->db->createCommand('SET FOREIGN_KEY_CHECKS = 1')->execute();
        
        // Resetear autoincrementos si es necesario
        Yii::$app->db->createCommand('ALTER TABLE categoria AUTO_INCREMENT = 1')->execute();
    }

    protected function mockApplication()
    {
        // Asegurar que tenemos una aplicación Yii
        if (Yii::$app === null) {
            $config = require __DIR__ . '/../../config/test.php';
            new \yii\web\Application($config);
        }
    }

    public function testActionIndex()
    {
        // Preparar datos
        $cat1 = new Categoria(['nombre' => 'Test1']);
        $this->assertTrue($cat1->save(), 'No se pudo guardar categoría 1: ' . print_r($cat1->errors, true));
        
        $cat2 = new Categoria(['nombre' => 'Test2']);
        $this->assertTrue($cat2->save(), 'No se pudo guardar categoría 2: ' . print_r($cat2->errors, true));

        
    }

    protected function _after()
    {
        // Limpiar
        Yii::$app = null;
    }
}