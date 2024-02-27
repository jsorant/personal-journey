import { UuidV4GeneratorImpl } from './uuid-v4-generator-impl';

const uuidv4Regex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

describe(UuidV4GeneratorImpl.name, () => {
  it('should generate uuidv4 strings', () => {
    const generator = new UuidV4GeneratorImpl();

    const uuidv4 = generator.generate();

    expect(uuidv4Regex.test(uuidv4)).toBeTruthy();
  });

  it('should generate different values', () => {
    const generator = new UuidV4GeneratorImpl();

    const values = [];
    for (let i = 0; i < 100; i++) {
      values.push(generator.generate());
    }
    const valuesWithoutDuplicates = [...new Set(values)];

    expect(valuesWithoutDuplicates.length).toBe(values.length);
  });
});
