import { Situation } from './situation';
import { PhysicalSymptoms } from './value-objects/physical-symptoms';
import {
  allPhysicalSymptoms,
  anExitEvent,
  aSituationDescription,
  aDescribedSituation,
  aSituationWithPhysicalSymptoms,
  aBlankSituation,
  someAutoPilots,
  someEmotions,
  somePhysicalSymptoms,
  someThoughtsTypes,
  aSituationId,
} from '../../../tests-utils/domain/fixtures';
import { MissingMemberException } from '../../../shared-kernel/missing-member-exception';

describe(Situation.name, () => {
  describe('Build', () => {
    it('should build a new situation', () => {
      expect(() =>
        Situation.builder().withId(aSituationId).build()
      ).not.toThrow();
    });

    it('should not build without a unique identifier', () => {
      expect(() => Situation.builder().build()).toThrow(
        new MissingMemberException('id', Situation.name)
      );
    });

    it('should build a situation with a physical symptom', () => {
      const symptoms = [PhysicalSymptoms.Palpitations];

      const situation = Situation.builder()
        .withId(aSituationId)
        .withPhysicalSymptoms([PhysicalSymptoms.Palpitations])
        .build();

      expect(situation.physicalSymptoms).toStrictEqual(symptoms);
    });

    it('should build a situation with all physical symptoms', () => {
      const situation = Situation.builder()
        .withId(aSituationId)
        .withPhysicalSymptoms(allPhysicalSymptoms)
        .build();

      expect(situation.physicalSymptoms).toStrictEqual(allPhysicalSymptoms);
    });
  });

  describe('Behaviors', () => {
    it('should identify physical symptoms', () => {
      const aSituation = aBlankSituation;

      const situationWithPhysicalSymptoms =
        aSituation.identifyPhysicalSymptoms(somePhysicalSymptoms);

      expect(aSituation.physicalSymptoms.length).toBe(0);
      expect(situationWithPhysicalSymptoms.physicalSymptoms).toStrictEqual(
        somePhysicalSymptoms
      );
    });

    it('should describe situation', () => {
      const notDescribedSituation = aSituationWithPhysicalSymptoms;

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
        aDescribedSituation.describeExitEvent(anExitEvent);

      expect(aDescribedSituation.hasExitEvent()).toBeFalsy();
      expect(situationWithExitEvent.hasExitEvent()).toBeTruthy();
      expect(situationWithExitEvent.exitEvent).toStrictEqual(anExitEvent);
    });

    it('should identify emotions related with the situation', () => {
      const situationWithEmotions =
        aDescribedSituation.identifyRelatedEmotions(someEmotions);

      expect(aDescribedSituation.hasRelatedEmotions()).toBeFalsy();
      expect(situationWithEmotions.hasRelatedEmotions()).toBeTruthy();
      expect(situationWithEmotions.emotions).toStrictEqual(someEmotions);
    });

    it('should identify thoughts types related with the situation', () => {
      const situationWithThoughtsTypes =
        aDescribedSituation.identifyRelatedThoughtsTypes(someThoughtsTypes);

      expect(aDescribedSituation.hasRelatedThoughtsTypes()).toBeFalsy();
      expect(situationWithThoughtsTypes.hasRelatedThoughtsTypes()).toBeTruthy();
      expect(situationWithThoughtsTypes.thoughtsTypes).toStrictEqual(
        someThoughtsTypes
      );
    });

    //TODO besoins non satifsfaits

    it('should identify autopilots', () => {
      const situationWithAutoPilots =
        aDescribedSituation.identifyRelatedAutoPilots(someAutoPilots);

      expect(aDescribedSituation.hasRelatedAutoPilots()).toBeFalsy();
      expect(situationWithAutoPilots.hasRelatedAutoPilots()).toBeTruthy();
      expect(situationWithAutoPilots.autoPilots).toStrictEqual(someAutoPilots);
    });
  });
});
