import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {WatchOrderLine, WatchOrderLineRelations} from '../models';

export class WatchOrderLineRepository extends DefaultCrudRepository<
  WatchOrderLine,
  typeof WatchOrderLine.prototype.order_ID,
  WatchOrderLineRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(WatchOrderLine, dataSource);
  }
}
