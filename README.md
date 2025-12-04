# 💰 Finance Management Application 



![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)
![Status](https://img.shields.io/badge/status-active-brightgreen?style=flat-square)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC?style=flat-square&logo=tailwindcss)

<hr/>


📖 About The Project
---

**Finance Management Application** is a modern, **responsive, and user-friendly** Expense Tracker Web App built using **React, Vite, Context API, and TailwindCSS**.
It allows users to **add, edit, delete, filter, and visualize expenses using interactive charts**.
All data is **stored in LocalStorage**, ensuring persistence even after page refresh.

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

<img width="100%" height="550" alt="FMS2" src="https://github.com/user-attachments/assets/e3e9019d-416b-4376-9390-a8dc20a8511c" />
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
**/components** – Contains all reusable UI components.  
**/context** – App state management (Context API).   
**/pages** – Page-level components.  
**/utils** – Utility functions.  
**App.jsx** – Main application component.  
**main.jsx** – React entry point.


<hr/>

🏗️ Architecture
---
The system follows the **simple client-server architecture**
- **Frontend (React + Tailwind):** Handles UI, state, and interactions.
- **Backend API (Local JSON Server at :3000):** Stores and retrieves the data.
 

```mermaid
flowchart TD
    A[👤 User] --> B[💻 React Frontend]
    B --> C[⚙️ Local API :3000]
    C --> D[🗄️ Data Storage]
```

<hr/>

🛠 Built With
---

- **Frontend**: React 18, vite 5, TailwindCSS 3
- **State Management**: Context API
- **Styling**: TailwindCSS 3

<hr/>

⚙️ Getting Started
---

### **Prerequisites**

- Node.js 18+
- npm / yarn / pnpm
- Local API server running at `http://localhost:3000`

---

### **Installation**

```bash
git clone https://github.com/Umesh590/Finance-Management-App.git
cd Finance-Management-App
npm install
```
<hr/>
 
### **Run** 
```
npm run dev
```
Visit:
```
http://localhost:5173
```
Backend API should be running at:
```
http://localhost:3000
```
<hr/>

📬 Contact
---

👨‍💻 Umesh Kumar<br>
📧 Email: [umeshjha7890@gmail.com](mailto:umeshjha7890@gmail.com)<br>

<hr/>

⭐ **Show Some Love!**
<br><br>

If you liked this project, **please ⭐ star the repository on GitHub!**
