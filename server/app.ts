
import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors, { CorsOptions, CorsRequest } from 'cors';
import cookieParser from "cookie-parser";




// Load environment variables
dotenv.config();

console.log("🔥 Server starting"); // this will now appear clearly


// Import your user routes
import userRoutes from './routes/users';
import protectedRoutes from './routes/protected'
import shopify from './routes/shopify'

import products from './routes/products'

import cart from "./routes/cart"

// Create Express app
const app = express();

// Middleware
app.use(express.json());

// parse JSON bodies


const allowedOrigins = [
  'http://localhost:3000',
  'https://truce-frontend.vercel.app',
];

const corsOptions: CorsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin) return callback(null, true); // allow non-browser requests (like Postman)
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Log requests (optional)
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(cookieParser())

// Routes
app.use('/protected', protectedRoutes)
app.use('/users', userRoutes);
app.use('/products', products)
app.use('/shopify', shopify)
app.use("/cart", cart)


// Optional: serve static files
app.use(express.static(path.join(__dirname, 'public')));

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' });
});

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT: number = parseInt(process.env.PORT || '4000', 10);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
console.log("heyyy")
