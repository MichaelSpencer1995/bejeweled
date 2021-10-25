<?php
session_start();
    include('connections.php');
    include('functions.php');

    if($_SERVER['REQUEST_METHOD'] == 'POST') {
        // something was posted
        $user_name = $_POST['user_name'];
        $password = $_POST['password'];

        if(!empty($user_name) && !empty($password)) {
            debug_to_console('hello world');
            debug_to_console($user_name);
            debug_to_console($password);
            $query = "SELECT user_name FROM users WHERE user_name=.$user_name.";
            $returned = mysqli_query($con, $query);
            debug_to_console($returned);
            // if(already a username) {
            //     sign in
            // } else {
            //     save to db and sign in
            // }
        } else {
            debug_to_console('fefefaefef');
        }
    }
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bejeweled | Log in or sign up</title>
    <link href="css/index.css" rel="stylesheet">
</head>
<body>
    <div class="login-page-container">
        <div class="form-container">
            <form method="post" style='display: block'>
                <h2 style="font-weight: 100;">Sign In/Sign Up</h2>
                <label for="user_name">Username</label><br>
                <input type="text" id="user_name" name="user_name"><br>
                <label for="password">Password</label><br>
                <input type="text" id="password" name="password">
                <br>
                <input style="margin-top: 10px;"class='btn-primary' type="submit" value="Submit">
            </form>
    
            <div style="margin-top: 10px;"><span>or just </span><a href="index.php">Play locally</a></div>
        </div>
    </div>
</body>
</html>