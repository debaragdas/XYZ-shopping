## Quick Start Guide for TechHub

### 1. View the Application

The development server automatically starts and displays in the preview. You'll see:
- **Home Page** - Browse all products with filtering
- **Product Details** - Click any product to see full details and reviews
- **Shopping Cart** - Click the cart icon to manage items
- **Wishlist** - Save products for later (click heart icon)
- **Checkout** - Complete your purchase with multiple payment options

### 2. Key Features to Try

#### Search & Filter
1. Go to home page
2. Use the search bar to find products
3. Filter by category, price range, or rating
4. Sort by price or rating

#### Shopping
1. Click on any product card to view details
2. Click "Add to Cart" to add items
3. View cart by clicking the cart icon in header
4. Adjust quantities in the cart
5. Proceed to checkout

#### Wishlist
1. Click the heart icon on any product to add to wishlist
2. Click the wishlist icon in header to see saved items
3. Click "Add to Cart" from wishlist to purchase

#### Checkout
1. Fill in delivery details
2. Choose payment method (UPI, Card, WhatsApp, or COD)
3. Click "Place Order" to complete

#### WhatsApp Support
1. Click the green WhatsApp button in bottom right
2. Chat window opens for support

#### Reviews
1. On product detail page, scroll to "Customer Reviews"
2. Click "Write a Review" to add your own
3. Leave rating and feedback
4. Your review appears instantly

### 3. Customization

#### Change Product Data
Edit `public/data/products.json` to add your products:
```json
{
  "id": "unique-id",
  "name": "Your Product",
  "category": "Category",
  "price": 4999,
  "originalPrice": 7999,
  "image": "/path/to/image.jpg",
  "rating": 4.5,
  "reviews": 100,
  "description": "Description",
  "inStock": true
}
```

#### Update WhatsApp Number
Edit these files to change WhatsApp contact:
- `components/FloatingWhatsApp.tsx`
- `app/checkout/page.tsx`

Replace `919876543210` with your WhatsApp number.

#### Customize Theme
Edit `app/globals.css` to change colors:
- `--primary` - Main brand color
- `--accent` - Highlight color (currently blue)
- `--background` - Background color
- `--foreground` - Text color

#### Add Your Logo
Replace the "T" logo in `components/Header.tsx`:
```jsx
<div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
  <span className="text-accent-foreground font-bold text-lg">T</span>
</div>
```

### 4. Payment Integration

#### UPI Payments
Replace merchant ID in `app/checkout/page.tsx`:
```javascript
const upiLink = `upi://pay?pa=your-upi-id&...`
```

#### Stripe Integration
1. Install Stripe: `pnpm add stripe @stripe/react-js`
2. Add `NEXT_PUBLIC_STRIPE_KEY` to environment variables
3. Update checkout page with Stripe integration

#### WhatsApp Business API
1. Set up WhatsApp Business Account
2. Get your business number
3. Update phone number in checkout and WhatsApp button

### 5. Deployment

#### Deploy to Vercel (Recommended)
```bash
vercel
```

#### Deploy to Netlify
1. Push to GitHub
2. Connect Netlify to GitHub repository
3. Set build command: `npm run build` or `pnpm build`
4. Set publish directory: `.next`

#### Deploy to other platforms
The project is a standard Next.js app and works on any platform supporting Node.js.

### 6. Environment Setup

No required environment variables for basic setup. For advanced features:

```env
# Stripe
NEXT_PUBLIC_STRIPE_KEY=pk_live_xxx

# Analytics
NEXT_PUBLIC_GA_ID=UA-xxx

# WhatsApp Business
WHATSAPP_BUSINESS_NUMBER=91xxxxx
```

### 7. Performance Tips

- Keep product images under 100KB
- Use format: WebP or optimized JPG
- Limit product catalog to 10,000 items for optimal performance
- Enable browser caching for static assets
- Use CDN for image delivery in production

### 8. SEO Configuration

Update `app/layout.tsx` metadata:
```typescript
export const metadata: Metadata = {
  title: 'Your Store - Best Deals',
  description: 'Your store description',
  keywords: ['electronics', 'tech', 'deals'],
}
```

### 9. Troubleshooting

**Cart/Wishlist not saving?**
- Check browser localStorage settings
- Ensure cookies are enabled
- Try clearing cache

**Images not showing?**
- Verify image paths are correct
- Check CORS headers if using external URLs
- Use relative paths for local images

**Checkout errors?**
- Ensure all form fields are filled
- Check browser console for errors
- Verify payment provider credentials

### 10. Next Steps

1. Add more products to `products.json`
2. Integrate payment provider (Stripe, Razorpay, PayU)
3. Set up email notifications
4. Add user authentication
5. Create admin dashboard
6. Deploy to production

## Support

For issues or questions:
1. Check README.md for detailed documentation
2. Review component files for implementation details
3. Use browser developer tools to debug
4. Check Next.js documentation: https://nextjs.org/docs

Happy selling!
