<?php
namespace tests\unit\models;

use app\models\Producto;
use yii\db\ActiveQuery;
use app\models\ProductoSearch;

class ProductoTest extends \PHPUnit\Framework\TestCase
{
    public function testFindByNombre()
    {
        // Prueba que el método find() devuelve una instancia de ActiveQuery
        $this->assertInstanceOf(ActiveQuery::class, Producto::find());
        
        // Prueba búsqueda por nombre
        $producto = Producto::find()->where(['nombre' => 'Teclado Mecánico'])->one();
        $this->assertNotNull($producto);
        $this->assertEquals('Teclado Mecánico', $producto->nombre);
    }

    public function testFiltrarPorPrecio()
    {
        $resultados = ProductoSearch::filtrar([
            'precio_min' => 50,
            'precio_max' => 100
        ])->all();
        
        $this->assertNotEmpty($resultados);
        
        foreach ($resultados as $producto) {
            $this->assertGreaterThanOrEqual(50, $producto->precio);
            $this->assertLessThanOrEqual(100, $producto->precio);
        }
    }

    public function testRelacionCategoria()
    {
        $producto = Producto::findOne(1);
        $this->assertNotNull($producto->categoria);
        $this->assertInstanceOf('app\models\Categoria', $producto->categoria);
    }
}