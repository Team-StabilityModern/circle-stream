import { MessageArchitect } from "./MessageArchitect";
/**
 * The response to the client.
 *
 * It depends on MessageArchitect, but add the sender.
 */
export interface IResponse extends MessageArchitect {
    /** Who sent it? */
    as: string;
}
export declare function IsIResponse(data: unknown): data is IResponse;
//# sourceMappingURL=IResponse.d.ts.map