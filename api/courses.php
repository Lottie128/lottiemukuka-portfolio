<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Get all courses
        $courses = readJsonFile(COURSES_FILE);
        
        // Sort by created_at descending (newest first)
        usort($courses, function($a, $b) {
            return strtotime($b['created_at']) - strtotime($a['created_at']);
        });
        
        sendResponse($courses);
        break;
        
    case 'POST':
        // Create new course - requires authentication
        $token = getAuthToken();
        if (!verifyToken($token)) {
            sendError('Unauthorized', 401);
        }
        
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($input['title']) || !isset($input['description'])) {
            sendError('Title and description are required', 400);
        }
        
        $courses = readJsonFile(COURSES_FILE);
        
        // Generate ID
        $maxId = 0;
        foreach ($courses as $course) {
            if (isset($course['id']) && $course['id'] > $maxId) {
                $maxId = $course['id'];
            }
        }
        
        $newCourse = [
            'id' => $maxId + 1,
            'title' => $input['title'],
            'description' => $input['description'],
            'thumbnail' => $input['thumbnail'] ?? '',
            'duration' => $input['duration'] ?? '',
            'videos' => $input['videos'] ?? [],
            'created_at' => $input['created_at'] ?? date('c'),
            'updated_at' => date('c')
        ];
        
        $courses[] = $newCourse;
        writeJsonFile(COURSES_FILE, $courses);
        
        sendResponse($newCourse, 201);
        break;
        
    case 'PUT':
        // Update course - requires authentication
        $token = getAuthToken();
        if (!verifyToken($token)) {
            sendError('Unauthorized', 401);
        }
        
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($input['id'])) {
            sendError('Course ID is required', 400);
        }
        
        $courses = readJsonFile(COURSES_FILE);
        $updated = false;
        
        foreach ($courses as &$course) {
            if ($course['id'] == $input['id']) {
                $course['title'] = $input['title'] ?? $course['title'];
                $course['description'] = $input['description'] ?? $course['description'];
                $course['thumbnail'] = $input['thumbnail'] ?? $course['thumbnail'];
                $course['duration'] = $input['duration'] ?? $course['duration'];
                $course['videos'] = $input['videos'] ?? $course['videos'];
                $course['updated_at'] = date('c');
                $updated = true;
                break;
            }
        }
        
        if (!$updated) {
            sendError('Course not found', 404);
        }
        
        writeJsonFile(COURSES_FILE, $courses);
        sendResponse(['success' => true]);
        break;
        
    case 'DELETE':
        // Delete course - requires authentication
        $token = getAuthToken();
        if (!verifyToken($token)) {
            sendError('Unauthorized', 401);
        }
        
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($input['id'])) {
            sendError('Course ID is required', 400);
        }
        
        $courses = readJsonFile(COURSES_FILE);
        $courses = array_filter($courses, function($course) use ($input) {
            return $course['id'] != $input['id'];
        });
        
        writeJsonFile(COURSES_FILE, array_values($courses));
        sendResponse(['success' => true]);
        break;
        
    default:
        sendError('Method not allowed', 405);
}
?>
