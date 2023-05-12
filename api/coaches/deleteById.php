<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../config/dbcon.php';

if (!isset($_GET['id'])) {
    die('No ID specified');
}

$query = 'DELETE FROM coach WHERE id = ' . $_GET['id'];

$result = mysqli_query($conn, $query);
$myArray = array();

if ($result) {
    // output data of each row
    echo json_encode(
        array("message" => "Coach deleted.")
    );
} else {
    //send 404
    http_response_code(404);
    echo json_encode(
        array("message" => "No coach found.")
    );
}

?>