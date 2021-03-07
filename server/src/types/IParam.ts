/**
 * The request parameter in URL, for example,
 * `/:channel/:as`
 */
export interface IParam {
  channel: string;
  as: string;
}

export function IsIParam(val: unknown): val is IParam {
  const v = val as IParam;
  return !!(
    typeof v === "object" &&
    typeof v.as === "string" &&
    typeof v.channel === "string"
  );
}
