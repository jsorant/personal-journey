import { UniqueIdentifier } from './unique-identifier';

const uuidv4Regex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
describe(UniqueIdentifier.name, () => {
  it('should have a uuid v4 value', () => {
    const sut = UniqueIdentifier.generateNewUniqueIdentifier();

    expect(uuidv4Regex.test(sut.value)).toBeTruthy();
  });
});
