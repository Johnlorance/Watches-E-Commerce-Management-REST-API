import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Watch, WatchRelations} from '../models';

export class WatchRepository extends DefaultCrudRepository<
  Watch,
  typeof Watch.prototype.watch_id,
  WatchRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Watch, dataSource);
  }
}
