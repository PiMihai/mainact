import { router } from "../router.ts";

router.get("/favicon.ico", (ctx) => {
  ctx.response.status = 404;
});
