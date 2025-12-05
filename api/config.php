<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Configuration
define('DATA_DIR', __DIR__ . '/data');
define('POSTS_FILE', DATA_DIR . '/posts.json');
define('COURSES_FILE', DATA_DIR . '/courses.json');
define('USERS_FILE', DATA_DIR . '/users.json');

// Create data directory if it doesn't exist
if (!file_exists(DATA_DIR)) {
    mkdir(DATA_DIR, 0755, true);
}

// Initialize files if they don't exist
if (!file_exists(POSTS_FILE)) {
    file_put_contents(POSTS_FILE, json_encode([]));
}

if (!file_exists(COURSES_FILE)) {
    file_put_contents(COURSES_FILE, json_encode([]));
}

if (!file_exists(USERS_FILE)) {
    // Default admin user (username: admin, password: admin123)
    $defaultUser = [
        'username' => 'admin',
        'password' => password_hash('admin123', PASSWORD_DEFAULT)
    ];
    file_put_contents(USERS_FILE, json_encode([$defaultUser]));
}

// Helper functions
function readJsonFile($file) {
    if (!file_exists($file)) {
        return [];
    }
    $content = file_get_contents($file);
    return json_decode($content, true) ?: [];
}

function writeJsonFile($file, $data) {
    return file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT));
}

function getAuthToken() {
    $headers = getallheaders();
    if (isset($headers['Authorization'])) {
        $auth = $headers['Authorization'];
        if (preg_match('/Bearer\s+(\S+)/', $auth, $matches)) {
            return $matches[1];
        }
    }
    return null;
}

function verifyToken($token) {
    // Simple token verification - in production use JWT
    return !empty($token) && strlen($token) > 20;
}

function generateToken($username) {
    return bin2hex(random_bytes(32)) . '_' . $username . '_' . time();
}

function sendResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode($data);
    exit();
}

function sendError($message, $statusCode = 400) {
    http_response_code($statusCode);
    echo json_encode(['error' => $message]);
    exit();
}
?>
