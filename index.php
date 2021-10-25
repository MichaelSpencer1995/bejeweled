<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bejeweled</title>
    <link href="css/index.css" rel="stylesheet">
    <script src="https://kit.fontawesome.com/07fc9dc957.js" crossorigin="anonymous"></script>
</head>
<body>
<div class="container">
    <div class="game-container">
        <div class="menu-container">
            <i id="close-menu"class="far fa-times-circle" style="display: none"></i>
            <div class="top-half-container">
                <div class="sign-container">
                    <a href="#">Sign in</a>
                    <span>or </span>
                    <a href="#">Sign up</a>
                    <p>to upload highscore.</p>
                </div>
                <p></p>
                <button id="start">Start Game</button>
            </div>
            <div class="mute-container">
                <i id="mute"class="fas fa-volume-up"></i>
            </div>
        </div>
        <div id="game-board"></div>
    </div>
    <div class="lower-container">
        <div><i style="display: none" id="settings" class="fas fa-cog"></i></div>
        <div class="scores">
            <div id="score">0</div>
            <div id="highscore">0</div>
        </div>
    </div>
</div>
<script src="js/config.js"></script>
<script src="js/state-and-selectors.js"></script>
<script src="js/helpers.js"></script>
<script src="js/draw.js"></script>
<script src="js/logic.js"></script>
<script src="js/animations.js"></script>
<script src="js/index.js"></script>
</body>
</html>