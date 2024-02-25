import { SituationDescription } from './situation-description';
import { PhysicalSymptoms } from './physical-symptoms';
import { Location } from './location';
import { Description } from './description';
import { StartDate } from './start-date';
import { CreationDate } from './creation-date';
import { Situation } from './situation';

export const aCreationDate = CreationDate.of(new Date('2022-12-25 15:45'));

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

export const aDate = StartDate.of(new Date('2022-12-25 15:15'));
export const aLocation = Location.of('Au centre commercial');
export const aDescription = Description.of(
  "Je marchais dans la foule, il y avait beaucoupt de monde. Mon coeur s'est mis à battre fort. Je suis sorti au plus vite et j'ai rejoins le parc pour m'assoir sur un banc."
);

export const aSituationDescription = SituationDescription.builder()
  .withDate(aDate)
  .withLocation(aLocation)
  .withDescription(aDescription)
  .build();

export const justCreatedSituation = Situation.builder()
  .withCreationDate(aCreationDate)
  .withPhysicalSymptoms(somePhysicalSymptoms)
  .build();
