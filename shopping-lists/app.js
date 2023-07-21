import { Application, } from "./deps.js";
import routes from "./routes/routes.js"

const app = new Application();

app.use(routes.routes());
app.use(routes.allowedMethods());

await app.listen({ port: 7777 });


