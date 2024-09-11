import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Watchcategory, WatchcategoryRelations} from '../models';

export class WatchcategoryRepository extends DefaultCrudRepository<
  Watchcategory,
  typeof Watchcategory.prototype.watch_category_ID,
  WatchcategoryRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Watchcategory, dataSource);
  }
}
