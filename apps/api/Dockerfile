from oven/bun 
copy . .
run apt-get update
run apt-get install -y openssl
run bun install
run bun prisma generate
run bun run build
expose 3000
cmd ["bun", "run", "start"]