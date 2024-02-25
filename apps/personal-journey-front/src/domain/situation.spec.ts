import { Situation, SituationDescription } from './situation';
import { PhysicalSymptoms } from './physical-symptoms';

describe(Situation.name, () => {
  it('should create a new situation with a creationDate', () => {
    const situation = Situation.builder()
      .withCreationDate(creationDate())
      .build();

    expect(situation.creationDate).toStrictEqual(creationDate());
  });

  // should not create without a creation date

  it('should create a situation with a physical symptom', () => {
    const symptoms = [PhysicalSymptoms.Palpitations];

    const situation = Situation.builder()
      .withCreationDate(creationDate())
      .withPhysicalSymptoms([PhysicalSymptoms.Palpitations])
      .build();

    expect(situation.physicalSymptoms).toStrictEqual(symptoms);
  });

  it('should create a situation with all physical symptoms', () => {
    const situation = Situation.builder()
      .withCreationDate(creationDate())
      .withPhysicalSymptoms(allPhysicalSymptoms())
      .build();

    expect(situation.physicalSymptoms).toStrictEqual(allPhysicalSymptoms());
  });

  it('should describe situation', () => {
    const notDescribedSituation = Situation.builder()
      .withCreationDate(creationDate())
      .withPhysicalSymptoms(somePhysicalSymptoms())
      .build();

    const describedSituation = notDescribedSituation.describeSituation(
      aDescription()
    );

    expect(notDescribedSituation.isDescribed()).toBeFalsy();
    expect(describedSituation.isDescribed()).toBeTruthy();
    expect(describedSituation.description).toStrictEqual(aDescription());
  });
});

function creationDate() {
  return new Date('2022-12-25 15:45');
}

function situationDate() {
  return new Date('2022-12-25 14:50');
}

function allPhysicalSymptoms() {
  return [
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
}

function somePhysicalSymptoms() {
  return [PhysicalSymptoms.Palpitations, PhysicalSymptoms.Vertiges];
}

function aDescription() {
  const description: SituationDescription = {
    date: situationDate(),
    location: 'Au centre commercial',
    description:
      "Je marchais dans la foule, il y avait beaucoupt de monde. Mon coeur s'est mis à battre fort. Je suis sorti au plus vite et j'ai rejoins le parc pour m'assoir sur un banc.",
  };
  return description;
}
