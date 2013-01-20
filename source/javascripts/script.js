(function () {

    var
        level = document.getElementById('level'),
        player = {},
        size = 100,
        mapHeight,
        mapWidth,
        forwardButton = document.getElementById('forward'),
        leftButton = document.getElementById('left'),
        rightButton = document.getElementById('right'),
        backButton = document.getElementById('back'),
        isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1,
        isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1;

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
        if (isChrome) {
            level.style.webkitTransform = 'translate3d(' + -(((player.x + 1) * size) - (size / 2)) + 'px, -50px, ' + (500 - (player.y * size))  + 'px) rotateY(' + player.direction + 'deg)';
            level.style.webkitTransformOriginX = ((player.x * size) + (size / 2)) + 'px';
            level.style.webkitTransformOriginZ = (player.y * size) + 'px';
            return;
        }
        if (isSafari) {
            level.style.webkitTransform = 'translate3d(' + -(((player.x + 1) * size) - (size / 2)) + 'px, -50px, 500px) rotateY(' + player.direction + 'deg)';
            level.style.webkitTransformOriginX = ((player.x * size) + (size / 2)) + 'px';
            level.style.webkitTransformOriginZ = (player.y * size) + 'px';
            return;
        }
        // firefox
        level.style.transform = 'translate3d(' + -(((player.x + 1) * size) - (size / 2)) + 'px, -50px, ' + (500 - (player.y * size))  + 'px) rotateY(' + player.direction + 'deg)';
        level.style.transformOrigin = ((player.x * size) + (size / 2)) + 'px 0px ' + (player.y * size) + 'px';
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
                    level.innerHTML += '<div class="box" style="-webkit-transform: ' + transform + '; transform: ' + transform + '">' +
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
        mapHeight = map.length;
        mapWidth = map[0].length;
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
        "##.#####...###.....#",
        "##.##....s.........#",
        "##.###.#...###.....#",
        "##.###.##.######.###",
        "##.##...#.#####...##",
        "##......#.#####...##",
        "####################"
    ];

    buildLevel(levelmap);
})();