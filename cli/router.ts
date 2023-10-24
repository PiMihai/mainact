import { Application, Router } from "https://deno.land/x/oak@v12.6.0/mod.ts";

export const app = new Application();
export const router = new Router();
export const sockets = new Set<WebSocket>();
