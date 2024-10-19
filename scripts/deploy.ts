import { $ } from "bun";
import { Env } from "../types/global";

const keys = Object.keys(Env);
const params = keys.map(key => [key, process.env[key]].join("="));
const stackName = process.env.STACK_NAME ?? "infra";

await $`sam deploy --stack-name ${stackName} --profile ${process.env.PROFILE} --parameter-overrides ${params.join(",")} --debug`;