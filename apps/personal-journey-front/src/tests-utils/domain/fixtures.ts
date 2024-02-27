import { SituationDescription } from '../../domain/entities/situation/value-objects/situation-description';
import { PhysicalSymptoms } from '../../domain/entities/situation/value-objects/physical-symptoms';
import { Location } from '../../domain/entities/situation/value-objects/location';
import { Description } from '../../domain/entities/situation/value-objects/description';
import { StartDate } from '../../domain/entities/situation/value-objects/start-date';
import { Situation } from '../../domain/entities/situation/situation';
import { ExitEvent } from '../../domain/entities/situation/value-objects/exit-event';
import { Emotions } from '../../domain/entities/situation/value-objects/emotions';
import { ThoughtsTypes } from '../../domain/entities/situation/value-objects/thoughts-types';
import { AutoPilots } from '../../domain/entities/situation/value-objects/auto-pilots';
import { SituationId } from '../../domain/entities/situation/value-objects/situation-id';

export const aSituationId = SituationId.of(
  'ea6ef84e-af14-408b-b5a7-0fe1a3cfc2dc'
);

export const aBlankSituation = Situation.buildWithId(aSituationId);

export const aDomainEventId = SituationId.of(
  '9944fbc2-ef3f-4808-ad5c-9d260c2b781d'
);
export const aDate = new Date('2022-12-26 22:15');

export const anUuidV4 = '0808e930-972b-4af6-92c5-5ac2fe17e7f4';

export const allPhysicalSymptoms = [
  PhysicalSymptoms.ColopathieFonctionnelle,
  PhysicalSymptoms.Nausee,
  PhysicalSymptoms.HyperphagieBoulimique,
  PhysicalSymptoms.PerteDAppetit,
  PhysicalSymptoms.IncapaciteAManger,
  PhysicalSymptoms.Douleurs,
  PhysicalSymptoms.TensionsMusculaires,
  PhysicalSymptoms.Fourmillements,
  PhysicalSymptoms.Palpitations,
  PhysicalSymptoms.DouleursThoraciques,
  PhysicalSymptoms.EnvieFrequenteDUriner,
  PhysicalSymptoms.Insomnies,
  PhysicalSymptoms.SomnolencesDansLaJournee,
  PhysicalSymptoms.Fatigue,
  PhysicalSymptoms.MalDeTete,
  PhysicalSymptoms.Vertiges,
  PhysicalSymptoms.SensationDeFaiblesse,
];

export const somePhysicalSymptoms = [
  PhysicalSymptoms.Palpitations,
  PhysicalSymptoms.Vertiges,
];

export const aStartDate = StartDate.of(new Date('2022-12-25 15:15'));
export const aLocation = Location.of('Au centre commercial');
export const aDescription = Description.of(
  "Je marchais dans la foule, il y avait beaucoupt de monde. Mon coeur s'est mis à battre fort. Je suis sorti au plus vite et j'ai rejoins le parc pour m'assoir sur un banc."
);

export const aSituationDescription = SituationDescription.builder()
  .withDate(aStartDate)
  .withLocation(aLocation)
  .withDescription(aDescription)
  .build();

export const anExitEvent = ExitEvent.of(
  'La foule a été attirée dans un autre zone...'
);

export const someEmotions = [Emotions.Anxiety, Emotions.Fear];

export const allEmotions = [
  Emotions.Joy,
  Emotions.Anxiety,
  Emotions.Sadness,
  Emotions.Fear,
  Emotions.Anger,
];

export const someThoughtsTypes = [
  ThoughtsTypes.Security,
  ThoughtsTypes.AbsenceOfChoice,
];

export const allThoughtsTypes = [
  ThoughtsTypes.Security,
  ThoughtsTypes.SelfImage,
  ThoughtsTypes.Guiltiness,
  ThoughtsTypes.AbsenceOfChoice,
];

export const someAutoPilots = [AutoPilots.Fuite];

export const allAutoPilots = [
  AutoPilots.Combat,
  AutoPilots.Fuite,
  AutoPilots.Sideration,
  AutoPilots.Agrippement,
  AutoPilots.Soumission,
];
