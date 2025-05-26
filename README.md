
# HR Dashboard

## 🛠️ Setup Instructions

Follow the steps below to set up and run the project locally:

### 1. **Clone the Repository**

```bash
git clone https://github.com/your-username/Hr-Dashboard.git
cd Hr-Dashboard
```

### 2. **Install Dependencies**

Make sure you have Node.js installed. Then run the following command:

```bash
npm install
```

### 3. **Run the Development Server**

Start the development server with:

```bash
npm run dev
```

Then open your browser and navigate to:

```
http://localhost:3000
```

---

## ✅ Features Implemented

### 🏠 Dashboard Homepage (`/`)
- Displays 20 employees fetched from `https://dummyjson.com/users?limit=20`
- Employee card includes:
  - Full Name, Email, Age, Department
  - Performance rating (1–5 stars)
  - Buttons: `View`, `Bookmark`, `Promote`

### 🔍 Search & Filter
- Search bar filters by name, email, or department (case-insensitive)
- Multi-select filter by department and performance rating

### 👤 Dynamic Employee Profile (`/employee/[id]`)
- Detailed user profile with:
  - Address, Phone, Bio, Past performance history
  - Tabs: `Overview`, `Projects`, `Feedback` (with dynamic mock data)

### 📑 Bookmark Manager (`/bookmarks`)
- Lists all bookmarked employees
- Allows removing bookmarks
- UI actions: `Promote`, `Assign to Project`

### 📊 Analytics Page (`/analytics`)
- Interactive charts (via Chart.js) showing:
  - Department-wise average ratings
  - Bookmark trends

---

## 🌙 Additional Features

- **Dark/Light mode** toggle using Tailwind CSS
- **Reusable Components**: Card, Badge, Modal, Button
- **Responsive Design** from mobile to desktop
- **Modular Folder Structure**: `components/`, `hooks/`, `lib/`, etc.


---

## 📸 Screenshots

### Dashboard Homepage Light Mode

![Dashboard Light Mode](assets/Dashboard-Page-Light-Mode.png)  


### Dashboard Homepage Light Mode

![Dashboard Dark Mode](assets/Dashboard-Page-Dark-Mode.png)




### Searching Employees

![Searching Employees](assets/Searching-Employees.png)



### Employee Details Page

![Employee Details 1](assets/Employee-Details-1.png)  


![Employee Details 2](assets/Employee-Details-2.png)  


![Employee Details 3](assets/Employee-Details-3.png)  


![Employee Details 4](assets/Employee-Details-4.png)




### Bookmarked Employees Page

![Bookmarked Employees](assets/Bookmarked-Employees.png)




### Analytics Page

![Analytics 1](assets/Analytics-1.png)  

![Analytics 2](assets/Analytics-2.png)  

![Analytics 3](assets/Analytics-3.png)

---
