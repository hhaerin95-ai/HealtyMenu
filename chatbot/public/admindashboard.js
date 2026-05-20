const API = "http://localhost:3000";
let chart;

// 🔒 PROTECT PAGE
if (
  localStorage.getItem("loggedIn") !== "true" ||
  localStorage.getItem("userRole") !== "admin"
) {
  window.location.href = "login.html";
}

// ================== LOGOUT ==================
function logout() {
  Swal.fire({
    title: 'Logout?',
    text: "Are you sure you want to logout?",
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#06b6d4',
    cancelButtonColor: '#ef4444',
    confirmButtonText: 'Yes, logout'
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = 'login.html';
    }
  });
}

// ================== LOAD ALL STATS ==================
async function loadStats() {
  try {
    // Load food records
    const foodRes = await fetch(API + "/food");
    const foodData = await foodRes.json();
    
    // Total Records
    document.getElementById("totalRecords").innerText = foodData.length;
    
    // Average Calories
    if (foodData.length > 0) {
      const totalCalories = foodData.reduce((sum, r) => sum + Number(r.calories), 0);
      const avgCalories = Math.round(totalCalories / foodData.length);
      document.getElementById("avgCalories").innerText = avgCalories;
    } else {
      document.getElementById("avgCalories").innerText = "0";
    }
    
    // User Count
    const userRes = await fetch(API + "/admin/user-count");
    const userData = await userRes.json();
    document.getElementById("userCount").innerText = userData.total;
    
  } catch (err) {
    console.error("❌ Failed to load stats:", err);
  }
}

// ================== LOAD FOOD RECORDS ==================
async function loadFood() {
  const container = document.getElementById("table-container");
  
  try {
    const res = await fetch(API + "/food");
    const data = await res.json();

    if (data.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🍽️</div>
          <p>No food records yet</p>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User Email</th>
            <th>Date</th>
            <th>Meal Type</th>
            <th>Food Name</th>
            <th>Calories</th>
            <th>Carbs</th>
            <th>Protein</th>
            <th>Fat</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          ${data.map(r => `
            <tr>
              <td>${r.id}</td>
              <td>${r.user_email || "-"}</td>
              <td>${r.date}</td>
              <td>
                <span style="
                  display: inline-block;
                  padding: 4px 12px;
                  border-radius: 12px;
                  font-size: 12px;
                  font-weight: 600;
                  ${getMealTypeColor(r.mealType)}
                ">
                  ${r.mealType}
                </span>
              </td>
              <td><strong>${r.foodName}</strong></td>
              <td>${r.calories} kcal</td>
              <td>${r.carbs}g</td>
              <td>${r.protein}g</td>
              <td>${r.fat}g</td>
              <td>
                <button class="delete-btn" onclick="deleteRecord(${r.id})">
                  🗑️ Delete
                </button>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;

    drawChart(data);
    
  } catch (err) {
    console.error("❌ Failed to load food records:", err);
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">⚠️</div>
        <p>Failed to load food records</p>
      </div>
    `;
  }
}

// ================== GET MEAL TYPE COLOR ==================
function getMealTypeColor(mealType) {
  const colors = {
    'breakfast': 'background: #fef3c7; color: #92400e;',
    'lunch': 'background: #dbeafe; color: #1e40af;',
    'dinner': 'background: #d1fae5; color: #065f46;',
    'snack': 'background: #fee2e2; color: #991b1b;'
  };
  return colors[mealType?.toLowerCase()] || 'background: #f3f4f6; color: #374151;';
}

// ================== DELETE RECORD ==================
async function deleteRecord(id) {
  const result = await Swal.fire({
    title: "Delete this record?",
    text: "This action cannot be undone!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ef4444",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel"
  });

  if (!result.isConfirmed) return;

  try {
    const res = await fetch(API + "/food/" + id, {
      method: "DELETE",
      headers: { "x-admin-key": "admin123" }
    });

    if (!res.ok) throw new Error("Delete failed");

    Swal.fire({
      icon: "success",
      title: "Deleted!",
      text: "Record has been deleted.",
      timer: 2000,
      showConfirmButton: false
    });

    // Reload data
    loadStats();
    loadFood();
    
  } catch (err) {
    console.error("❌ Delete failed:", err);
    Swal.fire({
      icon: "error",
      title: "Error!",
      text: "Failed to delete record."
    });
  }
}

// ================== DRAW CHART ==================
function drawChart(data) {
  const calories = {};

  data.forEach(r => {
    const type = r.mealType || "Others";
    calories[type] = (calories[type] || 0) + Number(r.calories);
  });

  if (chart) chart.destroy();

  const ctx = document.getElementById("calorieChart");
  
  if (!ctx) {
    console.error("❌ Chart canvas not found");
    return;
  }

  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: Object.keys(calories),
      datasets: [{
        label: "Total Calories",
        data: Object.values(calories),
        backgroundColor: [
          'rgba(6, 182, 212, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(251, 191, 36, 0.8)',
          'rgba(239, 68, 68, 0.8)'
        ],
        borderColor: [
          'rgba(6, 182, 212, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(251, 191, 36, 1)',
          'rgba(239, 68, 68, 1)'
        ],
        borderWidth: 2,
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 12,
          titleFont: {
            size: 14,
            weight: 'bold'
          },
          bodyFont: {
            size: 13
          },
          callbacks: {
            label: function(context) {
              return `${context.parsed.y} kcal`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          },
          ticks: {
            callback: function(value) {
              return value + ' kcal';
            }
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      }
    }
  });
}

// ================== LOAD USERS ==================
async function loadUsers() {
  const container = document.getElementById("users-table");
  
  try {
    const res = await fetch(API + "/admin/users", {
      headers: {
        'x-admin-key': 'admin123'
      }
    });

    if (!res.ok) throw new Error("Failed to fetch users");

    const users = await res.json();

    if (users.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">👥</div>
          <p>No users registered yet</p>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Username</th>
            <th>Role</th>
            <th>Registered</th>
          </tr>
        </thead>
        <tbody>
          ${users.map(u => `
            <tr>
              <td>${u.id}</td>
              <td>${u.email}</td>
              <td>${u.username || '-'}</td>
              <td>
                <span style="
                  display: inline-block;
                  padding: 4px 12px;
                  border-radius: 12px;
                  font-size: 12px;
                  font-weight: 600;
                  ${u.role === 'admin' 
                    ? 'background: #fee2e2; color: #991b1b;' 
                    : 'background: #dbeafe; color: #1e40af;'}
                ">
                  ${u.role || 'user'}
                </span>
              </td>
              <td>${u.created_at ? new Date(u.created_at).toLocaleDateString() : 'N/A'}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;
    
  } catch (err) {
    console.error("❌ Failed to load users:", err);
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">⚠️</div>
        <p>Failed to load users</p>
      </div>
    `;
  }
}

// ================== INITIALIZE ==================
async function initDashboard() {
  console.log("🚀 Loading admin dashboard...");
  
  try {
    await loadStats();
    await loadUsers();
    await loadFood();
    
    console.log("✅ Dashboard loaded successfully");
  } catch (err) {
    console.error("❌ Dashboard initialization failed:", err);
  }
}

// Run on page load
window.onload = initDashboard;