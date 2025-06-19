<?php
namespace app\components;

use yii\filters\auth\AuthMethod;
use yii\web\UnauthorizedHttpException;

class HardcodedTokenAuth extends AuthMethod
{
    public function authenticate($user, $request, $response)
    {
        $authHeader = $request->getHeaders()->get('Authorization');
        
        if ($authHeader !== null && preg_match('/^Bearer\s+(.*?)$/', $authHeader, $matches)) {
            $token = $matches[1];
            
            if ($token === \Yii::$app->params['api']['hardcodedToken']) {
                return true; // Autenticación exitosa
            }
        }
        
        throw new UnauthorizedHttpException('Token de acceso inválido');
    }
}