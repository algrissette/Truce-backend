import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors, { CorsOptions } from 'cors';
import cookieParser from "cookie-parser";

// Load environment variables
dotenv.config();

console.log("🔥 Server starting");

// Import your routes
import userRoutes from './routes/users';
import protectedRoutes from './routes/protected';
import shopify from './routes/shopify';
import products from './routes/products';
import cart from "./routes/cart";

// Create Express app
const app = express();

// -----------------------------------------------
// 1. CORS — must be first, before everything else
// -----------------------------------------------
const allowedOrigins = [
  "http://localhost:3000",
  "https://truce-frontend.vercel.app",
  "https://trucelofficiel.shop",
  "https://www.trucelofficiel.shop",
];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    const allowed =
      allowedOrigins.includes(origin) ||
      origin.endsWith("trucelofficiel.shop") ||
      origin.includes("vercel.app");

    if (allowed) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // handle preflight OPTIONS requests

// -----------------------------------------------
// 2. Body parsers
// -----------------------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// -----------------------------------------------
// 3. Request logger
// -----------------------------------------------
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// -----------------------------------------------
// 4. Routes
// -----------------------------------------------
app.use('/protected', protectedRoutes);
app.use('/users', userRoutes);
app.use('/products', products);
app.use('/shopify', shopify);
app.use("/cart", cart);

// -----------------------------------------------
// 5. Static files
// -----------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));

// -----------------------------------------------
// 6. 404 handler
// -----------------------------------------------
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' });
});

// -----------------------------------------------
// 7. Global error handler
// -----------------------------------------------
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// -----------------------------------------------
// 8. Start server
// -----------------------------------------------
const PORT: number = parseInt(process.env.PORT || '4000', 10);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});