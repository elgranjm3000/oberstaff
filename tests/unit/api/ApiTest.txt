<?php
namespace tests\unit\api;

use yii\web\Response;
use Yii;

class ApiTest extends \PHPUnit\Framework\TestCase
{
    public function testProductoEndpoint()
    {
        $response = Yii::$app->runAction('producto/filtrar', [
            'nombre' => 'Teclado'
        ]);
        

        $data = $response["items"];
        $this->assertArrayHasKey('productos', $data);
    }

    public function testUnauthorizedAccess()
    {
        $this->expectException('yii\web\UnauthorizedHttpException');
        
        // Simular request sin token
        Yii::$app->request->headers->remove('Authorization');
        Yii::$app->runAction('producto/create');
    }
}