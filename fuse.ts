import { fusebox, sparky } from "fuse-box";
import { IRunProps } from "fuse-box/config/IRunProps";
import * as path from "path";

class Context {
  isProduction: boolean = false;
  runServer: boolean = false;

  getServerConfig() {
    return fusebox({
      target: "server",
      entry: "src/index.ts",
      dependencies: { include: ["tslib"] },
      cache: {
        enabled: !!this.runServer,
        root: ".fusebox/.cache"
      },
      compilerOptions: {
        buildTarget: "server"
      },
      hmr: {
        enabled: !this.isProduction
      }
    });
  }

  getServerRunProps(): IRunProps {
    return {
      target: "server",
      bundles: {
        distRoot: "./dist",
        codeSplitting: {
          path: path.resolve(__dirname, "./dist")
        }
      }
    };
  }
}
const { task, rm } = sparky(Context);

task("default", async ctx => {
  ctx.runServer = true;
  ctx.isProduction = false;

  await rm("./dist");
  await rm("./fusebox");

  const server = ctx.getServerConfig();
  const response = await server.runDev(ctx.getServerRunProps());
  response.onComplete(p => p.server?.start());
});

task("preview", async ctx => {
  ctx.runServer = true;
  ctx.isProduction = true;

  await rm("./dist");
  await rm("./fusebox");

  const server = ctx.getServerConfig();
  const response = await server.runProd(ctx.getServerRunProps());
  response.onComplete(p => p.server?.start());
});

task("dist", async ctx => {
  ctx.runServer = false;
  ctx.isProduction = true;

  await rm("./dist");
  await rm("./fusebox");

  const server = ctx.getServerConfig();
  await server.runProd(ctx.getServerRunProps());
});
