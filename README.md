# BS Bilişim Website

Welcome to the **BS Bilişim Website** repository! This project is a modern, responsive, and user-friendly web application designed to showcase and manage the services and products of BS Bilişim. Built with cutting-edge technologies, the website ensures a seamless experience for both users and administrators.

## Features

- **User-Friendly Interface**: Intuitive design for easy navigation.
- **Account Management**: Users can manage their orders, addresses, favorites, and account details.
- **Admin Dashboard**: Comprehensive admin panel to manage products, orders, users, and site settings.
- **Product Listings**: Dynamic product categories and detailed product pages.
- **Shopping Cart**: Fully functional cart system for a smooth shopping experience.
- **Authentication**: Secure login and registration system.
- **Contact Page**: Dedicated page for users to reach out to BS Bilişim.
- **Responsive Design**: Optimized for all devices, including desktops, tablets, and mobile phones.

## Technologies Used

- **Next.js**: React framework for server-side rendering and static site generation.
- **TypeScript**: Strongly typed programming language for better code quality.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Supabase**: Backend-as-a-service for database and authentication.

## Folder Structure

The project is organized as follows:

```
app/
  globals.css       # Global styles
  layout.tsx        # Main layout file
  page.tsx          # Home page
  account/          # User account-related pages
  admin/            # Admin dashboard pages
  cart/             # Shopping cart page
  ...               # Other pages and components
components/
  common/           # Shared components like Header and Footer
  sections/         # Page sections like Hero, Featured Products
constants/          # Static data like brands
hooks/              # Custom React hooks
lib/                # Utility functions and API calls
public/             # Static assets
store/              # State management files
supabase/           # Database setup scripts
```

## Getting Started

Follow these steps to run the project locally:

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ekrem-A/bs-bilisim-website.git
   ```

2. Navigate to the project directory:
   ```bash
   cd bs-bilisim-website
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

4. Create a `.env.local` file and configure the required environment variables (e.g., Supabase credentials).

### Running the Development Server

Start the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Building for Production

To build the project for production:
```bash
npm run build
# or
yarn build
```

Serve the production build:
```bash
npm run start
# or
yarn start
```

## Deployment

The project is configured for deployment on **Vercel**. Simply connect the repository to your Vercel account, and it will handle the deployment process automatically.

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Thank you for visiting the BS Bilişim Website repository! If you have any questions or feedback, feel free to reach out.