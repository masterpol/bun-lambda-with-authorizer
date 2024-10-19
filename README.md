# bun-lambda-with-authorizer
Use bun lambda runtime with Authorizer function using a local fork of bun, using cloudformation as a base for the definition of the resources.

⚠️ **this project is an example of what you need to do to make authorizer work, and requires changing the runtime code the build process is just me playing with bun feel free to change to something more common** ⚠️

## Some Things to have in mind
1. I open an [issue](https://github.com/oven-sh/bun/issues/14139) in bun requesting this change.
2. this project is an example of the code working.
3. majority of the tests were made locally using SAM.

## What you need to make this work

- [Docker](https://www.docker.com/products/docker-desktop/)
- [SAM](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-getting-started.html)
- [Bun](https://bun.sh/docs/installation) 

main functions are defined in `functions/` folder but were built for use in the template.

**Important**
you need to run `sam init` in the root folder and specify `1 - AWS Quick Start Templates` with the template location `template.yaml`.

### Env
you can define whatever you need in .env file

### scripts 
some useful scripts to run the project

- `bun start` 
- `bun build` 
- `bun deploy` 
- `bun release` 

### Test the lambda
just call the api from your local with the correct authorizer method:

```bash
curl --header "Authorization: Bearer valid-token" \
  --request POST \
  http://<api-gateway-endpoint>/baselambda 
```