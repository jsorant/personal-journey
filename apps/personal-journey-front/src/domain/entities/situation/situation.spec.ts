import { Situation } from './situation';
import {
  aBlankSituation,
  aDuration,
  anExitEvent,
  aSituationDescription,
  aSituationId,
  someAutoPilots,
  someEmotions,
  someMemories,
  someNeeds,
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

    it('should identify needs related with the situation', () => {
      const situationWithNeeds =
        aBlankSituation.identifyRelatedNeeds(someNeeds);

      expect(aBlankSituation.hasRelatedNeeds()).toBeFalsy();
      expect(situationWithNeeds.hasRelatedNeeds()).toBeTruthy();
      expect(situationWithNeeds.needs).toStrictEqual(someNeeds);
    });

    it('should identify autopilots', () => {
      const situationWithAutoPilots =
        aBlankSituation.identifyRelatedAutoPilots(someAutoPilots);

      expect(aBlankSituation.hasRelatedAutoPilots()).toBeFalsy();
      expect(situationWithAutoPilots.hasRelatedAutoPilots()).toBeTruthy();
      expect(situationWithAutoPilots.autoPilots).toStrictEqual(someAutoPilots);
    });

    it('should describe memories related to a situation', () => {
      const situationWithMemories =
        aBlankSituation.describeRelatedMemories(someMemories);

      expect(aBlankSituation.hasRelatedMemories()).toBeFalsy();
      expect(situationWithMemories.hasRelatedMemories()).toBeTruthy();
      expect(situationWithMemories.memories).toStrictEqual(someMemories);
    });

    it('should describe the duration of a situation', () => {
      const situationWithDuration = aBlankSituation.describeDuration(aDuration);

      expect(aBlankSituation.hasDuration()).toBeFalsy();
      expect(situationWithDuration.hasDuration()).toBeTruthy();
      expect(situationWithDuration.duration).toStrictEqual(aDuration);
    });
  });
});
