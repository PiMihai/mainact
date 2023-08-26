import * as path from "https://deno.land/std@0.200.0/path/mod.ts";
import { router, sockets } from "../router.ts";
import {
  createReactRenderScript,
  wsClientScript,
} from "../utils/client-scripts.ts";
import { transpileScriptForClient } from "../utils/transpile-script-for-client.ts";
import { watch } from "../utils/watch.ts";

const [inputFile] = Deno.args;
const fullInputFilePath = `file://${path.join(Deno.cwd(), inputFile)}`;

router.get("/app.js", async (ctx) => {
  const { getProps } = await import(fullInputFilePath);
  const data = await getProps();
  const inputFileContents = Deno.readTextFileSync(fullInputFilePath);
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
