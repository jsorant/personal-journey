import { SituationsRepository } from './situations-repository';
import { Situation } from '../../domain/entities/situation/situation';
import { SituationFactory } from '../../domain/entities/situation/situation-factory';
import { SituationId } from '../../domain/entities/situation/value-objects/situation-id';

export class InMemorySituationRepository implements SituationsRepository {
  #situations: Situation[] = [];

  constructor(private readonly situationFactory: SituationFactory) {}

  private printSituation(situation: Situation) {
    let message = `Situation ${situation.id.value}`;
    if (situation.physicalSymptoms.length > 0) {
      message += '\n - symptoms: ' + situation.physicalSymptoms;
    }
    if (situation.description) {
      message += '\n - description: ';
      message += '\n   - date: ' + situation.description?.date.value;
      message += '\n   - location: ' + situation.description?.location.value;
      message +=
        '\n   - description: ' + situation.description?.description.value;
    }
    if (situation.exitEvent) {
      message += '\n - exitEvent: ' + situation.exitEvent.value;
    }
    if (situation.emotions.length > 0) {
      message += '\n - emotions: ' + situation.emotions;
    }
    if (situation.thoughtsTypes.length > 0) {
      message += '\n - thoughts types: ' + situation.thoughtsTypes;
    }
    if (situation.needs.length > 0) {
      message += '\n - needs: ' + situation.needs;
    }
    if (situation.autoPilots.length > 0) {
      message += '\n - autoPilots: ' + situation.autoPilots;
    }
    if (situation.memories) {
      message += '\n - memories: ' + situation.memories.value;
    }
    if (situation.duration) {
      message += '\n - duration: ' + situation.duration.valueInMinutes;
    }
    console.log(message);
  }

  private printSituationsCount() {
    console.log('Situations count: ' + this.#situations.length);
  }

  async create(): Promise<Situation> {
    const situation = this.situationFactory.createSituation();
    this.#situations.push(situation);
    this.printSituationsCount();
    this.printSituation(situation);
    return situation;
  }

  async getById(id: string): Promise<Situation | undefined> {
    this.printSituationsCount();
    const idToFind = SituationId.of(id);
    return this.#situations.find((situation: Situation) =>
      situation.id.equals(idToFind)
    );
  }

  async update(updatedSituation: Situation): Promise<void> {
    this.printSituationsCount();
    this.printSituation(updatedSituation);
    this.#situations = this.#situations.filter(
      (situation) => !situation.id.equals(updatedSituation.id)
    );
    this.#situations.push(updatedSituation);
  }
}
