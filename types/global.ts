export enum Env {
  BunRuntimeBucket = "BunRuntimeBucket",
}

export type EnvAllowedValues = keyof typeof Env;
