<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($input['username']) || !isset($input['password'])) {
        sendError('Username and password are required', 400);
    }
    
    $users = readJsonFile(USERS_FILE);
    
    foreach ($users as $user) {
        if ($user['username'] === $input['username']) {
            if (password_verify($input['password'], $user['password'])) {
                $token = generateToken($user['username']);
                sendResponse([
                    'success' => true,
                    'token' => $token,
                    'username' => $user['username']
                ]);
            }
        }
    }
    
    sendError('Invalid credentials', 401);
}

sendError('Method not allowed', 405);
?>
