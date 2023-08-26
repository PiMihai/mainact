export const watch = async (file: string, callback: () => void) => {
  const watcher = Deno.watchFs(file);
  for await (const event of watcher) {
    if (["any", "access"].includes(event.kind)) {
      continue;
    }

    callback();
  }
};
