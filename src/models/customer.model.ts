import {Entity, model, property} from '@loopback/repository';

@model()
export class Customer extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  customer_ID: number;

  @property({
    type: 'string',
    required: true,
  })
  customer_name: string;

  @property({
    type: 'date',
  })
  updated_at?: string;

  @property({
    type: 'date',
  })
  added_at?: string;

  @property({
    type: 'boolean',
    default: false,
  })
  deleted?: boolean;


  constructor(data?: Partial<Customer>) {
    super(data);
  }
}

export interface CustomerRelations {
  // describe navigational properties here
}

export type CustomerWithRelations = Customer & CustomerRelations;
