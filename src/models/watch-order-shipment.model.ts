import {Entity, hasMany, model, property} from '@loopback/repository';
import {WatchOrder} from './watch-order.model';

@model()
export class WatchOrderShipment extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  shipment_ID: number;

  @property({
    type: 'string',
    required: true,
  })
  tracking_number: string;

  @property({
    type: 'date',
  })
  created_at?: string;

  @property({
    type: 'date',
  })
  updated_at?: string;
@hasMany(()=> WatchOrder)
orders : WatchOrder[]

  constructor(data?: Partial<WatchOrderShipment>) {
    super(data);
  }
}

export interface WatchOrderShipmentRelations {
  // describe navigational properties here
}

export type WatchOrderShipmentWithRelations = WatchOrderShipment & WatchOrderShipmentRelations;
