//https://nitro.unjs.io/config
export default defineNitroConfig({
  compatibilityDate: "2025-09-19",

  srcDir: "server",
  routeRules: {
    "*": { cors: true },
  },
  preset: "cloudflare_module",
  cloudflare: {
    deployConfig: true,
    nodeCompat: true,
  },
});
