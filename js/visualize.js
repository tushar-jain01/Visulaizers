// Important Grid Variable
var sX = -1;
var sY = -1;
var dX = -1;
var dY = -1;
var N = 18;
var M = 45;
var STOP = 0;
///////////

function sleep(ms) {
    return new Promise(
        resolve => setTimeout(resolve, ms)
    );
}

function createArray(length) {
    /*
    Create an array of give dimenstion
    Source : https://stackoverflow.com/a/966938
    */
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while (i--) arr[length - 1 - i] = createArray.apply(this, args);
    }

    return arr;
}

var Grid;
var Vis;

function CreateGrid() {
    /*
    Create Grid of Size N X M
    Every Cell has name of format Ci_j
    where i and j are its array indexes
    Source : https://stackoverflow.com/a/57550652
    */
    sX = -1, sY = -1, dX = -1, dY = -1;
    Grid = createArray(N, M);
    Vis = createArray(N, M);
    var s = '',
        i = -1,
        j = 0;
    while (++i < N) {
        s += '<div class="row">'
        for (j = 0; j < M; j++) {
            Grid[i][j] = 0;
            Vis[i][j] = 0;
            var x = "" + i;
            var y = "" + j;
            if (i < 10) x = "0" + i;
            if (j < 10) y = "0" + j;
            s += `<div class= "cell" id = "C` + x + "_" + y + `" onclick="setState(this)">  </div>`;
        }
        s += '</div>'
    }
    grid.innerHTML = s;
}

function setState(element) {
    // Sets State of a cell when clicked by user
    var name = element.id;
    var x = +("" + name[1] + name[2]);
    var y = +("" + name[4] + name[5]);
    if (sX == -1) {
        var name = element.id;
        sX = +x;
        sY = +y;
        element.style = "background-color: green;"
    } else if (dX == -1) {
        var name = element.id;
        dX = +x;
        dY = +y;
        element.style = "background-color: blue;"
    } else {
        Grid[x][y] = -1;
        element.style = "background-color: brown;"
    }
}

function isValid(a, b) {
    if (a < 0 || b < 0 || a >= N || b >= M) return false;
    else return true;
}

function setCellColor(a, b, color) {
    var x = "" + a;
    var y = "" + b;
    if (a < 10) x = "0" + a;
    if (b < 10) y = "0" + b;
    var cellid = "C" + x + "_" + y;
    document.getElementById(cellid).style = "background-color:" + color + "";
}
async function dfs(a, b) {
    if (Vis[a][b] == 1 || await STOP == 1 || Grid[a][b] == -1) return;
    if (a == dX && b == dY) {
        setCellColor(a, b, "yellow");
        STOP = 1;
        return;
    }
    Vis[a][b] = 1;
    if (a != sX || b != sY) {
        setCellColor(a, b, "purple");
        await sleep(5);
    }
    var moveX = [0, -1, 1, 0];
    var moveY = [-1, 0, 0, 1];
    var i = 0;
    for (i; i < 4; i++) {
        var nX = a + moveX[i];
        var nY = b + moveY[i];
        if (isValid(nX, nY)) {
            await dfs(nX, nY)
        }
    }


}

function Solve() {
    STOP = 0;
    console.log("C" + sX + "_" + sY);
    dfs(sX, sY);
}
