<?php
namespace tests\models;

use app\models\Categoria;
use yii\web\NotFoundHttpException;

class CategoriaTest extends \Codeception\Test\Unit
{
    public function testCrearCategoriaValida()
    {
        $categoria = new Categoria([
            'nombre' => 'Electrónicos'            
        ]);
        
        $this->assertTrue($categoria->save());
        $this->assertEquals('Electrónicos', $categoria->nombre);
        $this->assertNotNull($categoria->id);
    }

    public function testCrearCategoriaInvalida()
    {
        $categoria = new Categoria([
            'nombre' => '',            
        ]);
        
        $this->assertFalse($categoria->save());
        $this->assertArrayHasKey('nombre', $categoria->errors);
    }

    public function testEliminarCategoriaSinProductos()
    {
        $categoria = new Categoria([
            'nombre' => 'Test3',            
        ]);
        $categoria->save();
        
        $id = $categoria->id;
        $this->assertEquals(1,$categoria->delete());
        $this->assertNull(Categoria::findOne($id));
    }

  /*  public function testRelacionProductos()
    {
        $categoria = new Categoria(['nombre' => 'Hogar']);
        $categoria->save();
        
        // Asumimos que existe el modelo Producto con relación a Categoria
        $producto = new \app\models\Producto([
            'nombre' => 'Sofá',
            'precio' => 299.99,
            'categoria_id' => $categoria->id,
        ]);
        $producto->save();
        
        $this->assertEquals(1, $categoria->getProductos()->count());
        $this->assertEquals('Sofá', $categoria->productos[0]->nombre);
    }*/
}