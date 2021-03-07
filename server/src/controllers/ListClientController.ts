import { joined } from "../services/main/joined";
import { leftWrapper } from "../services/main/left";
import { onMessageWrapper } from "../services/main/onMessage";
import { IsIParam } from "../types/IParam";
import { IController } from "./IController";

/**
 * A endpoint to list all online clients: `/list`
 * @param fastify The fastify instance
 */
const ListClientController: IController = (fastify) => {
  fastify.get("/list", async function ListClient(request, reply) {
    return {};
  });
}

export default ListClientController;