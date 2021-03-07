// forked from e93fedcbd7180d9c570d6ab37543b67972aa0207

export enum CustomCloseCode {
  UserDuplicated = 4000,
}

const customCloseCodeDesc: Record<number, string> = {
  4000: "有人已經用您指定的名稱加入此頻道了。",
};

export function getHumanReadableCloseCode(code: number): string {
  return customCloseCodeDesc[code] || code.toString();
}
