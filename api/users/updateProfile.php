<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../config/dbcon.php';

//update the user profile(firstName,lastName,age,height,gender)

if (!isset($_GET['id'])) {
    die('No ID specified');
}

//get the data from the request
$data = json_decode(file_get_contents("php://input"));




?>