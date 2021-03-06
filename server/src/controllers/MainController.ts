import { joined } from "../services/main/joined";
import { leftWrapper } from "../services/main/left";
import { onMessageWrapper } from "../services/main/onMessage";
import { IsIParam } from "../types/IParam";
import { IController } from "./IController";

/**
 * Main controller: `/:channel/:as`
 * @param fastify The fastify instance
 */
const MainController: IController = (fastify) => {
  fastify.get("/:channel/:as", { websocket: true }, function wsHandler(connection, req) {
    if (!IsIParam(req.params)) return;
    
    joined(connection, req, req.params);
    connection.socket.on("message", onMessageWrapper(req, req.params));
    connection.socket.on("close", leftWrapper(connection, req, req.params));
  });
}

export default MainController;