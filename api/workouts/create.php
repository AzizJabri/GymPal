<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../config/dbcon.php';

// get user id, coach id, name and notes
$data = json_decode(file_get_contents("php://input"));

// check if all required fields are set
if (!isset($data->userId) || !isset($data->coachId) || !isset($data->name) || !isset($data->notes)) {
    die('Missing required fields');
}

// create workout
$query = 'INSERT INTO workout (userId, coachId, name, notes) VALUES (' . $data->userId . ', ' . $data->coachId . ', "' . $data->name . '", "' . $data->notes . '")';

if (mysqli_query($conn, $query)) {
    //send 201
    http_response_code(201);
    echo json_encode(
        array("message" => "Workout created.")
    );
} else {
    //send 500
    http_response_code(500);
    echo json_encode(
        array("message" => "Error creating workout.")
    );
}


?>