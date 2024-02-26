import { Situation } from '../entities/situation/situation';

export interface SituationRepository {
  add(situation: Situation): Promise<void>;
}
