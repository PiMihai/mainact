import * as path from "https://deno.land/std@0.200.0/path/mod.ts";
import { router, sockets } from "../router.ts";
import {
  createReactRenderScript,
  wsClientScript,
} from "../utils/client-scripts.ts";
import { transpileScriptForClient } from "../utils/transpile-script-for-client.ts";
import { watch } from "../utils/watch.ts";

const [inputFile] = Deno.args;

router.get("/app.js", async (ctx) => {
  const { getProps } = await import(path.join(Deno.cwd(), inputFile));
  const data = await getProps();
  const inputFileContents = Deno.readTextFileSync(inputFile);
  const clientScript = `
		${wsClientScript}
		${inputFileContents}
		${createReactRenderScript(data)}
	  `;
  const transpiledClientScript = transpileScriptForClient(clientScript);
  ctx.response.type = "text/javascript";
  ctx.response.body = transpiledClientScript;
});

watch(inputFile, () => {
  sockets.forEach((socket) => {
    socket.send("refresh");
  });
});