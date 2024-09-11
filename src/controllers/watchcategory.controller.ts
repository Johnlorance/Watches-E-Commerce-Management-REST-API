import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response
} from '@loopback/rest';
import {Watch, Watchcategory} from '../models';
import {CategoryRepository, WatchcategoryRepository, WatchRepository} from '../repositories';

export class WatchcategoryController {
  constructor(
    @repository(WatchcategoryRepository)
    public watchcategoryRepository: WatchcategoryRepository,
    // @repository(WatchRepository)
    // public watchRepository: WatchRepository,
    // @repository(CategoryRepository)
    // public categoryRepository: CategoryRepository,
  ) {}

  @post('/watchcategories')
  @response(200, {
    description: 'Watchcategory model instance',
    content: {'application/json': {schema: getModelSchemaRef(Watchcategory)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Watchcategory, {
            title: 'NewWatchcategory',

          }),
        },
      },
    })
    watchcategory: Watchcategory,
  ): Promise<Watchcategory> {
    return this.watchcategoryRepository.create(watchcategory);
  }

  @get('/watchcategories/count')
  @response(200, {
    description: 'Watchcategory model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Watchcategory) where?: Where<Watchcategory>,
  ): Promise<Count> {
    return this.watchcategoryRepository.count(where);
  }

  @get('/watchcategories')
  @response(200, {
    description: 'Array of Watchcategory model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Watchcategory, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Watchcategory) filter?: Filter<Watchcategory>,
  ): Promise<Watchcategory[]> {
    return this.watchcategoryRepository.find(filter);
  }

  @patch('/watchcategories')
  @response(200, {
    description: 'Watchcategory PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Watchcategory, {partial: true}),
        },
      },
    })
    watchcategory: Watchcategory,
    @param.where(Watchcategory) where?: Where<Watchcategory>,
  ): Promise<Count> {
    return this.watchcategoryRepository.updateAll(watchcategory, where);
  }

  @get('/watchcategories/{id}')
  @response(200, {
    description: 'Watchcategory model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Watchcategory, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Watchcategory, {exclude: 'where'}) filter?: FilterExcludingWhere<Watchcategory>
  ): Promise<Watchcategory> {
    return this.watchcategoryRepository.findById(id, filter);
  }

  @patch('/watchcategories/{id}')
  @response(204, {
    description: 'Watchcategory PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Watchcategory, {partial: true}),
        },
      },
    })
    watchcategory: Watchcategory,
  ): Promise<void> {
    await this.watchcategoryRepository.updateById(id, watchcategory);
  }

  @put('/watchcategories/{id}')
  @response(204, {
    description: 'Watchcategory PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() watchcategory: Watchcategory,
  ): Promise<void> {
    await this.watchcategoryRepository.replaceById(id, watchcategory);
  }

  @del('/watchcategories/{id}')
  @response(204, {
    description: 'Watchcategory DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.watchcategoryRepository.deleteById(id);
  }




  // @get('/watches/by-category')
  // async findWatchesByCategoryName(
  //   @param.query.string('name') categoryName: string,
  // ): Promise<Watch[]> {
  //   try {
  //     // Step 1: Find the category by its name
  //     const category = await this.categoryRepository.findOne({
  //       where: {category_name: categoryName},
  //     });

  //     if (!category) {
  //       throw new Error('Category not found');
  //     }

  //     // Step 2: Find all watch_category records for this category
  //     const watchCategories = await this.watchcategoryRepository.find({
  //       where: {category_ID: category.category_ID},  // Use correct column name
  //     });

  //     const watchIds = watchCategories.map(wc => wc.watch_ID);  // Use correct column name

  //     // Step 3: Find all watches related to the watchIds
  //     return this.watchRepository.find({
  //       where: {watch_id: {inq: watchIds}},  // Use correct column name
  //     });

  //   } catch (err) {
  //     console.error('Error finding watches by category:', err);
  //     throw new Error('Internal Server Error');
  //   }
  //}
}
