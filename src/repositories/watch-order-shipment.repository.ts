import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {WatchOrderShipment, WatchOrderShipmentRelations} from '../models';

export class WatchOrderShipmentRepository extends DefaultCrudRepository<
  WatchOrderShipment,
  typeof WatchOrderShipment.prototype.shipment_ID,
  WatchOrderShipmentRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(WatchOrderShipment, dataSource);
  }
}
