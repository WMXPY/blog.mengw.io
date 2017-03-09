/**
 * @param {character[][]} board
 * @return {number}
 */
var countBattleships = function (board) {
    var shipcount = 0;
    for (var i = 0; i < board.length; i++) {
        var thisship = 0;
        for (var j = 0; j < board[i].length; j++) {
            switch (board[i][j]) {
                case 'X':
                    thisship++;
                    break;
                case '.':
                    if (thisship > 1) {
                        shipcount++;
                    }
                    thisship = 0;
                    break;
            }
        }
    }
    for (i = 0; i < board[0].length; i++) {
        var thisship = 0;
        for (j = 0; j < board.length; j++) {
            switch (board[j][i]) {
                case 'X':
                    thisship++;
                    break;
                case '.':
                    if (thisship > 1) {
                        shipcount++;
                    }
                    thisship = 0;
                    break;
            }
        }
    }
    return shipcount;
};
console.log(countBattleships(["X..X", "...X", "...X"]))