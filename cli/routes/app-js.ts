import * as path from "https://deno.land/std@0.200.0/path/mod.ts";
import { router, sockets } from "../router.ts";
import { watch } from "../utils/watch.ts";
import { renderFile } from "../utils/render-file.ts";
import { args } from "../args.ts";

const {
  _: [inputFile],
} = args;
const fullInputFilePath = path.join(Deno.cwd(), inputFile.toString());

router.get("/app.js", async (ctx) => {
  const transpiledClientScript = await renderFile(fullInputFilePath);
  ctx.response.type = "text/javascript";
  ctx.response.body = transpiledClientScript;
});

watch(fullInputFilePath, () => {
  console.log("Code changed, triggering refresh...");
  sockets.forEach((socket) => {
    socket.send("refresh");
  });
});
