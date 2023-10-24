import { parse } from "https://deno.land/std@0.204.0/flags/mod.ts";

export const args = parse(Deno.args, {
  string: ["args"],
});
