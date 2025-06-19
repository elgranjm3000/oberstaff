<?php

namespace app\controllers;

use Yii;
use app\models\Categoria;
use yii\rest\ActiveController;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;
use yii\filters\auth\HttpBearerAuth;

class CategoriaController extends ActiveController
{
    public $modelClass = 'app\models\Categoria';

    public function behaviors()
    {
        $behaviors = parent::behaviors();
        
        // Configuración CORS
        $behaviors['corsFilter'] = [
            'class' => \yii\filters\Cors::class,
        ];
        
        // Autenticación por token (opcional)
        $behaviors['authenticator'] = [
            'class' => HttpBearerAuth::class,
            'except' => ['index', 'view', 'options'], // Acciones públicas
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
     * Lista todas las categorías con sus productos
     */
    public function actionIndex()
    {
        return Categoria::find()->with('productos')->all();
    }

    /**
     * Muestra una categoría específica con sus productos
     */
    public function actionView($id)
    {
        return Categoria::find()->where(['id' => $id])->with('productos')->one();
    }

    /**
     * Crea una nueva categoría
     */
    public function actionCreate()
    {
        $model = new Categoria();
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
     * Actualiza una categoría existente
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
     * Elimina una categoría
     */
    public function actionDelete($id)
    {
        $model = $this->findModel($id);
        
        // Verificamos que no tenga productos asociados
        if ($model->getProductos()->count() > 0) {
            Yii::$app->response->setStatusCode(400);
            return ['error' => 'No se puede eliminar la categoría porque tiene productos asociados'];
        }
        
        if ($model->delete()) {
            Yii::$app->response->setStatusCode(204);
            return null;
        } else {
            Yii::$app->response->setStatusCode(500);
            return ['error' => 'No se pudo eliminar la categoría'];
        }
    }

    /**
     * Busca el modelo por ID
     */
    protected function findModel($id)
    {
        if (($model = Categoria::findOne($id)) !== null) {
            return $model;
        }
        
        throw new NotFoundHttpException('La categoría solicitada no existe');
    }
}