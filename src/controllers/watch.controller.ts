import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  patch,
  post,
  requestBody,
  response
} from '@loopback/rest';
import {Watch} from '../models';
import {WatchRepository} from '../repositories';
//@authenticate('jwt')
export class WatchController {
  constructor(
    @repository(WatchRepository)
    public watchRepository : WatchRepository,
  ) {}





  @get('watches/test-error')
  testError() {
    // Simulate a custom error
    throw new HttpErrors.BadRequest('This is a custom bad request error');
  }

  @get('watches/test-internal-error')
  testInternalError() {
    // Simulate an internal server error
    throw new Error('This is an internal server error');
  }


//// Add New Bulk Watches
  @post('/watches')
  @response(200, {
    description: 'Bulk create watches',
    content: {'application/json': {schema: {type: 'array', items: getModelSchemaRef(Watch)}}},
  })
  async bulkCreate(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: getModelSchemaRef(Watch),
          },
        },
      },
    })
    watches: Watch[],
  ): Promise<Watch[]> {
    return Promise.all(watches.map(watch => this.watchRepository.create(watch)));
  }





////Get number of models
  @get('/watches/count')
  @response(200, {
    description: 'Watch model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Watch) where?: Where<Watch>,
  ): Promise<Count> {
    return this.watchRepository.count(where);
  }




///View all watches using paging and sorting
  @get('/watches')
  @response(200, {
    description: 'Array of Watch model instances with paging and sorting',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Watch, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.query.number('page', { default: 1 }) page: number,
    @param.query.number('size', { default: 1 }) size: number,
    @param.query.string('sort', { default: 'name,ASC' }) sort: string,
  ): Promise<Watch[]> {
    const offset = (page - 1) * size;
    const [sortField, sortOrder] = sort.split(',');

    // Build filter with paging and sorting
    const filter: Filter<Watch> = {
      limit: size,
      skip: offset,
      order: [`${sortField} ${sortOrder}`],
    };

    return this.watchRepository.find(filter);
  }



////View Non deleted watches using paging and sorting
@get('/watches/viewnondeleted')
@response(200, {
  description: 'View nondeleted watches',
  content: {
    'application/json': {
      schema: {
        type: 'array',
        items: getModelSchemaRef(Watch, {includeRelations: true}),
      },
    },
  },
})
async findnonDeleted(
  @param.query.number('page', { default: 1 }) page: number,
  @param.query.number('size',{default:1}) size:number,
  @param.query.string('sort',{default:'model,ASC'}) sort: string,
): Promise<Watch[]> {
  const offset = (page - 1) * size;
  const [sortField, sortOrder] = sort.split(',');
  const filter: Filter<Watch>= {
    where: {deleted: false},
    limit: size,
    skip: offset,
    order: [`${sortField} ${sortOrder}`],
  };
  return this.watchRepository.find(filter);
}



//////View deleted watches
  @get('/watches/retreveDeleted')
  @response(200, {
    description: 'View deleted watches',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Watch, {includeRelations: true}),
        },
      },
    },
  })
  async findDeleted(
    @param.query.number('page',{default:1}) page:number,
    @param.query.number('size', { default: 1 }) size: number,
    @param.query.string('sort', { default: 'name,ASC' }) sort: string,
  ): Promise<Watch[]> {
    const offset = (page - 1) * size;
    const [sortField, sortOrder] = sort.split(',');

    const filter = {
      where: {deleted: true,
      limit: size,
      skip: offset,
      order: [`${sortField} ${sortOrder}`],
      }
    };
    return this.watchRepository.find(filter);
  }



////////Bulk Update
  @patch('/watches/updateBulk')
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
            items: getModelSchemaRef(Watch, {exclude:['quantity_on_hand']}),
          },
        },
      },
    })
    data: Partial<Watch>[],
): Promise<void> {
  // Ensure IDs are provided
  if (!ids || ids.length === 0) {
    throw new HttpErrors.BadRequest('IDs must be provided in the URL.');
  }

  // Filter the watches by the provided IDs
  for (let i = 0; i < data.length; i++) {
    const watchId = data[i].watch_id;
    if (!watchId) {
      throw new HttpErrors.BadRequest(`Watch ID is missing for index ${i}`);
    }
    const updateFields: Partial<Watch> = {};

    if (data[i].price !== undefined) {
      updateFields.price = data[i].price;
    }
    if (data[i].serial_number !== undefined) {
      updateFields.serial_number = data[i].serial_number;
    }
    if (data[i].created_at !== undefined) {
      updateFields.created_at = data[i].created_at;
    }
    if (data[i].updated_at !== undefined) {
      updateFields.updated_at = data[i].updated_at;
    }
    if (data[i].model !== undefined) {
      updateFields.model = data[i].model;
    }
    if (data[i].origin !== undefined) {
      updateFields.origin = data[i].origin;
    }
    const findWatch = await this.watchRepository.findById(Number(watchId));

    await this.watchRepository.updateById(Number(watchId), updateFields);
  }
}




  @get('/watches/{id}')
  @response(200, {
    description: 'Watch model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Watch, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Watch, {exclude: 'where'}) filter?: FilterExcludingWhere<Watch>
  ): Promise<Watch> {
    return this.watchRepository.findById(id, filter);
  }


////Edit watches
  @patch('/watches/{id}/update')
  @response(204, {
    description: 'Watch PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() watch: Partial<Watch>,
  ): Promise<void> {
    await this.watchRepository.updateById(id, watch);
  }


/////Bulk soft delete
  @patch('/watches/soft')
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
    await this.watchRepository.updateAll({deleted: true}, {watch_id: {inq: ids}});
  }




/////Search for watches
  @get('/watches/search')
  async search(
    @param.query.string('model') model:string,
    @param.query.number('id') id:number,
    @param.query.string('serial_number') serial_number:string,
    @param.query.string('origin') origin:string
  ): Promise<Watch[]> {

    const searchKey:any = {}

    if(id)
    {
      searchKey.watch_id = id
    }

    if(model)
      {
        searchKey.model = model
      }

    if(serial_number)
    {
      searchKey.serial_number = serial_number
    }
    if(origin)
    {
      searchKey.origin = origin
    }
    return this.watchRepository.find({where:searchKey});
  }
}
