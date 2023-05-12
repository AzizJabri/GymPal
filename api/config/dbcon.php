<?php
$host = "localhost";
$port = "3307";
$username = "root";
$password = "";
$dname = "gympal";

$conn = mysqli_connect($host, $username, $password, $dname, $port);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

?>