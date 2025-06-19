<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "producto".
 *
 * @property int $id
 * @property string $nombre
 * @property string|null $descripcion
 * @property float $precio
 * @property int $stock
 * @property int $categoria_id
 *
 * @property Categoria $categoria
 */
class Producto extends \yii\db\ActiveRecord
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'producto';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['nombre', 'precio', 'stock', 'categoria_id'], 'required'],
            [['nombre'], 'string', 'max' => 100],
            [['descripcion'], 'string', 'max' => 500],
            [['precio'], 'number', 'min' => 0.01],
            [['stock'], 'integer', 'min' => 0],
            [['categoria_id'], 'exist', 'skipOnError' => true, 'targetClass' => Categoria::class, 'targetAttribute' => ['categoria_id' => 'id']],
            
            ['stock', 'validateStockMinimo'],
        ];
    }

    public function validateStockMinimo($attribute, $params)
    {
        if ($this->$attribute < 10) {
            $this->addError($attribute, 'El stock mínimo debe ser 10 unidades');
        }
    }

    public function fields()
    {
        return [
            'id',
            'nombre',
            'descripcion',
            'precio',
            'stock',
            'categoria_id',
            'categoria_nombre' => function() {
                return $this->categoria->nombre;
            }
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'nombre' => 'Nombre',
            'descripcion' => 'Descripcion',
            'precio' => 'Precio',
            'stock' => 'Stock',
            'categoria_id' => 'Categoria ID',
        ];
    }


   

    /**
     * Gets query for [[Categoria]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getCategoria()
    {
        return $this->hasOne(Categoria::class, ['id' => 'categoria_id']);
    }

}
