(function () {

    var
        level = document.getElementById('level'),
        player = {},
        size = 100,
        map,
        isRunning = true,
        moves = 0,
        gameConsole = document.getElementById('console'),
        forwardButton = document.getElementById('forward'),
        leftButton = document.getElementById('left'),
        rightButton = document.getElementById('right'),
        backButton = document.getElementById('back'),
        isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1,
        isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1;

    function step(direction) {

        var
            currentPosition = {
                x: player.x,
                y: player.y
            };

        moves = moves + 1;

        switch (player.direction % 360) {
            case 0:
                player.y -= direction;
                break;
            case 90:
            case -270:
                player.x += direction;
                break;
            case 180:
            case -180:
                player.y += direction;
                break;
            case 270:
            case -90:
                player.x -= direction;
        }

        if (map[player.y][player.x] === '#') {
            player.x = currentPosition.x;
            player.y = currentPosition.y;
            return;
        }

        if (map[player.y][player.x] === 'e') {
            gameConsole.innerHTML = '<p>Congratulations! You found the exit in <strong>' + moves + '</strong> moves! Refresh this page to try again.</p>' + gameConsole.innerHTML;
            isRunning = false;
        }

        updatePosition();
    };

    function turn(direction) {
        moves = moves + 1;
        player.direction += direction;
        updatePosition();
    };

    forwardButton.addEventListener('click', function () {
        if (isRunning) step(1);
    }, false);

    leftButton.addEventListener('click', function () {
        if (isRunning) turn(-90);
    }, false);

    rightButton.addEventListener('click', function () {
        if (isRunning) turn(90);
    }, false);

    backButton.addEventListener('click', function () {
        if (isRunning) step(-1);
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
            html = '',
            transform;

        for (y = 0; y < map.length; y += 1) {
            for (x = 0; x < map[y].length; x += 1) {

                transform = 'translate3d(' + (x * size) + 'px, 0px, ' + (y * size) + 'px)';
                html += '<div class="box" style="-webkit-transform: ' + transform + '; transform: ' + transform + '">';

                switch (map[y][x]) {
                    case '#':
                        html += '<div class="front side"></div>' +
                                '<div class="back side"></div>' +
                                '<div class="left side"></div>' +
                                '<div class="right side"></div>';
                        break;
                    case 's':
                        player.x = x;
                        player.y = y;
                        player.direction = 0;
                    case '.':
                    case 'e':
                        html += '<div class="top side"></div>' +
                                '<div class="bottom side"></div>';
                }

                html += '</div>';

            }
        }

        level.innerHTML = html;

        updatePosition();
    };

    map = [
        "####################",
        "#....#########....e#",
        "#..........###..####",
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

    buildLevel(map);
})();