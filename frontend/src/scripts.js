// Navigate to a specific page URL
const navigateToPage = (pageUrl) => {
  window.location.href = pageUrl;
};

// Add a click listener to a dashboard element
const addClickListenerToDashboard = (dashboard, pageUrl) => {
  dashboard.addEventListener('click', () => {
    navigateToPage(pageUrl);
    console.log(dashboard, 'clicked!');
  });
};

// Selecting dashboard elements
const dashboard1 = document.querySelector('.dashboard-1');
const dashboard2 = document.querySelector('.dashboard-2');
const dashboard3 = document.querySelector('.dashboard-3');

// Adding click listeners to each dashboard element
// NOTE: Separate these events for now. Refactor and clean up later
addClickListenerToDashboard(dashboard1, './pages/overview/hboard-cmh.html');
addClickListenerToDashboard(dashboard2, './pages/overview/index.html');
// addClickListenerToDashboard(dashboard3, './pages/overview/index.html');

// Adding click animation to all dashboard elements
document.querySelectorAll('.dashboard').forEach((dashboard) => {
  dashboard.addEventListener('click', () => {
    dashboard.classList.add('clicked'); // Add the 'clicked' class to initiate the click animation
    setTimeout(() => {
      dashboard.classList.remove('clicked'); // Remove the 'clicked' class after a delay to reset the animation
    }, 300);
  });
});
