// Lists every route the app answers ("GET /healthz"). The routes test compares this with test/routes.json,
// so a branch that silently drops an existing route fails the tests before it can be merged.
export function listRoutes(app) {
  const out = [];
  const walk = (stack, prefix) => {
    for (const layer of stack) {
      if (layer.route) {
        for (const m of Object.keys(layer.route.methods)) out.push(`${m.toUpperCase()} ${prefix}${layer.route.path}`);
      } else if (layer.name === "router" && layer.handle?.stack) {
        walk(layer.handle.stack, prefix + (layer.handle.mountPath || ""));
      }
    }
  };
  walk(app._router.stack, "");
  return [...new Set(out)].sort();
}

// express.Router() does not remember where it was mounted; we note it so listRoutes can print full paths.
export function mount(app, path, router) {
  router.mountPath = path;
  app.use(path, router);
}
