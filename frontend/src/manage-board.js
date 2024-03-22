/* When Create Board event is triggered, form values are reset to zero and page is redirected to Select Huddle-Board */
/* TODO: Will need to be set up so values are captured before reset */
/* TODO: Redirect to manage new board page */

var elementCreateBoard = document.getElementById('createBoardTrigger');

if (elementCreateBoard != null){

  elementCreateBoard.addEventListener('click', function(){
    document.getElementById('deptName').value='';
    document.getElementById('deptSummary').value='';
    document.getElementById('huddleTime').value='';
    document.getElementById('huddleDay').value='';
    window.location.href="manage-board.html";
  });
}

/* When update board event is triggered, alert says values updated */
/* TODO: Updated values need to be captured when board is updated */
/* TODO: Insert in-line update successful message */
var elementUpdateBoard = document.getElementById('updateBoardBtn');

if (elementUpdateBoard != null){
  elementUpdateBoard.addEventListener('click', function(){
    alert("Board updated");
    window.location.href="index.html";
  });
}
