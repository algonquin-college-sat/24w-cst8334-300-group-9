import { getAllDepartments } from './state/departmentApi.js'; // Import getAllDepartments function from departmentAPI.js

document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Fetch department data from the backend
    const departments = await getAllDepartments();
    console.log(departments);

    // Get reference to the dashboard container
    const dashboardContainer = document.getElementById('dashboardContainer');

    // Process the department data and dynamically generate HTML elements to display it
    departments.data.forEach((department) => {
      const dashboardDiv = document.createElement('div');
      dashboardDiv.classList.add('col-md-6', 'mb-4', 'dashboard');
      dashboardDiv.innerHTML = `
        <div class="card h-100 shadow">
          <div class="card-body">
            <h5 class="card-title">${department.department_name}</h5>
          </div>
        </div>
      `;
      // Add click listener to navigate to the dashboard page
      dashboardDiv.addEventListener('click', () => {
        // navigateToPage(`./dashboard/${department.department_id}`); // Assuming department_id is used in the URL
        navigateToPage('./pages/overview/index.html');
      });
      dashboardContainer.appendChild(dashboardDiv);
    });

    // Adding click animation to all dashboard elements
    document.querySelectorAll('.dashboard').forEach((dashboard) => {
      dashboard.addEventListener('click', () => {
        dashboard.classList.add('clicked');
        setTimeout(() => {
          dashboard.classList.remove('clicked');
        }, 300);
      });
    });
  } catch (error) {
    console.error('Error fetching departments:', error);
  }
});

// Navigate to a specific page URL
const navigateToPage = (pageUrl) => {
  window.location.href = pageUrl;
};

// Add a click listener to a dashboard element
const addClickListenerToDashboard = (dashboard, pageUrl) => {
  dashboard.addEventListener('click', () => {
    navigateToPage(pageUrl);
  });
};
