# 🛒 Shophub - Modern E-commerce Platform

A full-featured, responsive e-commerce application built with **Next.js 15**, **React 19**, and **Supabase**. Features a modern UI with cart functionality, product filtering, and real-time database integration.

## ✨ Features

### 🛍️ **Shopping Experience**
- **Product Catalog** - Browse products with advanced filtering and search
- **Product Details** - Comprehensive product pages with image galleries and specifications
- **Shopping Cart** - Real-time cart management with quantity controls
- **Responsive Design** - Optimized for mobile, tablet, and desktop

### 🎨 **Modern UI/UX**
- **Beautiful Interface** - Clean, modern design with Tailwind CSS
- **Loading States** - Skeleton loaders for smooth user experience
- **Interactive Elements** - Hover effects, animations, and intuitive navigation
- **Accessibility** - ARIA labels and keyboard navigation support

### ⚡ **Technical Features**
- **Server-Side Rendering** - Fast page loads with Next.js App Router
- **Real-time Database** - Supabase PostgreSQL with instant updates
- **State Management** - React Context API with useReducer pattern
- **Image Optimization** - Next.js Image component with Supabase storage
- **TypeScript Ready** - Fully typed for better development experience

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Supabase account (for database)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecommerce-next
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🗄️ Database Setup

### Supabase Configuration

1. **Create a new Supabase project** at [supabase.com](https://supabase.com)

2. **Create the products table**
   ```sql
   CREATE TABLE products (
     id BIGSERIAL PRIMARY KEY,
     name TEXT NOT NULL,
     description TEXT,
     price DECIMAL(10,2) NOT NULL,
     category TEXT,
     image_url TEXT,
     rating DECIMAL(2,1) DEFAULT 0,
     stock INTEGER DEFAULT 0,
     specifications JSONB,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

3. **Enable Row Level Security (RLS)**
   ```sql
   ALTER TABLE products ENABLE ROW LEVEL SECURITY;
   
   -- Allow public read access
   CREATE POLICY "Allow public read access" ON products
   FOR SELECT USING (true);
   ```

4. **Configure Storage** (for product images)
   - Create a storage bucket named `product-images`
   - Set bucket to public for image access

## 📁 Project Structure

```
ecommerce-next/
├── app/                    # Next.js App Router pages
│   ├── cart/              # Shopping cart page
│   ├── shop/              # Product catalog page
│   ├── product/[pid]/     # Dynamic product detail pages
│   ├── layout.js          # Root layout with navigation
│   └── page.js            # Homepage
├── components/            # Reusable React components
│   ├── Navbar.jsx         # Navigation with cart badge
│   ├── Footer.jsx         # Site footer
│   ├── ProductCard.jsx    # Product display component
│   ├── SkeletonLoader.jsx # Loading animations
│   └── ClientProviders.jsx # Context providers wrapper
├── contexts/              # React Context for state management
│   └── CartContext.js     # Global cart functionality
├── lib/                   # Utility libraries
│   └── supabase.js        # Database client configuration
└── public/               # Static assets
```

## 🛠️ Technology Stack

### **Frontend**
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library with latest features
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Lucide React](https://lucide.dev/)** - Beautiful, customizable icons

### **Backend & Database**
- **[Supabase](https://supabase.com/)** - PostgreSQL database with real-time features
- **[Supabase Storage](https://supabase.com/storage)** - File storage for product images

### **Development Tools**
- **[ESLint](https://eslint.org/)** - Code linting and formatting
- **[PostCSS](https://postcss.org/)** - CSS processing

## 🎯 Key Features Explained

### **Cart Management**
- Persistent cart state using localStorage
- Real-time quantity updates
- Automatic total calculations
- Hydration-safe implementation

### **Product Filtering**
- Category-based filtering
- Search functionality
- Price range filtering
- Real-time results

### **Responsive Design**
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interactions
- Optimized for all screen sizes

### **Performance**
- Server-side rendering
- Image optimization
- Code splitting
- Efficient database queries

## 🚀 Deployment

### **Vercel (Recommended)**

1. **Connect your repository** to [Vercel](https://vercel.com)

2. **Add environment variables** in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. **Deploy** - Automatic deployments on every push

### **Other Platforms**
- **Netlify** - Add build command: `npm run build`
- **Railway** - Direct deployment from GitHub
- **DigitalOcean App Platform** - Container-based deployment

## 🔧 Development

### **Available Scripts**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### **Code Style**
- Follow React best practices
- Use TypeScript for type safety
- Implement proper error boundaries
- Write descriptive comments

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check the [Next.js Documentation](https://nextjs.org/docs)
- Review [Supabase Documentation](https://supabase.com/docs)
