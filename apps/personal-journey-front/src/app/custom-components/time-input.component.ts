/* eslint-disable */

import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  Optional,
  Self,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NgControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_FORM_FIELD,
  MatFormField,
  MatFormFieldControl,
} from '@angular/material/form-field';
import { Subject } from 'rxjs';

const HOURS_LENGTH = 2;
const MINUTES_LENGTH = 2;

export class Time {
  private constructor(public hours: string, public minutes: string) {}

  static MIDNIGHT = new Time('00', '00');

  static buildWithStrings(hours: string, minutes: string) {
    return new Time(hours, minutes);
  }

  static buildWithNumbers(hours: number, minutes: number) {
    let hoursStr = hours.toString();
    if (hoursStr.length === 1) hoursStr = 0 + hoursStr;
    let minutesStr = minutes.toString();
    if (minutesStr.length === 1) minutesStr = 0 + minutesStr;
    return Time.buildWithStrings(hoursStr, minutesStr);
  }

  static buildWithDate(date: Date) {
    return Time.buildWithNumbers(date.getHours(), date.getMinutes());
  }

  applyCurrentTimeInto(date: Date): Date {
    const hours = this.hoursToNumber();
    const minutes = this.minutesToNumber();
    return new Date(date.setHours(hours, minutes));
  }

  hoursToNumber(): number {
    return Number.parseInt(this.hours);
  }

  minutesToNumber(): number {
    return Number.parseInt(this.minutes);
  }
}

@Component({
  selector: 'duckrulz-time-input',
  templateUrl: 'time-input.component.html',
  styleUrls: ['time-input.component.css'],
  providers: [
    { provide: MatFormFieldControl, useExisting: TimeInputComponent },
  ],

  host: {
    '[class.input-floating]': 'shouldLabelFloat',
    '[id]': 'id',
  },
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
})
export class TimeInputComponent
  implements ControlValueAccessor, MatFormFieldControl<Time>, OnDestroy
{
  static nextId = 0;
  // @ts-ignore
  @ViewChild('hours') hoursInput: HTMLInputElement;
  // @ts-ignore
  @ViewChild('minutes') minutesInput: HTMLInputElement;

  parts: FormGroup<{
    hours: FormControl<string | null>;
    minutes: FormControl<string | null>;
  }>;
  stateChanges = new Subject<void>();
  focused = false;
  touched = false;
  controlType = 'duckrulz-time-input';
  id = `duckrulz-time-input-${TimeInputComponent.nextId++}`;
  onChange = (_: any) => {};

  onTouched = () => {};

  get empty() {
    const {
      value: { hours, minutes },
    } = this.parts;

    return !hours && !minutes;
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @Input('aria-describedby') userAriaDescribedBy: string = '';

  @Input()
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  private _placeholder: string = '';

  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: BooleanInput) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this.parts.disable() : this.parts.enable();
    this.stateChanges.next();
  }
  private _disabled = false;

  @Input()
  get value(): Time | null {
    if (this.parts.valid) {
      const {
        value: { hours, minutes },
      } = this.parts;

      return Time.buildWithStrings(hours!, minutes!);
    }
    return null;
  }
  set value(time: Time | null) {
    const { hours, minutes } = time || Time.MIDNIGHT;
    this.parts.setValue({ hours: hours, minutes: minutes });
    this.stateChanges.next();
  }

  get errorState(): boolean {
    return this.parts.invalid && this.touched;
  }

  constructor(
    formBuilder: FormBuilder,
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef<HTMLElement>,
    @Optional() @Inject(MAT_FORM_FIELD) public _formField: MatFormField,
    @Optional() @Self() public ngControl: NgControl
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

    this.parts = formBuilder.group({
      hours: [
        '',
        [
          Validators.required,
          Validators.minLength(HOURS_LENGTH),
          Validators.maxLength(HOURS_LENGTH),
          // TODO custom validator
        ],
      ],
      minutes: [
        '',
        [
          Validators.required,
          Validators.minLength(MINUTES_LENGTH),
          Validators.maxLength(MINUTES_LENGTH),
          // TODO custom validator
        ],
      ],
    });
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  onFocusIn(_event: FocusEvent) {
    if (!this.focused) {
      this.focused = true;
      this.stateChanges.next();
    }
  }

  onFocusOut(event: FocusEvent) {
    if (
      !this._elementRef.nativeElement.contains(event.relatedTarget as Element)
    ) {
      this.touched = true;
      this.focused = false;
      this.onTouched();
      this.stateChanges.next();
    }
  }

  autoFocusNext(
    control: AbstractControl,
    nextElement?: HTMLInputElement
  ): void {
    if (!control.errors && nextElement) {
      this._focusMonitor.focusVia(nextElement, 'program');
    }
  }

  autoFocusPrev(control: AbstractControl, prevElement: HTMLInputElement): void {
    if (!control.value || control.value.length < 1) {
      this._focusMonitor.focusVia(prevElement, 'program');
    }
  }

  setDescribedByIds(ids: string[]) {
    const controlElement = this._elementRef.nativeElement.querySelector(
      '.time-input-container'
    )!;
    controlElement.setAttribute('aria-describedby', ids.join(' '));
  }

  onContainerClick() {}

  writeValue(time: Time | null): void {
    this.value = time;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  _handleInput(control: AbstractControl, nextElement?: HTMLInputElement): void {
    this.ensureControlHasNoMoreThanTwoChars(this.parts.controls.hours);
    this.ensureControlHasNoMoreThanTwoChars(this.parts.controls.minutes);
    this.shouldFocusNext(control, nextElement);
    this.onChange(this.value);
  }

  private shouldFocusNext(
    control: AbstractControl,
    nextElement: HTMLInputElement | undefined
  ) {
    if (this.controlIsHours(control) && this.hoursHasTwoChars()) {
      this.autoFocusNext(control, nextElement);
      nextElement?.select();
      this.onChange(this.value);
    }
  }

  private controlIsHours(control: AbstractControl) {
    return control === this.parts.controls.hours;
  }

  private hoursHasTwoChars() {
    return (
      this.parts.controls.hours.value &&
      this.parts.controls.hours.value!.toString().length === 2
    );
  }

  private ensureControlHasNoMoreThanTwoChars(
    control: FormControl<string | null>
  ) {
    if (this.controlHasMoreThanTwoChars(control)) {
      this.reduceControlToTwoChars(control);
    }
  }

  private controlHasMoreThanTwoChars(control: FormControl) {
    return control.value && control.value!.toString().length > 2;
  }

  private reduceControlToTwoChars(control: FormControl) {
    control.setValue(control.value!.toString().substring(0, 2));
  }
}
