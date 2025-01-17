# 🛒 E-Commerce Website

The **E-Commerce Website** is a dynamic and interactive web application designed to showcase details of all the available products. It enables users to explore product information, add items to their cart, and read or submit reviews. This project demonstrates seamless integration between a React-based frontend, a .NET Core backend, and a SQL Server database.

---

## 🌟 Key Features

### Frontend
- 📄 **Dynamic Product Display**: View detailed product information, including name, description, price, image, and stock availability.
- 🛍️ **Add to Cart**: Interact with the backend to add items to the shopping cart.
- 💬 **Reviews**: Fetch and display user reviews, and allow users to submit their own.
- 🎨 **Responsive Design**: Built with CSS to ensure a smooth experience across devices.
- ⚡ **Interactive UI**: Powered by React for a fast and engaging user experience.

### Backend
- 🌐 **RESTful API**: Developed using .NET Core Web API to handle product, review, and cart operations.
- 🗄️ **Database Integration**: SQL Server used for efficient data management.
- 🧩 **Dependency Injection**: Ensures modularity and easier testing.
- 🔒 **Error Handling**: Robust exception management for smoother operation.
- 💾 **ADO.NET**: Facilitates database interactions.

---

## 📡 API Endpoints

### Products
- `GET /api/products` - Retrieve all products.
- `GET /api/products/{id}` - Retrieve details of a specific product.
- `POST /api/products` - For adding new product.

### Reviews
- `POST /api/reviews` - Add a new review for a product.
- `GET /api/reviews/{productId}` - Retrieve all reviews for a specific product.

### Cart
- `POST /api/cart` - Add a product to the shopping cart.

---

## ⚙️ Installation and Setup

Follow these steps to set up the project locally:

### Frontend Setup
1. Clone the Repository:
```bash
   git clone https://github.com/anujkumar-17/E-Commerce-website.git
```

2. Navigate to the frontend directory and install dependencies:
```bash
   cd E-Commerce-website/Frontend/
   npm install
```
3. Start the development server:
```bash
   npm run dev
```

### Backend Setup

1. Navigate to the backend directory and restore dependencies:
```bash
   cd ../Backend
   dotnet restore
```
2. Configure the SQL Server connection in appsettings.json:
```bash
   {
      "ConnectionStrings": {
         "DefaultConnection": "<Your SQL Server Connection String>"
      }
   }
```
3. Run the backend server:
```bash
   dotnet run
```

## Technologies Used

**Frontend:** React.js, CSS

**Backend:** .NET Core Web API, ADO.NET

**Database:** SQL Server