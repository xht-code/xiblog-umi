export function onRouteChange(opts: any) {
  const { clientRoutes, location } = opts;
  console.log("location: ", location);

  console.log("opts: ", opts);
  console.log("clientRoutes: ", clientRoutes);
  if (clientRoutes.length) {
    const routes = [...clientRoutes];
    const route = [...routes.pop().routes].pop();
    document.title = route.id || "";
  }
}
