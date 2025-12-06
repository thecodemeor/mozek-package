# Contributing to Mozek

Thank you for your interest in contributing to **Mozek**.  
As the creator and maintainer of this project, I welcome contributions of any kind —  
bug fixes, feature additions, documentation improvements, or even ideas.

To keep **Mozek** clean, consistent, and enjoyable to work on, please follow the guidelines below.

---

## 🧩 How to Contribute

### 1. Fork & Clone

```bash
git clone https://github.com/<your-username>/mozek.git
cd mozek
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Demo App

```bash
npm run demo
```

### 4. Add New Component

```bash
ng g component moz-[new component] --project=mozek --standalone --inline-template=false --inline-style=false
```

### 5. Build or Update Dist File

```bash
ng build mozek
```

### 6. Serve Demo

```bash
ng serve demo
```