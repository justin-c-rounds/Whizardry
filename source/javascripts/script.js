(function () {

    var
        level = document.getElementById('level'),
        player = {},
        size = 100,
        forwardButton = document.getElementById('forward'),
        leftButton = document.getElementById('left'),
        rightButton = document.getElementById('right'),
        backButton = document.getElementById('back');

    function stepForward() {
        switch (player.direction % 360) {
            case 0:
                player.y -= 1;
                break;
            case 90:
            case -270:
                player.x += 1;
                break;
            case 180:
            case -180:
                player.y += 1;
                break;
            case 270:
            case -90:
                player.x -= 1;
        }
        updatePosition();
    };

    function stepBack() {
        switch (player.direction % 360) {
            case 0:
                player.y += 1;
                break;
            case 90:
            case -270:
                player.x -= 1;
                break;
            case 180:
            case -180:
                player.y -= 1;
                break;
            case 270:
            case -90:
                player.x += 1;
        }
        updatePosition();
    };

    function turnLeft() {
        player.direction -= 90;
        updatePosition();
    };

    function turnRight() {
        player.direction += 90;
        updatePosition();
    };

    forwardButton.addEventListener('click', function () {
        stepForward();
    }, false);

    leftButton.addEventListener('click', function () {
        turnLeft();
    }, false);

    rightButton.addEventListener('click', function () {
        turnRight();
    }, false);

    backButton.addEventListener('click', function () {
        stepBack();
    }, false);

    function updatePosition() {
        level.style.webkitTransform = 'translate3d(' + -(((player.x + 1) * size) - (size / 2)) + 'px, -50px, 500px) rotateY(' + player.direction + 'deg)';
        level.style.webkitTransformOriginX = ((player.x * size) + (size / 2)) + 'px';
        level.style.webkitTransformOriginZ = (player.y * size) + 'px'; 
    };

    function buildLevel(map) {
        var
            x,
            y,
            block,
            transform;

        for (y = 0; y < map.length; y += 1) {
            for (x = 0; x < map[y].length; x += 1) {
                if (map[y][x] === '#') {
                    transform = 'translate3d(' + (x * size) + 'px, 0px, ' + (y * size) + 'px)';
                    level.innerHTML += '<div class="box" style="-webkit-transform: ' + transform + '">' +
                                       '<div class="front side"></div>' +
                                       '<div class="back side"></div>' +
                                       '<div class="left side"></div>' +
                                       '<div class="right side"></div>' +
                                       '</div>';
                }
                if (map[y][x] === 's') {
                    player.x = x;
                    player.y = y;
                    player.direction = 0;
                }
            }
        }
        updatePosition();
    };

    var levelmap = [
        "####################",
        "#....#########.....#",
        "#..........###..##.#",
        "#....#####.###..##.#",
        "#....#####.........#",
        "##.#################",
        "##.................#",
        "#####.#########....#",
        "#####.#########....#",
        "#.......##########.#",
        "#.......#..........#",
        "#.......#.##########",
        "##.######.##########",
        "##.######.####.....#",
        "##.##....s.........#",
        "##.###.##.####.....#",
        "##.###.##.######.###",
        "##.##...#.#####...##",
        "##......#.#####...##",
        "####################"
    ];

    //var testLevel = [
    //    "####",450
    //    "####",350
    //    "####",250
    //    "#.##",150
    //    "#..#",50
    //    "#s.#",-50
    //    "####"-150
    //];

    //var testLevel = [
    //    "####",450
    //    "#.##",350
    //    "#..#",250
    //    "#s.#",150
    //    "####"50
    //];

    var testLevel = [
        "####",
        "#.##",
        "#.##",
        "#..#",
        "#s.#",
        "####"
    ];

    var Game = function () {
        var game = {};



        return game;
    };

    buildLevel(levelmap);
})();