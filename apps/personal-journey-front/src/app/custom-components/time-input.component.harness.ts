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
    await hours.setInputValue(value);
    await this.forceStabilize();
    //TODO seems to update ui but not formGroup so accessing value with getHours does not work
  }

  async getMinutes() {
    const minutes = await this.getMinutesElement();
    return minutes.getProperty('value');
  }

  async setMinutes(value: string) {
    const minutes = await this.getMinutesElement();
    await minutes.setInputValue(value);
    await this.forceStabilize();
    //TODO seems to update ui but not formGroup so accessing value with getHours does not work
  }
}
