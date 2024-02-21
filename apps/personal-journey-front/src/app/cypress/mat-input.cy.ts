import { HarnessLoader } from '@angular/cdk/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatSelectHarness } from '@angular/material/select/testing';
import {
  MatSliderHarness,
  MatSliderThumbHarness,
} from '@angular/material/slider/testing';

export async function matInputShouldHaveValue(
  value: string,
  id: string,
  loader: HarnessLoader
) {
  const harness = await loader.getHarness(
    MatInputHarness.with({ selector: id })
  );

  expect(await harness.getValue()).to.eq(value);
}

export async function matInputShouldHavePlaceholder(
  placeholder: string,
  id: string,
  loader: HarnessLoader
) {
  const harness = await loader.getHarness(
    MatInputHarness.with({ selector: id })
  );

  expect(await harness.getPlaceholder()).to.eq(placeholder);
}

export async function matSelectShouldHaveText(
  value: string,
  id: string,
  loader: HarnessLoader
) {
  const harness = await loader.getHarness(
    MatSelectHarness.with({ selector: id })
  );

  expect(await harness.getValueText()).to.eq(value);
}

export async function matSliderShouldHaveMinMaxStep(
  min: number,
  max: number,
  step: number,
  id: string,
  loader: HarnessLoader
) {
  const harness = await loader.getHarness(
    MatSliderHarness.with({ selector: id })
  );

  expect(await harness.getMinValue()).to.eq(min);
  expect(await harness.getMaxValue()).to.eq(max);
  expect(await harness.getStep()).to.eq(step);
}

export async function matSliderThumbShouldHaveValue(
  value: number,
  id: string,
  loader: HarnessLoader
) {
  const harness = await loader.getHarness(
    MatSliderThumbHarness.with({ selector: id })
  );

  expect(await harness.getValue()).to.eq(value);
}