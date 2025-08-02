import cors from "cors";
export default defineNitroPlugin((plugin) => {
  plugin.h3App.use(
    fromNodeMiddleware(
      cors({
        origin: [
          "https://localhost:3000",
          "https://mx-app-production.up.railway.app",
          "https://rahaman.email",
        ],
        credentials: true,
      })
    )
  );
});
