import { args } from "../args.ts";
import { app, router, sockets } from "../router.ts";
import {
  createReactRenderScript,
  wsClientScript,
} from "../utils/client-scripts.ts";
import { transpileScriptForClient } from "../utils/transpile-script-for-client.ts";

export const renderFile = async (fullInputFilePath: string) => {
  const { getProps, extendBackend } = await import(
    `file://${fullInputFilePath}?hash=${new Date().getTime()}`
  );
  if (extendBackend) {
    await extendBackend({ app, router, sockets });
  }
  const { args: getPropsArgs } = args;
  const data = getProps ? await getProps(JSON.parse(getPropsArgs || "{}")) : {};
  const inputFileContents = Deno.readTextFileSync(fullInputFilePath);
  const clientScript = `
          ${wsClientScript}
          ${inputFileContents}
          ${createReactRenderScript(data)}
        `;
  const transpiledClientScript = transpileScriptForClient(clientScript);
  return transpiledClientScript;
};
