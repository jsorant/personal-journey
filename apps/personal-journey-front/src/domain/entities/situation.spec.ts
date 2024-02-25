import { Situation } from './situation';
import { PhysicalSymptoms } from './physical-symptoms';
import {
  aCreationDate,
  allPhysicalSymptoms,
  aSituationDescription,
  somePhysicalSymptoms,
} from './fixtures';

describe(Situation.name, () => {
  describe('Build', () => {
    it('should build a new situation with a creationDate', () => {
      const situation = Situation.builder()
        .withCreationDate(aCreationDate)
        .build();

      expect(situation.creationDate).toStrictEqual(aCreationDate);
    });

    it('should have a unique identifier', () => {
      const situation = Situation.builder()
        .withCreationDate(aCreationDate)
        .build();

      expect(situation.id.value.length).toBeGreaterThan(0);
    });

    it('should not build without a creation date', () => {
      expect(() => Situation.builder().build()).toThrow(
        'Cannot create a situation without a creation date'
      );
    });

    it('should build a situation with a physical symptom', () => {
      const symptoms = [PhysicalSymptoms.Palpitations];

      const situation = Situation.builder()
        .withCreationDate(aCreationDate)
        .withPhysicalSymptoms([PhysicalSymptoms.Palpitations])
        .build();

      expect(situation.physicalSymptoms).toStrictEqual(symptoms);
    });

    it('should build a situation with all physical symptoms', () => {
      const situation = Situation.builder()
        .withCreationDate(aCreationDate)
        .withPhysicalSymptoms(allPhysicalSymptoms)
        .build();

      expect(situation.physicalSymptoms).toStrictEqual(allPhysicalSymptoms);
    });
  });

  describe('Behaviors', () => {
    it('should describe situation', () => {
      const notDescribedSituation = Situation.builder()
        .withCreationDate(aCreationDate)
        .withPhysicalSymptoms(somePhysicalSymptoms)
        .build();

      const describedSituation = notDescribedSituation.describeSituation(
        aSituationDescription
      );

      expect(notDescribedSituation.isDescribed()).toBeFalsy();
      expect(describedSituation.isDescribed()).toBeTruthy();
      expect(describedSituation.description).toStrictEqual(
        aSituationDescription
      );
    });
  });
});
