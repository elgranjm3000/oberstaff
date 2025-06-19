<?php
namespace tests\fixtures;

use yii\test\ActiveFixture;

class ProductoFixture extends ActiveFixture
{
    public $modelClass = 'app\models\Producto';
    public $dataFile = '@tests/fixtures/data/producto.php';
}