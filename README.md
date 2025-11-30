💰 Finance Management Application

[License](#license) | [React](https://react.dev/) | [Vite](https://vitejs.dev/) | [TailwindCSS](https://tailwindcss.com/) | [Context API](https://react.dev/learn/passing-data-deeply-with-context)


📖 About The Project

Finance Management Application is a modern, responsive, and user-friendly Expense Tracker Web App built using React, Vite, Context API, and TailwindCSS.
It allows users to add, edit, delete, filter, and visualize expenses using interactive charts.
All data is stored in LocalStorage, ensuring persistence even after page refresh.

This project focuses on speed, simplicity, and clean UI, making it perfect for portfolio and real-world use.

✨ Key Features

🔹 Add New Expenses – Description, amount, category, and date <br>
🔹 Edit Existing Expenses – Quick inline editing<br>
🔹 Delete Expenses – With confirmation<br>
🔹 LocalStorage Saving – Data remains after refresh<br>
🔹 Category Filtering – View expenses by category<br>
🔹 Interactive Charts – Pie Chart / Bar Chart using Recharts<br>
🔹 Responsive UI – Fully mobile friendly<br>
🔹 Toast Notifications – Real-time alerts<br>
🔹 Modern UI – TailwindCSS powered styling<br>

📸 Screenshots

![Dashboard Screenshot]<img width="467" height="391" alt="FMS" src="https://github.com/user-attachments/assets/da0fb462-aca4-4fad-b62c-d82a0faa5e8d" />


📁 Project Structure
budgetnow-expense-tracker/
 ├── README.md
 ├── index.html
 ├── package.json
 ├── postcss.config.js
 ├── tailwind.config.js
 ├── vite.config.js
 └── src/
     ├── App.css
     ├── App.jsx
     ├── index.css
     ├── main.jsx
     ├── context/
     │    └── ExpenseContext.jsx
     ├── utils/
     │    └── expenses.js
     └── components/
          ├── ExpenseForm.jsx
          ├── ExpenseList.jsx
          ├── ExpensePieChart.jsx
          ├── ExpenseBarChart.jsx
          ├── Navbar.jsx
          └── Footer.jsx

📂 Key Folders & Files

/context – Global state management (Context API)<br>
/components – Reusable UI components<br>
/utils – Helper functions (formatCurrency, getCategory, etc.)<br>
App.jsx – Main application logic

🏗️ Architecture

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

🛠 Built With

React 18

Vite 5

TailwindCSS 3

Context API

Recharts

React Hot Toast

⚙️ Getting Started
✔ Prerequisites

You must have Node.js installed.

✔ Installation
git clone <your-repo-link>
cd Finance Management Application
npm install

✔ Run the Project
npm run dev

View App:

👉 http://localhost:5173

🛣️ Roadmap

 Add / Edit / Delete Expenses

 LocalStorage Integration

 Pie & Bar Charts

 Responsive UI

📬 Contact

👨‍💻 Umesh Kumar<br>
📧 your-email-here<br>
🌐 GitHub: https://github.com/Umesh590

⭐ Show Some Love!<br><br>

If you liked this project, please ⭐ star the repository on GitHub!
