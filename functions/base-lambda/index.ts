import { getAutorizationData } from '@/helpers/authorization';
import { CreateResponse } from '@/helpers/lambda';

export default {
  async fetch(event: Request) {
    console.log("[Base lambda]: event", event);
    const auth = getAutorizationData(event.headers);

    return CreateResponse(200, { data: { name: "123", ...auth} });
  }
}
