import { Hono } from "hono";
import { handle } from "hono/vercel";

import authRoutes from "@/features/auth/server/route";
import challengesRoutes from "@/features/challenges/server/route";
import classesRoutes from "@/features/classes/server/route";
import dashboardRoutes from "@/features/dashboard/server/route";
import profileRoutes from "@/features/profile/server/route";
import { cors } from "hono/cors";

const app = new Hono().basePath("/api");

// Enable CORS for mobile apps
app.use('/*', cors({
    origin: ['http://localhost:3000', 'http://localhost:3002', 'capacitor://localhost', 'ionic://localhost'],
    credentials: true,
  }));

  app.get('/', (c) => {
    return c.json({ message: 'Coder API is running' });
  });

const _routes = app
  .route("/auth", authRoutes)
  .route("/challenges", challengesRoutes)
  .route("/classes", classesRoutes)
  .route("/dashboard", dashboardRoutes)
  .route("/profile", profileRoutes);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
export const PATCH = handle(app);

export type AppType = typeof _routes;