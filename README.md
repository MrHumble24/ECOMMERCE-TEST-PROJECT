# EShop

## A brief description of what this project does and who it's for:

#### EShop is a modern, responsive eCommerce website built using cutting-edge web technologies. This project is designed to deliver a sleek, user-friendly shopping experience with features such as product search, categories, and a shopping cart.

## About the Project

EShop is a comprehensive online shopping platform designed to meet the needs of modern customers. With a clean and intuitive interface, it enables users to browse, search, and purchase products with ease. The project is built with performance, scalability, and maintainability in mind.

## Technologies Used

**Client:** React, TypeScript, Vite, Mantine UI

**Server:** API Integration

**State Management:** Zustand

**Version Control:** Git

**Deployment:** Vercel

## Getting Started

To get a local copy up and running, follow these simple steps.

**Prerequisites**

    -Node.js (v14 or higher)

    -Yarn (or npm)

    -Vite (for development)

**Installation:**

## Installation

1.Clone the repo:

```bash
  git clone https://github.com/your-username/eshop.git
```

2.Install dependencies:

```bash
  yarn install
```

3.Run the development server:

```bash
yarn dev
```

4.Build for production:

```bash
yarn build
```

4.Preview the production build:

```bash
yarn preview
```

**Features**

    - Product Listing: Browse products by category.
    - Search: Find products by name or keyword.
    - Dark Mode Toggle: Switch between light and dark modes.
    - User Authentication: Simple login and sign-up flow.
    - Shopping Cart: Add products to the cart and proceed to checkout.
    - Responsive Design: Optimized for both desktop and mobile devices.

## Folder Structure

```graphql
├── public/                # Static files
├── src/
│   ├── api/               # API client
│   ├── assets/            # Images and assets
│   ├── components/        # Reusable components
│   │   ├── common/        # Common UI components
│   │   └── layouts/       # Page layouts
│   ├── features/          # Feature-specific modules
│   ├── stores/            # Zustand state management stores
│   ├── styles/            # CSS Modules for styling
│   └── helpers/           # Utility functions
├── dist/                  # Production build
├── .vscode/               # VSCode settings
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
├── package.json           # Project metadata and dependencies
└── README.md              # Project documentation
```
