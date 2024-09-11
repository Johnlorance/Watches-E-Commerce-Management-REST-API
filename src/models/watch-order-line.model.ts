import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Watch} from './watch.model';
import {WatchOrder} from './watch-order.model';

@model()
export class WatchOrderLine extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  order_ID: number;

  @property({
    type: 'date',
  })
  created_at?: string;

  @property({
    type: 'date',
  })
  updated_at?: string;

  @property({
    type: 'number',
    required: true,
  })
  order_quantity: number;

  @property({
    type: 'number',
    required: true,
  })
  quantity_allocated: number;

  // @property({
  //   type: 'number',
  //   required: true,
  // })
  @belongsTo(()=> Watch)
  watch_ID: number;
  // @property({
  //   type: 'number',
  //   required: true,
  // })
  @belongsTo(()=> WatchOrder)
  watch_order_ID: number;


  constructor(data?: Partial<WatchOrderLine>) {
    super(data);
  }
}

export interface WatchOrderLineRelations {
  // describe navigational properties here
}

export type WatchOrderLineWithRelations = WatchOrderLine & WatchOrderLineRelations;
