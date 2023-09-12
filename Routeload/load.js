import { readdir } from "fs/promises";

export async function loadRoutes(app) {
  try {
    const routeFiles = await readdir("./Routes");
    for (const file of routeFiles) {
      if (file.endsWith(".mjs")) {
        const routeModule = await import(`../Routes/${file}`);
        const routeName = file.replace(".mjs", "");
        app.use(`/${routeName}`, routeModule.default);
        console.log(`Route loaded: /${routeName}`);
      }
    }
  } catch (error) {
    console.error("Error loading routes:", error);
  }
}
