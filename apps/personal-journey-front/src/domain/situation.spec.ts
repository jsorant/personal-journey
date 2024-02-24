import { CurrentDate } from '../shared-kernel/current-date';
import { Situation } from './situation';
import { PhysicalSymptoms } from './physical-symptoms';
import { mock } from 'ts-jest-mocker';

describe('', () => {
  const now = new Date('2022-12-25 15:45');
  const currentDate = mock<CurrentDate>();
  currentDate.value.mockReturnValue(now);

  it('should create a new situation with current date', () => {
    const situation = Situation.builder(currentDate).build();

    expect(situation.date).toStrictEqual(now);
  });

  it('should create a situation with a physical symptom', () => {
    const symptoms = [PhysicalSymptoms.Palpitations];

    const situation = Situation.builder(currentDate)
      .withPhysicalSymptoms(symptoms)
      .build();

    expect(situation.physicalSymptoms).toStrictEqual(symptoms);
  });

  it('should create a situation with all physical symptoms', () => {
    const symptoms = [
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

    const situation = Situation.builder(currentDate)
      .withPhysicalSymptoms(symptoms)
      .build();

    expect(situation.physicalSymptoms).toStrictEqual(symptoms);
  });
});
