<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%producto}}`.
 */
class m250618_200648_create_producto_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%producto}}', [
            'id' => $this->primaryKey(),
            'nombre' => $this->string()->notNull(),
            'descripcion' => $this->text(),
            'precio' => $this->decimal(10, 2)->notNull(),
            'stock' => $this->integer()->notNull(),
            'categoria_id' => $this->integer()->notNull(),
        ]);

        $this->addForeignKey(
            'fk-producto-categoria_id',
            'producto',
            'categoria_id',
            'categoria',
            'id',
            'CASCADE'
        );
        $this->batchInsert('producto', 
        ['nombre', 'descripcion', 'precio', 'stock', 'categoria_id'], 
        [
            ['Smartphone X', 'Último modelo con cámara 108MP', 899.99, 50, 1],
            ['Laptop Pro', '16GB RAM, SSD 512GB', 1299.99, 30, 1],
            ['Camiseta Algodón', 'Talla M, color blanco', 19.99, 100, 2],
        ]
        );
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropForeignKey('fk-producto-categoria_id', 'producto');
        $this->dropTable('{{%producto}}');
    }
}
