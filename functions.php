<?php

function check_login($con) {
    if(isset($_SESSION['user_name'])) {
        $id = $_SESSION['user_name'];
        $query =  "select * from users where user_name = '$id' limit 1";
        $result = mysqli_query($con, $query);
        if($result && mysqli_num_rows($result) > 0) {
            $user_data = mysqli_fetch_assoc($result);
            return $user_data;
        }
    } else {
        // redirect to login, except actually we dont have to
    }
}

function debug_to_console($data) {
    echo("<script>console.log('Debug Objects: " . $data . "' );</script>");
}