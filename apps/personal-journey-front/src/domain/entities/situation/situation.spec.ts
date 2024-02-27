import { Situation } from './situation';
import {
  aBlankSituation,
  anExitEvent,
  aSituationDescription,
  aSituationId,
  someAutoPilots,
  someEmotions,
  somePhysicalSymptoms,
  someThoughtsTypes,
} from '../../../tests-utils/domain/fixtures';

describe(Situation.name, () => {
  describe('Build', () => {
    it('should build a new situation', () => {
      expect(() => Situation.buildWithId(aSituationId)).not.toThrow();
    });
  });

  describe('Behaviors', () => {
    it('should identify physical symptoms', () => {
      const situationWithPhysicalSymptoms =
        aBlankSituation.identifyPhysicalSymptoms(somePhysicalSymptoms);

      expect(aBlankSituation.physicalSymptoms.length).toBe(0);
      expect(situationWithPhysicalSymptoms.physicalSymptoms).toStrictEqual(
        somePhysicalSymptoms
      );
    });

    it('should describe situation', () => {
      const describedSituation = aBlankSituation.describeSituation(
        aSituationDescription
      );

      expect(aBlankSituation.isDescribed()).toBeFalsy();
      expect(describedSituation.isDescribed()).toBeTruthy();
      expect(describedSituation.description).toStrictEqual(
        aSituationDescription
      );
    });

    it('should describe an event that allowed to exit the situation', () => {
      const situationWithExitEvent =
        aBlankSituation.describeExitEvent(anExitEvent);

      expect(aBlankSituation.hasExitEvent()).toBeFalsy();
      expect(situationWithExitEvent.hasExitEvent()).toBeTruthy();
      expect(situationWithExitEvent.exitEvent).toStrictEqual(anExitEvent);
    });

    it('should identify emotions related with the situation', () => {
      const situationWithEmotions =
        aBlankSituation.identifyRelatedEmotions(someEmotions);

      expect(aBlankSituation.hasRelatedEmotions()).toBeFalsy();
      expect(situationWithEmotions.hasRelatedEmotions()).toBeTruthy();
      expect(situationWithEmotions.emotions).toStrictEqual(someEmotions);
    });

    it('should identify thoughts types related with the situation', () => {
      const situationWithThoughtsTypes =
        aBlankSituation.identifyRelatedThoughtsTypes(someThoughtsTypes);

      expect(aBlankSituation.hasRelatedThoughtsTypes()).toBeFalsy();
      expect(situationWithThoughtsTypes.hasRelatedThoughtsTypes()).toBeTruthy();
      expect(situationWithThoughtsTypes.thoughtsTypes).toStrictEqual(
        someThoughtsTypes
      );
    });

    //TODO besoins non satifsfaits

    it('should identify autopilots', () => {
      const situationWithAutoPilots =
        aBlankSituation.identifyRelatedAutoPilots(someAutoPilots);

      expect(aBlankSituation.hasRelatedAutoPilots()).toBeFalsy();
      expect(situationWithAutoPilots.hasRelatedAutoPilots()).toBeTruthy();
      expect(situationWithAutoPilots.autoPilots).toStrictEqual(someAutoPilots);
    });
  });
});
