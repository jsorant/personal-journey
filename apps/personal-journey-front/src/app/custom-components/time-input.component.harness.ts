import { ComponentHarness } from '@angular/cdk/testing';
import { Time } from './time-input.component';

export class TimeInputComponentHarness extends ComponentHarness {
  static hostSelector = 'duckrulz-time-input';

  protected getHoursElement = this.locatorFor('.hours-input');
  protected getMinutesElement = this.locatorFor('.minutes-input');

  async getTimeString() {
    return `${await this.getHours()}:${await this.getMinutes()}`;
  }

  async getHours() {
    const hours = await this.getHoursElement();
    return hours.getProperty('value');
  }

  async setHours(value: string) {
    const hours = await this.getHoursElement();

    await hours.clear();
    // We don't want to send keys for the value if the value is an empty
    // string in order to clear the value. Sending keys with an empty string
    // still results in unnecessary focus events.
    if (value) {
      await hours.sendKeys(value);
    }

    // Some input types won't respond to key presses (e.g. `color`) so to be sure that the
    // value is set, we also set the property after the keyboard sequence. Note that we don't
    // want to do it before, because it can cause the value to be entered twice.
    await hours.setInputValue(value);
  }

  async getMinutes() {
    const minutes = await this.getMinutesElement();
    return minutes.getProperty('value');
  }

  async setMinutes(value: string) {
    const minutes = await this.getMinutesElement();
    await minutes.clear();
    if (value) {
      await minutes.sendKeys(value);
    }
    await minutes.setInputValue(value);
  }
}
