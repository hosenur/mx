import cors from "cors";
export default defineNitroPlugin((plugin) => {
  plugin.h3App.use(
    fromNodeMiddleware(
      cors({
        origin: "http://localhost:3000",
        credentials: true,
      }),
    ),
  );
});
