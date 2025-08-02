//https://nitro.unjs.io/config
export default defineNitroConfig({
  srcDir: "server",
  routeRules: {
    "/**": {
      cors: true,
      headers: {
        "Access-Control-Allow-Origin": "https://rahaman.email",
        "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Credentials": "true",
      },
    },
    "/listener": {
      cors: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Credentials": "true",
      },
    },
  },
  runtimeConfig: {
    DATABASE_URL: "",
  },
});
