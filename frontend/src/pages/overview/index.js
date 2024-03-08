// index.js文件内容
function openModal() {
    document.getElementById("ticketModal").style.display = "block";
  }
  
  function closeModal() {
    document.getElementById("ticketModal").style.display = "none";
  }
  
  function addImprovement() {
    console.log("Adding an Improvement Ticket...");
    closeModal();
  }
  
  function addCelebration() {
    console.log("Adding a Celebration Ticket...");
    closeModal();
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.button').addEventListener('click', openModal);
});

