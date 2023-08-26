import { parse, print, transform } from "https://deno.land/x/swc@0.2.1/mod.ts";

export const transpileScriptForClient = (script: string) => {
  const ast = parse(script, {
    syntax: "typescript",
    tsx: true,
  });

  ast.body = ast.body.filter(
    (e) =>
      !(
        e.type == "ExportDeclaration" &&
        e.declaration.type == "VariableDeclaration" &&
        e.declaration.declarations[0].type == "VariableDeclarator" &&
        e.declaration.declarations[0].id.type == "Identifier" &&
        e.declaration.declarations[0].id.value == "getProps"
      )
  );

  const recompiledAst = print(ast, {
    jsc: {
      parser: {
        syntax: "typescript",
        tsx: true,
      },
    },
  });

  const transpiledAst = transform(recompiledAst.code, {
    jsc: {
      target: "es2022",
      parser: {
        syntax: "typescript",
        tsx: true,
      },
      minify: {
        compress: true,
        mangle: true,
        inlineSourcesContent: true,
      },
    },
  });

  return transpiledAst.code;
};
