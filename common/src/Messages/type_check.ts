import type { MessageArchitect } from "./architect";
import { MessageType } from "./type";

export function IsMessageArchitect(val: unknown): val is MessageArchitect {
  const v = val as MessageArchitect;

  return (
    // val should be an object
    typeof val === "object" &&
    // val.type should be string (though it is a enum)
    typeof v.type === "string" &&
    // val.data should be string
    typeof v.data === "string"
  );
}

export function IsMessageArchitectFromUser(val: unknown): val is MessageArchitect {
  const v = val as MessageArchitect;
  const hasContentType = (): boolean => {
    if (!(v.type === MessageType.CUSTOM)) return true;
    return !!v.contentType;
  }

  return (
    // val is an instance of MessageArchitect
    IsMessageArchitect(val)
    // and its v.type should be either PLAIN, DATA_URI and custom data.
    && (
      v.type === MessageType.PLAIN
      || v.type === MessageType.DATA_URI
      || v.type === MessageType.CUSTOM
    )
    && hasContentType()
  );
}