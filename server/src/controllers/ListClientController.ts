import Connections from "../Connections";
import { IController } from "./IController";

interface IParam {
  channel: string;
}

function IsIParam(param: unknown): param is IParam {
  const p = param as IParam;

  return (
    typeof p === 'object' &&
    typeof p.channel === 'string'
  );
}

/**
 * A endpoint to list all online clients: `/list`
 * @param fastify The fastify instance
 */
const ListClientController: IController = (fastify) => {
  fastify.get("/list/:channel", async function ListClient(request, reply) {
    const param = request.params;
    if (IsIParam(param)) {
      reply.code(200);
      return Connections.getInstance(param.channel).listAllId();
    }
    reply.code(400);
    return [];
  });
}

export default ListClientController;