💰 Finance Management Application
---

![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)
![Status](https://img.shields.io/badge/status-active-brightgreen?style=flat-square)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC?style=flat-square&logo=tailwindcss)

<hr/>


📖 About The Project
---

Finance Management Application is a modern, responsive, and user-friendly Expense Tracker Web App built using React, Vite, Context API, and TailwindCSS.
It allows users to add, edit, delete, filter, and visualize expenses using interactive charts.
All data is stored in LocalStorage, ensuring persistence even after page refresh.

This project focuses on speed, simplicity, and clean UI, making it perfect for portfolio and real-world use.
<hr/>

✨ Key Features
---

-  🔸 **Add New Expenses** – Description, amount, category, and date.
-  ✏️ **Edit Existing Expenses** – Quick inline editing.
-  🗑️ **Delete Expenses** – With confirmation.
-  💾 **LocalStorage Saving** – Data remains after refresh.
-  🏷️ **Category Filtering** – View expenses by category.
-  📊 **Interactive Charts** – Pie Chart / Bar Chart using Recharts.
-  📱 **Responsive UI** – Fully mobile friendly.
-  🔔 **Toast Notifications** – Real-time alerts.
-  🎨 **Modern UI** – TailwindCSS powered styling.

<hr/>

📸 Screenshots
---
### **Main dashboard**

<img width="839" height="450" alt="FMS2" src="https://github.com/user-attachments/assets/e3e9019d-416b-4376-9390-a8dc20a8511c" />
<hr/>

📁 Directory structure
---
The Project is organized as follows:

```
Directory structure:
└── umesh590-finance-management-app/
    ├── README.md
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── App.jsx
        ├── index.css
        ├── main.jsx
        ├── components/
        │   ├── Dashboard.jsx
        │   ├── ExpenseBarChart.jsx
        │   ├── ExpenseChart.jsx
        │   ├── ExpenseForm.jsx
        │   ├── ExpenseList.jsx
        │   ├── ExpensePieChart.jsx
        │   └── ExpenseSummary.jsx
        ├── context/
        │   └── ExpenseContext.jsx
        ├── layouts/
        │   └── DashboardLayout.jsx
        ├── pages/
        │   ├── Index.jsx
        │   └── NotFound.jsx
        └── utils/
            └── expenses.js
```
<hr/>

📂 Key Folders & Files
---

/context – Global state management (Context API)<br>
/components – Reusable UI components<br>
/utils – Helper functions (formatCurrency, getCategory, etc.)<br>
App.jsx – Main application logic

<hr/>

🏗️ Architecture
---

BudgetNow follows a clean component-based architecture:

Frontend (React + TailwindCSS)

Handles UI rendering

State managed using Context API

Charts rendered using Recharts

Data stored using LocalStorage API

Core Concepts

useState

useEffect

Context API (Global store)

LocalStorage read/write
<hr/>

🛠 Built With
---

- React 18
- Vite 5
- TailwindCSS 3
- Context API
- Recharts
- React Hot Toast
<hr/>
⚙️ Getting Started
✔ Prerequisites

You must have Node.js installed.

<hr/>
✔ Installation
git clone <your-repo-link>
cd Finance Management Application
npm install
<hr/>
 
✔ Run the Project
npm run dev

View App:

👉 http://localhost:5173

<hr/>

📬 Contact
---

👨‍💻 Umesh Kumar<br>
📧 Email: [umeshjha7890@gmail.com](mailto:umeshjha7890@gmail.com)<br>

<hr/>

⭐ Show Some Love!<br><br>

If you liked this project, please ⭐ star the repository on GitHub!
