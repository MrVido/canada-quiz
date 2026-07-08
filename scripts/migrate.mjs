import { Pool } from "@neondatabase/serverless";
import { readFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function migrate() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("Set DATABASE_URL first");
    process.exit(1);
  }

  const pool = new Pool({ connectionString: url });
  const migration = readFileSync(
    resolve(__dirname, "../neon/migration.sql"),
    "utf8",
  );

  const cleaned = migration
    .split("\n")
    .filter((line) => !line.trim().startsWith("--"))
    .join("\n");

  const statements = cleaned
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  for (const statement of statements) {
    console.log("Running:", statement.slice(0, 60) + "...");
    await pool.query(statement);
  }

  await pool.end();
  console.log("Migration complete!");
}

migrate().catch((err) => {
  console.error(err);
  process.exit(1);
});
