import {Entity, hasMany, hasOne, model, property} from '@loopback/repository';
import {WatchOrderShipment} from './watch-order-shipment.model';
import {Watch} from './watch.model';
import {WatchOrderLine} from './watch-order-line.model';

@model()
export class WatchOrder extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  watch_order_ID: number;

  @property({
    type: 'date',
  })
  created_at?: string;

  @property({
    type: 'date',
  })
  updated_at?: string;

  @property({
    type: 'string',
  })
  customer_ref?: string;

  @property({
    type: 'number',
    required: true,
  })
  customer_ID: number;

  @property({
    type: 'number',
    required: true,
  })
  shipment_ID: number;

  @property({
    type: 'boolean',
    required: true,
  })
  order_status: boolean;
@hasOne(() => WatchOrderShipment)
shipment :WatchOrderShipment

@hasMany(()=> Watch ,{through:{model:()=> WatchOrderLine}})
watches:Watch[]

  constructor(data?: Partial<WatchOrder>) {
    super(data);
  }
}

export interface WatchOrderRelations {
  // describe navigational properties here
}

export type WatchOrderWithRelations = WatchOrder & WatchOrderRelations;
