import {Entity, hasMany, model, property} from '@loopback/repository';
import {Watch} from './watch.model';
import {Watchcategory} from './watchcategory.model';
// import {WatchCategory} from './watch-category.model';
// import {WatchCategory} from './watchcategory.model';

@model()
export class Category extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  category_ID: number;

  @property({
    type: 'string',
  })
  category_name?: string;

  @property({
    type: 'date',
  })
  created_at?: string;

  @property({
    type: 'date',
  })
  updated_at?: string;

  @property({
    type: 'boolean',
    required: false,
  })
  deleted: boolean;

// @hasMany(()=>Watch, {through:{model: ()=> WatchCategory}})
//   watches:Watch[]

// @hasMany(()=>Category ,{through:{model:WatchCategory}})
//   categories:Category[]

// @hasMany(() => Watch, {through: {model: () => Watchcategory}})
// watches: Watch[];

  constructor(data?: Partial<Category>) {
    super(data);
  }
}

export interface CategoryRelations {
  // describe navigational properties here
}

export type CategoryWithRelations = Category & CategoryRelations;
