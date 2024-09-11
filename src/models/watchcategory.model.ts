import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Category} from './category.model';
import {watch} from 'fs';
import {Watch} from './watch.model';

@model()
export class Watchcategory extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  watch_category_ID?: number;

  @property({
    type: 'number',
    required: true,
  })
  watch_ID: number;

  @property({
    type: 'number',
    required: true,
  })
  category_ID: number;


  // Foreign key for Watch
  // @belongsTo(() => Watch, {keyFrom: 'watch_ID', keyTo: 'watch_id'})  // Assuming watch_id is the primary key in Watch
  // watch_id: number;

  // // Foreign key for Category
  // @belongsTo(() => Category, {keyFrom: 'category_id', keyTo: 'category_ID'})  // Assuming category_id is the primary key in Category
  // category_id: number;
}

export interface WatchcategoryRelations {
  // describe navigational properties here
}

export type WatchcategoryWithRelations = Watchcategory & WatchcategoryRelations;
