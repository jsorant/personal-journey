import { SituationsRepository } from './situations-repository';
import { Situation } from '../../domain/entities/situation/situation';
import { SituationFactory } from '../../domain/entities/situation/situation-factory';
import { SituationId } from '../../domain/entities/situation/value-objects/situation-id';
import { SituationDescription } from '../../domain/entities/situation/value-objects/situation-description';
import { StartDate } from '../../domain/entities/situation/value-objects/start-date';
import { Location } from '../../domain/entities/situation/value-objects/location';
import { Description } from '../../domain/entities/situation/value-objects/description';
import { Emotions } from '../../domain/entities/situation/value-objects/emotions';

export class InMemorySituationRepository implements SituationsRepository {
  #situations: Situation[] = [];

  constructor(private readonly situationFactory: SituationFactory) {
    this.populateFakeModel();
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

  async update(updatedSituation: Situation): Promise<void> {
    this.printSituationsCount();
    this.printSituation(updatedSituation);
    this.#situations = this.#situations.filter(
      (situation) => !situation.id.equals(updatedSituation.id)
    );
    this.#situations.push(updatedSituation);
  }

  async getById(id: string): Promise<Situation | undefined> {
    this.printSituationsCount();
    const idToFind = SituationId.of(id);
    return this.#situations.find((situation: Situation) =>
      situation.id.equals(idToFind)
    );
  }

  async getAll(): Promise<Situation[]> {
    return [...this.#situations];
  }

  private populateFakeModel() {
    this.#situations.push(
      this.situationFactory
        .createSituation()
        .describeSituation(
          SituationDescription.builder()
            .withDate(StartDate.of(new Date('2024-01-04')))
            .withLocation(Location.of('A la gare'))
            .withDescription(
              Description.of(
                "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker."
              )
            )
            .build()
        )
        .identifyRelatedEmotions([Emotions.Anxiety, Emotions.Fear])
    );

    this.#situations.push(
      this.situationFactory
        .createSituation()
        .describeSituation(
          SituationDescription.builder()
            .withDate(StartDate.of(new Date('2024-01-29')))
            .withLocation(Location.of('Au centre commercial'))
            .withDescription(
              Description.of(
                "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker."
              )
            )
            .build()
        )
        .identifyRelatedEmotions([Emotions.Anxiety])
    );

    this.#situations.push(
      this.situationFactory
        .createSituation()
        .describeSituation(
          SituationDescription.builder()
            .withDate(StartDate.of(new Date('2024-03-12')))
            .withLocation(Location.of('A mon anniversaire'))
            .withDescription(
              Description.of(
                "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker."
              )
            )
            .build()
        )
        .identifyRelatedEmotions([Emotions.Anxiety])
    );

    this.#situations.push(this.situationFactory.createSituation());
  }

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
}
