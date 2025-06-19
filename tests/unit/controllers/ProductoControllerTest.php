<?php
namespace tests\unit\controllers;

use app\controllers\ProductoController;
use yii\web\Request;
use yii\web\Response;
use Yii;
use app\models\Producto;

class ProductoControllerTest extends \PHPUnit\Framework\TestCase
{

    protected function setUp(): void
    {
        parent::setUp();
        $this->mockApplication();
       
    }

    protected function mockApplication()
    {
        new \yii\web\Application([
            'id' => 'test-app',
            'basePath' => __DIR__,
            'components' => [
                'request' => [
                    'cookieValidationKey' => 'test-key',
                    'scriptFile' => __DIR__ . '/index.php',
                    'scriptUrl' => '/index.php',
                ],
            ]
        ]);
    }

    public function testActionFiltrar()
    {

     
        
        // Simular request GET
        Yii::$app->request->setQueryParams([
            'nombre' => 'Camiseta',
            'precio_max' => 100
        ]);
        $controller = new ProductoController('producto', Yii::$app);

     
        
        $response = $controller->actionFiltrar();
        echo $response;
        exit;
        
        $this->assertArrayHasKey('productos', $response);
        $this->assertArrayHasKey('paginacion', $response);
        $this->assertNotEmpty($response['productos']);
        
        foreach ($response['productos'] as $producto) {
            $this->assertStringContainsStringIgnoringCase('Teclado', $producto->nombre);
            $this->assertLessThanOrEqual(100, $producto->precio);
        }
    }

    public function testActionView()
    {
        $controller = new ProductoController('producto', Yii::$app);
        $producto = $controller->actionView(1); // ID existente
        
        $this->assertNotNull($producto);
        $this->assertEquals(1, $producto->id);
    }

    public function testActionViewNotFound()
    {
        $this->expectException('yii\web\NotFoundHttpException');
        
        $controller = new ProductoController('producto', Yii::$app);
        $controller->actionView(9999); // ID inexistente
    }
}