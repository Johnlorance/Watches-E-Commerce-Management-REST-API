import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  patch,
  post,
  put,
  requestBody,
  response
} from '@loopback/rest';
import {Category} from '../models';
import {CategoryRepository} from '../repositories';

export class CategoryController {
  constructor(
    @repository(CategoryRepository)
    public categoryRepository : CategoryRepository,
  ) {}

  //// Add New bulk categories
  @post('/categories')
  @response(200, {
    description: 'Bulk create categories',
    content: {'application/json': {schema: {type: 'array', items: getModelSchemaRef(Category)}}},
  })
  async bulkCreate(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: getModelSchemaRef(Category),
          },
        },
      },
    })
    Category: Category[],
  ): Promise<Category[]> {
    return Promise.all(Category.map(Category => this.categoryRepository.create(Category)));
  }

  @get('/categories/count')
  @response(200, {
    description: 'Category model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Category) where?: Where<Category>,
  ): Promise<Count> {
    return this.categoryRepository.count(where);
  }

  @get('/categories')
  @response(200, {
    description: 'Array of Category model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Category, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Category) filter?: Filter<Category>,
  ): Promise<Category[]> {
    return this.categoryRepository.find(filter);
  }


  @get('/categories/{id}')
  @response(200, {
    description: 'Category model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Category, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Category, {exclude: 'where'}) filter?: FilterExcludingWhere<Category>
  ): Promise<Category> {
    return this.categoryRepository.findById(id, filter);
  }



  @put('/categories/{id}')
  @response(204, {
    description: 'Category PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() category: Category,
  ): Promise<void> {
    await this.categoryRepository.replaceById(id, category);
  }


  /////Search for categories
  @get('/categories/search')
  async search(
    @param.query.number('id') id:number,
  ): Promise<Category[]> {

    const searchKey:any = {}
    if(id)
      {
        searchKey.category_ID = id
      }
    return this.categoryRepository.find({where:searchKey});
  }



  //////View deleted categories
  @get('/categories/retreveDeleted')
  @response(200, {
    description: 'View deleted categories',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Category, {includeRelations: true}),
        },
      },
    },
  })
  async findDeleted(): Promise<Category[]> {
    const filter = {
      where: {deleted: true}
    };
    return this.categoryRepository.find(filter);
  }



  ////View Non deleted categories
  @get('/categories/viewnondeleted')
  @response(200, {
    description: 'View nondeleted categories',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Category, {includeRelations: true}),
        },
      },
    },
  })
  async findnonDeleted(): Promise<Category[]> {
    const filter = {
      where: {deleted: false}
    };
    return this.categoryRepository.find(filter);
  }


    /////Bulk soft delete
    @patch('/categories/soft')
    @response(204, {
      description: 'Bulk soft DELETE success',
    })
    async bulkDelete(
      @requestBody({
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                ids: {
                  type: 'array',
                  items: {type: 'number'},
                },
              },
            },
          },
        },
      })
      data: {ids: number[]},
    ): Promise<void> {
      const {ids} = data;
      await this.categoryRepository.updateAll({deleted: true}, {category_ID: {inq: ids}});
    }

  ////Edit categories
  @patch('/categories/{id}/update')
  @response(204, {
    description: 'category PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() Category: Partial<Category>,
  ): Promise<void> {
    await this.categoryRepository.updateById(id, Category);
  }



  ////////Bulk Update
  @patch('/categories/updateBulk')
  @response(200, {
    description: 'Watch PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @param.array('ids', 'query', {type: 'number'}) ids: number[],
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: getModelSchemaRef(Category),
          },
        },
      },
    })
    data: Partial<Category>[],
): Promise<void> {
  // Ensure IDs are provided
  if (!ids || ids.length === 0) {
    throw new HttpErrors.BadRequest('IDs must be provided in the URL.');
  }

  // Filter the watches by the provided IDs
  for (let i = 0; i < data.length; i++) {
    const categoryID = data[i].category_ID;
    if (!categoryID) {
      throw new HttpErrors.BadRequest(`category ID is missing for index ${i}`);
    }
    const updateFields: Partial<Category> = {};

    if (data[i].category_name !== undefined) {
      updateFields.category_name = data[i].category_name;
    }
    if (data[i].created_at !== undefined) {
      updateFields.created_at = data[i].created_at;
    }
    if (data[i].updated_at !== undefined) {
      updateFields.updated_at = data[i].updated_at;
    }
    if (data[i].deleted !== undefined) {
      updateFields.deleted = data[i].deleted;
    }

    const findWatch = await this.categoryRepository.findById(Number(categoryID));

    await this.categoryRepository.updateById(Number(categoryID), updateFields);
  }
}
}
