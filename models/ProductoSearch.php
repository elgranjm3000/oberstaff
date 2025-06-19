<?php

namespace app\models;

use yii\base\Model;
use yii\data\ActiveDataProvider;

class ProductoSearch extends Producto
{
    public $categoria_nombre;
    public $precio_min;
    public $precio_max;
    public $con_stock;

    public function rules()
    {
        return [
            [['id', 'categoria_id', 'stock'], 'integer'],
            [['nombre', 'descripcion', 'categoria_nombre'], 'string'],
            [['precio', 'precio_min', 'precio_max'], 'number'],
            [['con_stock'], 'boolean'],
        ];
    }

    public function search($params)
    {
        $query = Producto::find()->joinWith('categoria');

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
            'sort' => [
                'attributes' => [
                    'nombre',
                    'precio',
                    'stock',
                    'categoria_nombre' => [
                        'asc' => ['categoria.nombre' => SORT_ASC],
                        'desc' => ['categoria.nombre' => SORT_DESC],
                    ]
                ]
            ]
        ]);

        $this->load($params, '');

        if (!$this->validate()) {
            return $dataProvider;
        }

        $query->andFilterWhere([
            'producto.id' => $this->id,
            'categoria_id' => $this->categoria_id,
            'stock' => $this->stock,
        ]);

        $query->andFilterWhere(['like', 'producto.nombre', $this->nombre])
              ->andFilterWhere(['like', 'descripcion', $this->descripcion])
              ->andFilterWhere(['like', 'categoria.nombre', $this->categoria_nombre]);

        if ($this->con_stock) {
            $query->andWhere(['>', 'stock', 0]);
        }

        if ($this->precio_min !== null || $this->precio_max !== null) {
            $query->andFilterWhere([
                'between', 'precio', 
                $this->precio_min ?? 0, 
                $this->precio_max ?? PHP_FLOAT_MAX
            ]);
        }

        return $dataProvider;
    }
}