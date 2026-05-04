import { existsSync } from "node:fs"
import { spawn, spawnSync } from "node:child_process"
import { join } from "node:path"
import process from "node:process"

const [command, ...args] = process.argv.slice(2)

if (!command) {
  console.error("Usage: bun scripts/with-esbuild.ts <command> [...args]")
  process.exit(1)
}

const candidates = [
  process.env.ESBUILD_BINARY_PATH,
  join(process.cwd(), "node_modules/esbuild/bin/esbuild"),
  join(process.cwd(), "../cogesto-conseils/node_modules/esbuild/bin/esbuild"),
].filter(Boolean) as Array<string>

const esbuildBinary = candidates.find((candidate) => {
  if (!existsSync(candidate)) return false

  const result = spawnSync(candidate, ["--version"], {
    stdio: "ignore",
  })

  return result.status === 0
})

const child = spawn(command, args, {
  env: {
    ...process.env,
    ...(esbuildBinary ? { ESBUILD_BINARY_PATH: esbuildBinary } : {}),
  },
  shell: process.platform === "win32",
  stdio: "inherit",
})

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal)
    return
  }

  process.exit(code ?? 0)
})
