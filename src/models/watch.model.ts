import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Category} from './category.model';
import {WatchOrderLine} from './watch-order-line.model';
import {WatchOrder} from './watch-order.model';

@model()
export class Watch extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  watch_id: number;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

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
  model?: string;

  @property({
    type: 'string',
  })
  origin?: string;

  @property({
    type: 'string',
  })
  serial_number?: string;

  @property({
    type: 'number',
    required: true,
  })
  quantity_on_hand: number;

  @property({
    type: 'boolean',
    required: false,
  })
  deleted: boolean;


  // @hasMany(() => WatchOrder, {through:{model:()=> WatchOrderLine}})
  // watchorders?:WatchOrder[]
  // @belongsTo(() => Category, {keyFrom: 'watch_id', keyTo: 'category_id'})
  // categoryId: number;

  constructor(data?: Partial<Watch>) {
    super(data);
  }
}

export interface WatchRelations {
  // describe navigational properties here
}

export type WatchWithRelations = Watch & WatchRelations;
