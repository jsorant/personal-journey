export class MissingMemberException extends Error {
  constructor(name: string, className: string) {
    super(`[${className}] Member "${name}" is missing`);
  }
}
