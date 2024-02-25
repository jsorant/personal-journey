import { Situation } from './situation';
import { PhysicalSymptoms } from './value-objects/physical-symptoms';
import {
  aCreationDate,
  allPhysicalSymptoms,
  anExitEvent,
  aSituationDescription,
  describedSituation,
  justCreatedSituation,
  justCreatedSituationWithoutSymptoms,
  someEmotions,
  somePhysicalSymptoms,
} from '../../../tests-utils/domain/fixtures';
import { MissingMemberException } from '../../../shared-kernel/missing-member-exception';

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
        new MissingMemberException('creationDate', Situation.name)
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
    it('should define physical symptoms', () => {
      const aSituation = justCreatedSituationWithoutSymptoms;

      const situationWithPhysicalSymptoms =
        aSituation.definePhysicalSymptoms(somePhysicalSymptoms);

      expect(aSituation.physicalSymptoms.length).toBe(0);
      expect(situationWithPhysicalSymptoms.physicalSymptoms).toStrictEqual(
        somePhysicalSymptoms
      );
    });

    it('should describe situation', () => {
      const notDescribedSituation = justCreatedSituation;

      const describedSituation = notDescribedSituation.describeSituation(
        aSituationDescription
      );

      expect(notDescribedSituation.isDescribed()).toBeFalsy();
      expect(describedSituation.isDescribed()).toBeTruthy();
      expect(describedSituation.description).toStrictEqual(
        aSituationDescription
      );
    });

    it('should describe an event that allowed to exit the situation', () => {
      const situationWithExitEvent =
        describedSituation.describeExitEvent(anExitEvent);

      expect(describedSituation.hasExitEvent()).toBeFalsy();
      expect(situationWithExitEvent.hasExitEvent()).toBeTruthy();
      expect(situationWithExitEvent.exitEvent).toStrictEqual(anExitEvent);
    });

    it('should define emotions related with the situation', () => {
      const situationWithRelatedEmotions =
        describedSituation.defineRelatedEmotions(someEmotions);

      expect(describedSituation.hasRelatedEmotions()).toBeFalsy();
      expect(situationWithRelatedEmotions.hasRelatedEmotions()).toBeTruthy();
      expect(situationWithRelatedEmotions.relatedEmotions).toStrictEqual(
        someEmotions
      );
    });
  });
});
