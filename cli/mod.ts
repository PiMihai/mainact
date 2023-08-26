import { Application } from "https://deno.land/x/oak@v12.6.0/mod.ts";
import { router } from "./router.ts";
import "./routes/app-js.ts";
import "./routes/favicon.ts";
import "./routes/filename-ext.ts";
import "./routes/refresh.ts";

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
