export const pushAll = <T>(array: T[], values: T[]) => Array.prototype.push.apply(array, values);
