export class TimeHelper {
  static toHtmlTimeInputValue(date: Date): string {
    return date.toTimeString().substring(0, 5);
  }

  static toHtmlDateInputValue(date: Date): string {
    return date.toLocaleDateString('en-CA');
  }
}
