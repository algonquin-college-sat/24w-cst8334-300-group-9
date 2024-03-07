// import './components/popup/index.js';
// import './pages/overview/index.js';
// import './pages/boardSelection/index.js';
// import './tickets/celebration/index.js';
// import './tickets/improvement/index.js';

const dashboard1 = document.querySelector('.dashboard-1');
const dashboard2 = document.querySelector('.dashboard-2');
const dashboard3 = document.querySelector('.dashboard-3');
console.log('inside js');
const navigateToDashBoard = (url) => {
  window.location.href = url;
};
dashboard1.addEventListener('click', () => {
  navigateToDashBoard('./pages/overview/index.html');
  console.log('clicked!');
});
