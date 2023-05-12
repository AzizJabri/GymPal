<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../config/dbcon.php';

$query = 'SELECT * FROM coachView';

$result = mysqli_query($conn, $query);
$myArray = array();
if ($result->num_rows > 0) {
    // output data of each row
    while ($row = $result->fetch_assoc()) {
        $myArray[] = array_map("utf8_encode", $row);
    }
    print json_encode($myArray);
} else {
    http_response_code(404);
    echo json_encode(
        array("message" => "No coach found.")
    );
}

?>