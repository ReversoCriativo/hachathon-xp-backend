export interface AbstractObjectFactory<Receives, Produces> {
  create(payload: Receives): Produces;
}
