// 游戏交互逻辑文件

// 游戏的操作主要是依靠键盘的上、下、左、右来完成，捕获键盘事件
$(document).keydown(function(event){
	switch(event.keyCode){
	    case 37://left
	    	if (moveLeft()) {
	    		generateOneNumber();
	    		isgameover();
	    	}
            break;
        case 38://up
        	if (moveUp()) {
	    		generateOneNumber();
	    		isgameover();
	    	}
            break;
        case 39://right
        	if (moveRight()) {
	    		generateOneNumber();
	    		isgameover();
	    	}
            break;
        case 40://down
            if (moveDown()) {
	    		generateOneNumber();
	    		isgameover();
	    	}
            break;
        default :
            break;
	}
});

//左移动
//首先判断是否可以向左移动
function moveLeft(){
	if(!canMoveLeft(board)){
		return false;
	}
	// 向左移动
	// 第一步，遍历数字格，判断除第一列外有哪些数字格的值是不为0的
	// 第二步，遍历当前值不为0的数字格左边数字格
	// 第三步，向左移动逻辑还要分成两种情况
	   //一种是当前值不为0的数字格左边的数字格必须值为0并且中间的数字格必须值也为0
	   //一种是当前值不为0的数字格与左边的数字格值相等并且中间的数字格必须值也为0
	for(var i=0; i<4; i++){
		for(var j=1; j<4; j++){
			if(board[i][j] != 0){
				for(var k=0; k<j; k++){
					//判断当前值不为0的数字格左边的数字格必须值为0并且中间的数字格必须值也为0
					if (board[i][k] == 0 && noBlokHorizontalCol(i, k, j, board)) {
						showMoveAnimation(i, j, i, k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					} 
					//判断当前值不为0的数字格与左边的数字格值相等并且中间的数字格必须值也为0
					else if (board[i][k] == board[i][j] && noBlokHorizontalCol(i, k, j, board) && !hasConflicted[i][k]) {
						//move
						showMoveAnimation(i, j, i, k);
						//add
						board[i][k] += board[i][j];
						board[i][j] = 0;
						//add score
						score += board[i][k];
						updateScore(score);

						hasConflicted[i][k] = true;
						continue;
					}

				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}


//右移动
//首先判断是否可以向右移动
function moveRight(){
	if(!canMoveRight(board)){
		return false;
	}
	// 向右移动
	// 第一步，遍历数字格，判断除最后一列外有哪些数字格的值是不为0的
	// 第二步，遍历当前值不为0的数字格右边数字格
	// 第三步，向右移动逻辑还要分成两种情况
	   //一种是当前值不为0的数字格右边的数字格必须值为0并且中间的数字格必须值也为0
	   //一种是当前值不为0的数字格与右边的数字格值相等并且中间的数字格必须值也为0
	for(var i=0; i<4; i++){
		for(var j=2; j>=0; j--){
			if(board[i][j] != 0){
				for(var k=3; k>j; k--){
					//判断当前值不为0的数字格右边的数字格必须值为0并且中间的数字格必须值也为0
					if (board[i][k] == 0 && noBlokHorizontalCol(i, j, k, board)) {
						showMoveAnimation(i, j, i, k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					} 
					//判断当前值不为0的数字格与右边的数字格值相等并且中间的数字格必须值也为0
					else if (board[i][k] == board[i][j] && noBlokHorizontalCol(i, j, k, board) && !hasConflicted[i][k]) {
						//move
						showMoveAnimation(i, j, i, k);
						//add
						board[i][k] += board[i][j];
						board[i][j] = 0;
						//add score
						score += board[i][k];
						updateScore(score);

						hasConflicted[i][k] = true;
						continue;
					}

				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}


//上移动
//首先判断是否可以向上移动
function moveUp(){
	if(!canMoveUp(board)){
		return false;
	}
	// 向上移动
	// 第一步，遍历数字格，判断除第一行外有哪些数字格的值是不为0的
	// 第二步，遍历当前值不为0的数字格上边数字格
	// 第三步，向上移动逻辑还要分成两种情况
	   //一种是当前值不为0的数字格上边的数字格必须值为0并且中间的数字格必须值也为0
	   //一种是当前值不为0的数字格与上边的数字格值相等并且中间的数字格必须值也为0
	for(var j=0; j<4; j++){
		for(var i=1; i<4; i++){
			if(board[i][j] != 0){
				for(var k=0; k<i; k++){
					//判断当前值不为0的数字格上边的数字格必须值为0并且中间的数字格必须值也为0
					if (board[k][j] == 0 && noBlokHorizontalRow(i, k, j, board)) {
						showMoveAnimation(i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					} 
					//判断当前值不为0的数字格与上边的数字格值相等并且中间的数字格必须值也为0
					else if (board[k][j] == board[i][j] && noBlokHorizontalRow(i, k, j, board) && !hasConflicted[k][j]) {
						//move
						showMoveAnimation(i, j, k, j);
						//add
						board[k][j] += board[i][j];
						board[i][j] = 0;
						//add score
						score += board[k][j];
						updateScore(score);

						hasConflicted[k][j] = true;
						continue;
					}

				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}


//下移动
//首先判断是否可以向下移动
function moveDown(){
	if(!canMoveDown(board)){
		return false;
	}
	// 向下移动
	// 第一步，遍历数字格，判断除最后一行外有哪些数字格的值是不为0的
	// 第二步，遍历当前值不为0的数字格下边数字格
	// 第三步，向下移动逻辑还要分成两种情况
	   //一种是当前值不为0的数字格下边的数字格必须值为0并且中间的数字格必须值也为0
	   //一种是当前值不为0的数字格与下边的数字格值相等并且中间的数字格必须值也为0
	for(var j=0; j<4; j++){
		for(var i=2; i>=0; i--){
			if(board[i][j] != 0){
				for(var k=3; k>i; k--){
					//判断当前值不为0的数字格下边的数字格必须值为0并且中间的数字格必须值也为0
					if (board[k][j] == 0 && noBlokHorizontalRow(k, i, j, board)) {
						showMoveAnimation(i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					} 
					//判断当前值不为0的数字格与下边的数字格值相等并且中间的数字格必须值也为0
					else if (board[k][j] == board[i][j] && noBlokHorizontalRow(k, i, j, board) && !hasConflicted[k][j]) {
						//move
						showMoveAnimation(i, j, k, j);
						//add
						board[k][j] += board[i][j];
						board[i][j] = 0;
						//add score
						score += board[k][j];
						updateScore(score);

						hasConflicted[k][j] = true;
						continue;
					}

				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}

function isgameover() {
    if (nospace(board) && nomove(board)) {
        gameover();
    }
}

function gameover() {
    alert("gameover!");
    $("#grid-container").append("<div id='gameover' class='gameover'><p>本次得分</p><span>" + score + "</span><a href='javascript:restartgame();' id='restartgamebutton'>Restart</a></div>");
    var gameover = $("#gameover");
    gameover.css("width", "500px");
    gameover.css("height", "500px");
    gameover.css("background-color", "rgba(0, 0, 0, 0.5)");
}