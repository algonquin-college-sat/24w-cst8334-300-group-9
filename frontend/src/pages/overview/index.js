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

// Jeremy Wang adds a function on 2024-03-09
function addImprovement() {
  // Redirects to the Improvement Ticket page
  window.location.href = "../../tickets/improvement/index.html";
}

//Similar to the Improvement Ticket page, it will redirect the user to the Celebration Ticket page
function addCelebration() {
  window.location.href = "../../tickets/celebration/index.html";
}