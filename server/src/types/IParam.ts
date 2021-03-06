/**
 * The request parameter in URL, for example,
 * `/:as`
 */
export interface IParam {
  as: string;
}

export function IsIParam(val: unknown): val is IParam {
  const v = val as IParam;
  return !!(typeof v === 'object' && typeof v.as === "string");
}
