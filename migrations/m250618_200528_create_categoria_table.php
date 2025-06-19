<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%categoria}}`.
 */
class m250618_200528_create_categoria_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%categoria}}', [
            'id' => $this->primaryKey(),
            'nombre' => $this->string()->notNull(),
        ]);

        $this->batchInsert('categoria', ['nombre'], [
            ['Electrónica'],
            ['Ropa'],
            ['Hogar'],
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%categoria}}');
    }
}
