import { Situation } from '../../domain/entities/situation/situation';

export interface SituationsRepository {
  create(): Promise<Situation>;
  update(updatedSituation: Situation): Promise<void>;
  getById(id: string): Promise<Situation | undefined>;
}
