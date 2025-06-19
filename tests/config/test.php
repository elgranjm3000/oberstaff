<?php
return [
    'id' => 'app-tests',
    'basePath' => dirname(__DIR__),
    'components' => [
        'db' => [
            'class' => 'yii\db\Connection',
            'dsn' => 'mysql:host=database:3306;dbname=inventario_test',
            'username' => 'root',
            'password' => 'tiger',
            'charset' => 'utf8',
        ],
        'mailer' => [
            'class' => 'yii\swiftmailer\Mailer',
            'useFileTransport' => true,
        ],
        'urlManager' => [
            'showScriptName' => true,
        ],
        'request' => [
            'cookieValidationKey' => 'test',
            'enableCsrfValidation' => false,
        ],
    ],
    'container' => [
        'definitions' => [
            'yii\di\Container' => [
                'class' => 'yii\di\Container',
            ],
        ],
    ],
];