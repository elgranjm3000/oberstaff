<?php

namespace app\controllers;

use Yii;
use app\models\Producto;
use yii\rest\ActiveController;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;
use yii\filters\auth\HttpBearerAuth;

class ProductoController extends ActiveController
{
    public $modelClass = 'app\models\Producto';

    public function behaviors()
    {
        $behaviors = parent::behaviors();
        
        // Configuración CORS
        $behaviors['corsFilter'] = [
            'class' => \yii\filters\Cors::class,
        ];
        
        // Autenticación por token (opcional)
        $behaviors['authenticator'] = [
            //'class' => HttpBearerAuth::class,
            'class'=>\app\components\HardcodedTokenAuth::class,
            'except' => ['index', 'view','options','filtrar'], // Acciones públicas
        ];
        
        // Verbos HTTP
        $behaviors['verbs'] = [
            'class' => VerbFilter::class,
            'actions' => [
                'index' => ['GET'],
                'view' => ['GET'],
                'create' => ['POST'],
                'update' => ['PUT', 'PATCH'],
                'delete' => ['DELETE'],
            ],
        ];
        
        return $behaviors;
    }

    /**
     * Lista todos los productos
     */
    public function actionIndex()
    {
        return Producto::find()->all();
    }

    /**
     * Muestra un producto específico
     */
    public function actionView($id)
    {
        return $this->findModel($id);
    }

    /**
     * Crea un nuevo producto
     */
    public function actionCreate()
    {
        $model = new Producto();
        $model->load(Yii::$app->request->post(), '');
        
        if ($model->save()) {
            Yii::$app->response->setStatusCode(201);
            return $model;
        } else {
            Yii::$app->response->setStatusCode(422);
            return $model->errors;
        }
    }

    /**
     * Actualiza un producto existente
     */
    public function actionUpdate($id)
    {
        $model = $this->findModel($id);
        $model->load(Yii::$app->request->getBodyParams(), '');
        
        if ($model->save()) {
            return $model;
        } else {
            Yii::$app->response->setStatusCode(422);
            return $model->errors;
        }
    }

    /**
     * Elimina un producto
     */
    public function actionDelete($id)
    {
        $model = $this->findModel($id);
        
        if ($model->delete()) {
            Yii::$app->response->setStatusCode(204);
            return null;
        } else {
            Yii::$app->response->setStatusCode(500);
            return ['error' => 'No se pudo eliminar el producto'];
        }
    }

    /**
     * Busca el modelo por ID
     */
    protected function findModel($id)
    {
        if (($model = Producto::findOne($id)) !== null) {
            return $model;
        }
        
        throw new NotFoundHttpException('El producto solicitado no existe');
    }

    public function actions()
{
    $actions = parent::actions();
    $actions['index']['prepareDataProvider'] = [$this, 'prepareDataProvider'];
    return $actions;
}

public function prepareDataProvider()
{
    $searchModel = new \app\models\ProductoSearch();
    return $searchModel->search(Yii::$app->request->queryParams);
}

public function actionFiltrar()
{
    $params = Yii::$app->request->queryParams;
    
    $query = Producto::find()
        ->joinWith('categoria')
        ->select(['producto.*', 'categoria.nombre as categoria_nombre']);

    // Aplicar filtros dinámicos
    if (isset($params['nombre'])) {
        $query->andFilterWhere(['like', 'producto.nombre', $params['nombre']]);
    }
    
    if (isset($params['categoria_id'])) {
        $query->andFilterWhere(['categoria_id' => $params['categoria_id']]);
    }
    
    if (isset($params['precio_min']) || isset($params['precio_max'])) {
        $min = $params['precio_min'] ?? 0;
        $max = $params['precio_max'] ?? PHP_FLOAT_MAX;
        $query->andFilterWhere(['between', 'precio', $min, $max]);
    }
    
    if (isset($params['con_stock']) && $params['con_stock'] === 'true') {
        $query->andWhere(['>', 'stock', 0]);
    }

    // Ordenamiento
    $sort = new \yii\data\Sort([
        'attributes' => [
            'nombre',
            'precio',
            'stock',
            'categoria_nombre' => [
                'asc' => ['categoria.nombre' => SORT_ASC],
                'desc' => ['categoria.nombre' => SORT_DESC],
            ]
        ]
    ]);

    $query->orderBy($sort->getOrders());

    // Paginación
    $pagination = new \yii\data\Pagination([
        'defaultPageSize' => 20,
        'totalCount' => $query->count(),
    ]);

    $query->offset($pagination->offset)
          ->limit($pagination->limit);

    return [
        'items' => $query->all(),
        'pagination' => [
            'total_count' => $pagination->totalCount,
            'page_count' => $pagination->getPageCount(),
            'current_page' => $pagination->getPage() + 1,
            'per_page' => $pagination->getPageSize(),
        ],
        'filters' => $params
    ];
}
}