<?php

$dbhost = 'localhost';
$dbuser = 'root';
$dbpass = '';
$dbname = 'login_sample_db';

if(!$con = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname)) {
    die("couldn't connect to db");
}