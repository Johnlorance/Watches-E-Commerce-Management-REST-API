import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {WatchOrder, WatchOrderRelations} from '../models';

export class WatchOrderRepository extends DefaultCrudRepository<
  WatchOrder,
  typeof WatchOrder.prototype.watch_order_ID,
  WatchOrderRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(WatchOrder, dataSource);
  }
}
