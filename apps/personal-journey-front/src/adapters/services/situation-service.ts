import { SituationsRepository } from './situations-repository';
import { PhysicalSymptoms } from '../../domain/entities/situation/value-objects/physical-symptoms';
import { Description } from '../../domain/entities/situation/value-objects/description';
import { SituationDescription } from '../../domain/entities/situation/value-objects/situation-description';
import { StartDate } from '../../domain/entities/situation/value-objects/start-date';
import { Location } from '../../domain/entities/situation/value-objects/location';
import { ExitEvent } from '../../domain/entities/situation/value-objects/exit-event';
import { Emotions } from '../../domain/entities/situation/value-objects/emotions';
import { ThoughtsTypes } from '../../domain/entities/situation/value-objects/thoughts-types';
import { Needs } from '../../domain/entities/situation/value-objects/needs';
import { AutoPilots } from '../../domain/entities/situation/value-objects/auto-pilots';
import { Memories } from '../../domain/entities/situation/value-objects/memories';
import { Duration } from '../../domain/entities/situation/value-objects/duration';

const physicalSymptomsMap = new Map<string, PhysicalSymptoms>();
physicalSymptomsMap.set(
  'Colopathie fonctionnelle',
  PhysicalSymptoms.ColopathieFonctionnelle
);
physicalSymptomsMap.set('Nausée', PhysicalSymptoms.Nausee);
physicalSymptomsMap.set(
  'Hyperphagie boulimique',
  PhysicalSymptoms.HyperphagieBoulimique
);
physicalSymptomsMap.set("Perte d'appetit", PhysicalSymptoms.PerteDAppetit);
physicalSymptomsMap.set(
  'Incapacite à manger',
  PhysicalSymptoms.IncapaciteAManger
);
physicalSymptomsMap.set('Douleurs', PhysicalSymptoms.Douleurs);
physicalSymptomsMap.set(
  'Tensions musculaires',
  PhysicalSymptoms.TensionsMusculaires
);
physicalSymptomsMap.set('Fourmillements', PhysicalSymptoms.Fourmillements);
physicalSymptomsMap.set('Palpitations', PhysicalSymptoms.Palpitations);
physicalSymptomsMap.set(
  'Douleurs thoraciques',
  PhysicalSymptoms.DouleursThoraciques
);
physicalSymptomsMap.set(
  "Envie fréquente d'uriner",
  PhysicalSymptoms.EnvieFrequenteDUriner
);
physicalSymptomsMap.set('Insomnies', PhysicalSymptoms.Insomnies);
physicalSymptomsMap.set(
  'Somnolences dans la journee',
  PhysicalSymptoms.SomnolencesDansLaJournee
);
physicalSymptomsMap.set('Fatigue', PhysicalSymptoms.Fatigue);
physicalSymptomsMap.set('Mal de tête', PhysicalSymptoms.MalDeTete);
physicalSymptomsMap.set('Vertiges', PhysicalSymptoms.Vertiges);
physicalSymptomsMap.set(
  'Sensation de faiblesse',
  PhysicalSymptoms.SensationDeFaiblesse
);

const emotionsMap = new Map<string, Emotions>();
emotionsMap.set('Joie', Emotions.Joy);
emotionsMap.set('Anxiété', Emotions.Anxiety);
emotionsMap.set('Tristesse', Emotions.Sadness);
emotionsMap.set('Peur', Emotions.Fear);
emotionsMap.set('Colère', Emotions.Anger);

const thoughtsTypesMap = new Map<string, ThoughtsTypes>();
thoughtsTypesMap.set(
  'Pensées liées à la sécurité (je suis en danger, je vais mourir...)',
  ThoughtsTypes.Security
);
thoughtsTypesMap.set(
  "Pensées liées à l'image de soi (je suis trop nul, je ne saurais jamais faire cela...)",
  ThoughtsTypes.SelfImage
);
thoughtsTypesMap.set(
  "Pensées liées à la culpabilité (c'est de ma faute, je suis responsable de la situation...)",
  ThoughtsTypes.Guiltiness
);
thoughtsTypesMap.set(
  "Pensées liées à l'absence de choix (je ne peux rien y faire, je ne vois pas le moyen de m'en sortir, je suis dans une impasse...)",
  ThoughtsTypes.AbsenceOfChoice
);

const needsMap = new Map<string, Needs>();
needsMap.set(
  'Survie (abri, air, lumière, faim, soif, chaleur, repos, reproduction...)',
  Needs.Survie
);
needsMap.set(
  'Confort (calme, paix, sérénité, amour de soi, liberté, beauté, confiance, jeu, humour...)',
  Needs.Confort
);
needsMap.set(
  'Accomplissement (apprentissage, compétence, confiance, évolution, découverte, créativité, sens...)',
  Needs.Accomplissement
);
needsMap.set(
  'Relation (bienveillance, amour, ouverture, tolérance, attention, respect, confiance, sécurité relationnelle...)',
  Needs.Relation
);
needsMap.set(
  'Gratitude (envers la vie, les réalisations, fêter, rendre hommage...)',
  Needs.Gratitude
);

const autoPilotsMap = new Map<string, AutoPilots>();
autoPilotsMap.set('Combat', AutoPilots.Combat);
autoPilotsMap.set('Fuite', AutoPilots.Fuite);
autoPilotsMap.set('Sidération', AutoPilots.Sideration);
autoPilotsMap.set('Agrippement', AutoPilots.Agrippement);
autoPilotsMap.set('Soumission', AutoPilots.Soumission);

export class SituationService {
  constructor(private readonly situationRepository: SituationsRepository) {}

  allPhysicalSymptoms(): string[] {
    return Array.from(physicalSymptomsMap.keys());
  }

  allEmotions() {
    return Array.from(emotionsMap.keys());
  }

  allThoughtsTypes() {
    return Array.from(thoughtsTypesMap.keys());
  }

  allNeeds() {
    return Array.from(needsMap.keys());
  }

  allAutoPilots() {
    return Array.from(autoPilotsMap.keys());
  }

  async createNewSituation() {
    const situation = await this.situationRepository.create();
    return situation.id.value;
  }

  async addPhysicalSymptoms(physicalSymptoms: string[], situationId: string) {
    const situation = await this.findOrThrow(situationId);

    const updatedSituation = situation.identifyPhysicalSymptoms(
      this.physicalSymptomsToDomain(physicalSymptoms)
    );

    await this.situationRepository.update(updatedSituation);
  }

  async addDescription(
    date: Date,
    location: string,
    description: string,
    situationId: string
  ) {
    const situation = await this.findOrThrow(situationId);

    const situationDescription = SituationDescription.builder()
      .withDate(StartDate.of(date))
      .withLocation(Location.of(location))
      .withDescription(Description.of(description))
      .build();

    const updatedSituation = situation.describeSituation(situationDescription);

    await this.situationRepository.update(updatedSituation);
  }

  async addExitEvent(event: string, situationId: string) {
    const situation = await this.findOrThrow(situationId);

    const updatedSituation = situation.describeExitEvent(ExitEvent.of(event));

    await this.situationRepository.update(updatedSituation);
  }

  async addEmotions(emotions: string[], situationId: string) {
    const situation = await this.findOrThrow(situationId);

    const updatedSituation = situation.identifyRelatedEmotions(
      this.emotionsToDomain(emotions)
    );

    await this.situationRepository.update(updatedSituation);
  }

  async addThoughtsTriggers(thoughtsTypes: string[], situationId: string) {
    const situation = await this.findOrThrow(situationId);

    const updatedSituation = situation.identifyRelatedThoughtsTypes(
      this.thoughtsTypesToDomain(thoughtsTypes)
    );

    await this.situationRepository.update(updatedSituation);
  }

  async addNeeds(needs: string[], situationId: string) {
    const situation = await this.findOrThrow(situationId);

    const updatedSituation = situation.identifyRelatedNeeds(
      this.needsListToDomain(needs)
    );

    await this.situationRepository.update(updatedSituation);
  }

  async addAutoPilots(selectedAutoPilots: string[], situationId: string) {
    const situation = await this.findOrThrow(situationId);

    const updatedSituation = situation.identifyRelatedAutoPilots(
      this.autoPilotsToDomain(selectedAutoPilots)
    );

    await this.situationRepository.update(updatedSituation);
  }

  async addMemories(memories: string, situationId: string) {
    const situation = await this.findOrThrow(situationId);

    const updatedSituation = situation.describeRelatedMemories(
      Memories.of(memories)
    );

    await this.situationRepository.update(updatedSituation);
  }

  async addDuration(durationMinutes: number, situationId: string) {
    const situation = await this.findOrThrow(situationId);

    const updatedSituation = situation.describeDuration(
      Duration.ofMinutes(durationMinutes)
    );

    await this.situationRepository.update(updatedSituation);
  }

  private async findOrThrow(situationId: string) {
    const situation = await this.situationRepository.getById(situationId);
    if (situation === undefined)
      throw new Error('No situation for id: ' + situationId);
    return situation;
  }

  private physicalSymptomsToDomain(
    physicalSymptoms: string[]
  ): PhysicalSymptoms[] {
    return physicalSymptoms.map(this.physicalSymptomToDomain);
  }

  private physicalSymptomToDomain(physicalSymptoms: string): PhysicalSymptoms {
    const result = physicalSymptomsMap.get(physicalSymptoms);
    if (result === undefined)
      throw new Error('Unexpected physical symptom: ' + physicalSymptoms);

    return result;
  }

  private emotionsToDomain(emotions: string[]): Emotions[] {
    return emotions.map(this.emotionToDomain);
  }

  private emotionToDomain(emotion: string): Emotions {
    const result = emotionsMap.get(emotion);
    if (result === undefined) throw new Error('Unexpected emotion: ' + emotion);

    return result;
  }

  private thoughtsTypesToDomain(thoughtsTypes: string[]) {
    return thoughtsTypes.map(this.thoughtsTypeToDomain);
  }

  private thoughtsTypeToDomain(thoughtsType: string): ThoughtsTypes {
    const result = thoughtsTypesMap.get(thoughtsType);
    if (result === undefined)
      throw new Error('Unexpected thoughts type: ' + thoughtsType);

    return result;
  }

  private needsListToDomain(needs: string[]) {
    return needs.map(this.needsToDomain);
  }

  private needsToDomain(needs: string): Needs {
    const result = needsMap.get(needs);
    if (result === undefined) throw new Error('Unexpected needs: ' + needs);

    return result;
  }

  private autoPilotsToDomain(autoPilots: string[]) {
    return autoPilots.map(this.autoPilotToDomain);
  }

  private autoPilotToDomain(autoPilot: string): AutoPilots {
    const result = autoPilotsMap.get(autoPilot);
    if (result === undefined)
      throw new Error('Unexpected auto pilot: ' + autoPilot);

    return result;
  }
}
