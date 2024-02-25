export class EmptyMemberException extends Error {
  constructor(name: string, className: string) {
    super(`[${className}] Member "${name}" is empty`);
  }
}
