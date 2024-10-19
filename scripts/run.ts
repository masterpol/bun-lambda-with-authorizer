import { $ } from "bun";
import { Env } from "../types/global";

const keys = Object.keys(Env);
const params = keys.map(key => [key, process.env[key]].join("="));

await $`sam local start-api --profile ${process.env.PROFILE} --parameter-overrides ${params.join(",")} --debug`;