<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Get all posts
        $posts = readJsonFile(POSTS_FILE);
        
        // Sort by created_at descending (newest first)
        usort($posts, function($a, $b) {
            return strtotime($b['created_at']) - strtotime($a['created_at']);
        });
        
        sendResponse($posts);
        break;
        
    case 'POST':
        // Create new post - requires authentication
        $token = getAuthToken();
        if (!verifyToken($token)) {
            sendError('Unauthorized', 401);
        }
        
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($input['title']) || !isset($input['content'])) {
            sendError('Title and content are required', 400);
        }
        
        $posts = readJsonFile(POSTS_FILE);
        
        // Generate ID
        $maxId = 0;
        foreach ($posts as $post) {
            if (isset($post['id']) && $post['id'] > $maxId) {
                $maxId = $post['id'];
            }
        }
        
        $newPost = [
            'id' => $maxId + 1,
            'title' => $input['title'],
            'content' => $input['content'],
            'cover_image' => $input['cover_image'] ?? '',
            'images' => $input['images'] ?? [],
            'videos' => $input['videos'] ?? [],
            'tags' => $input['tags'] ?? [],
            'created_at' => $input['created_at'] ?? date('c'),
            'updated_at' => date('c')
        ];
        
        $posts[] = $newPost;
        writeJsonFile(POSTS_FILE, $posts);
        
        sendResponse($newPost, 201);
        break;
        
    case 'PUT':
        // Update post - requires authentication
        $token = getAuthToken();
        if (!verifyToken($token)) {
            sendError('Unauthorized', 401);
        }
        
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($input['id'])) {
            sendError('Post ID is required', 400);
        }
        
        $posts = readJsonFile(POSTS_FILE);
        $updated = false;
        
        foreach ($posts as &$post) {
            if ($post['id'] == $input['id']) {
                $post['title'] = $input['title'] ?? $post['title'];
                $post['content'] = $input['content'] ?? $post['content'];
                $post['cover_image'] = $input['cover_image'] ?? $post['cover_image'];
                $post['images'] = $input['images'] ?? $post['images'];
                $post['videos'] = $input['videos'] ?? $post['videos'];
                $post['tags'] = $input['tags'] ?? $post['tags'];
                $post['updated_at'] = date('c');
                $updated = true;
                break;
            }
        }
        
        if (!$updated) {
            sendError('Post not found', 404);
        }
        
        writeJsonFile(POSTS_FILE, $posts);
        sendResponse(['success' => true]);
        break;
        
    case 'DELETE':
        // Delete post - requires authentication
        $token = getAuthToken();
        if (!verifyToken($token)) {
            sendError('Unauthorized', 401);
        }
        
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($input['id'])) {
            sendError('Post ID is required', 400);
        }
        
        $posts = readJsonFile(POSTS_FILE);
        $posts = array_filter($posts, function($post) use ($input) {
            return $post['id'] != $input['id'];
        });
        
        writeJsonFile(POSTS_FILE, array_values($posts));
        sendResponse(['success' => true]);
        break;
        
    default:
        sendError('Method not allowed', 405);
}
?>
