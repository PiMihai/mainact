import { app, router } from "./router.ts";
import "./routes/app-js.ts";
import "./routes/favicon.ts";
import "./routes/filename-ext.ts";
import "./routes/refresh.ts";

app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", () => {
  console.log("mainact server started.");
});

await app.listen({ port: 8000 });
