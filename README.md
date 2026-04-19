# TechHub - Professional E-Commerce Platform

A modern, fully-functional e-commerce platform built with Next.js 16, React 19, TypeScript, and Tailwind CSS. TechHub features an intuitive shopping experience with advanced filtering, wishlist management, multiple payment options, and WhatsApp integration.

## Features

### Core Shopping Features
- **Product Catalog** - Browse 1000+ tech products with advanced search and filtering
- **Search & Filters** - Real-time search, category filtering, price range selection, and rating filters
- **Product Details** - High-resolution images, detailed descriptions, ratings, reviews, and related products
- **Shopping Cart** - Full cart management with quantity adjustment and persistent storage
- **Wishlist** - Save favorite products for later with persistent storage
- **Customer Reviews** - Read and write product reviews with star ratings

### Payment & Checkout
- **Multiple Payment Methods**
  - UPI (Google Pay, PhonePe, Paytm)
  - Credit/Debit Card
  - Cash on Delivery (COD)
  - WhatsApp Ordering
- **Secure Checkout** - Complete address verification and order confirmation
- **Order Summary** - Clear pricing breakdown with tax and shipping information

### User Experience
- **Dark Theme UI** - Modern dark interface with accent blue highlights
- **Responsive Design** - Mobile-first design that works perfectly on all devices
- **Floating WhatsApp Button** - Quick access to customer support
- **Smart Navigation** - Sticky header with cart and wishlist indicators
- **Loading States** - Smooth transitions and loading animations

## Tech Stack

- **Framework**: Next.js 16 with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Storage**: localStorage for cart and wishlist
- **Icons**: Built-in SVG icons
- **Product Data**: JSON-based product catalog

## Project Structure

```
app/
├── page.tsx              # Home page with product listing
├── layout.tsx            # Root layout with providers
├── globals.css           # Global styles
├── cart/
│   └── page.tsx          # Shopping cart page
├── wishlist/
│   └── page.tsx          # Wishlist page
├── checkout/
│   └── page.tsx          # Checkout page
└── product/
    └── [id]/
        └── page.tsx      # Product detail page

components/
├── Header.tsx            # Navigation header with search
├── ProductCard.tsx       # Product card component
├── ProductReviews.tsx    # Review system component
└── FloatingWhatsApp.tsx  # WhatsApp support button

context/
├── CartContext.tsx       # Cart state management
└── WishlistContext.tsx   # Wishlist state management

lib/
├── types.ts              # TypeScript type definitions
└── utils.ts              # Utility functions

public/
└── data/
    └── products.json     # Product catalog
```

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd techhub
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
pnpm build
pnpm start
```

## Configuration

### Update WhatsApp Number
In `components/FloatingWhatsApp.tsx`, replace the WhatsApp number:
```typescript
const whatsappNumber = '919876543210' // Replace with your number
```

Also update in `app/checkout/page.tsx` for WhatsApp orders.

### Add Your Products
Edit `public/data/products.json` to add your own products:
```json
{
  "id": "unique-id",
  "name": "Product Name",
  "category": "Category",
  "price": 4999,
  "originalPrice": 7999,
  "image": "/path/to/image.jpg",
  "rating": 4.5,
  "reviews": 100,
  "description": "Product description",
  "inStock": true
}
```

## Features in Detail

### Shopping Experience
- **Smart Filtering**: Filter by category, price range, and minimum rating
- **Sort Options**: Sort by price (low to high, high to low) or rating
- **Product Images**: Lazy-loaded images with fallback for missing images
- **Stock Status**: Real-time stock information

### Cart Management
- **Persistent Storage**: Cart data saved to localStorage
- **Quantity Management**: Adjust quantities directly from cart
- **Live Updates**: Real-time total calculation
- **Quick Actions**: Remove items or clear entire cart

### Checkout Flow
- **Form Validation**: Complete address verification
- **Order Summary**: Itemized breakdown with tax calculation
- **Payment Integration**: 
  - UPI deep linking (ready for integration)
  - Card payment fields (ready for Stripe integration)
  - WhatsApp ordering with auto-generated messages
  - Cash on Delivery option

### Reviews System
- **Read Reviews**: View customer ratings and feedback
- **Write Reviews**: Submit your own experience
- **Rating Distribution**: Visual representation of ratings
- **Verified Purchases**: Badge for verified buyers

## Performance Optimizations

- Image lazy loading with error handling
- Responsive images for different screen sizes
- Optimized CSS with Tailwind utilities
- Efficient state management with Context API
- Quick loading transitions with skeleton screens

## Responsive Design

- **Mobile**: Optimized for small screens (< 640px)
- **Tablet**: Enhanced layout for medium screens (640px - 1024px)
- **Desktop**: Full-featured experience for large screens (> 1024px)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- Stripe payment integration
- User authentication and accounts
- Admin dashboard for inventory management
- Email notifications
- Advanced analytics
- Product recommendations
- Bulk operations
- Inventory management

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically deploy on push

```bash
vercel
```

### Deploy to Other Platforms

The project is a standard Next.js app and can be deployed to:
- Netlify
- Railway
- Render
- AWS
- DigitalOcean

## Environment Variables

Currently, no environment variables are required. To add payment processing:

```env
NEXT_PUBLIC_STRIPE_KEY=your_stripe_key
NEXT_PUBLIC_UPI_MERCHANT_ID=your_merchant_id
WHATSAPP_BUSINESS_NUMBER=your_whatsapp_number
```

## Troubleshooting

### Products not loading
- Check if `public/data/products.json` exists
- Verify JSON format is valid

### Cart/Wishlist data not persisting
- Ensure localStorage is enabled in browser
- Check browser privacy settings

### Images not displaying
- Verify image paths are correct
- Check CORS settings if using external image URLs

## Support

For issues or questions, contact support via WhatsApp (integrated in app) or email.

## License

This project is open source and available under the MIT License.

## Credits

Built with Next.js, React, TypeScript, and Tailwind CSS.
