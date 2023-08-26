import * as path from "https://deno.land/std@0.200.0/path/mod.ts";
import { router } from "../router.ts";
import { transpileScriptForClient } from "../utils/transpile-script-for-client.ts";

router.get("/:filename.:ext", async (ctx) => {
  const scriptContents = await Deno.readTextFile(
    path.join(Deno.cwd(), `${ctx.params.filename}.${ctx.params.ext}`)
  );
  const response = transpileScriptForClient(scriptContents);
  ctx.response.type = "text/javascript";
  ctx.response.body = response;
});
router.get("/", (ctx) => {
  const html = `
	  <!DOCTYPE html>
	  <html>
		<body>
		  <div id="root"></div>
		  <script type="module" src="./app.js"></script>
		</body>
	  </html>
	`;

  ctx.response.body = new TextEncoder().encode(html);
});
