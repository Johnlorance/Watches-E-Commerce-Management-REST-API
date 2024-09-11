import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {WatchOrderLine} from '../models';
import {WatchOrderLineRepository} from '../repositories';

export class WatchOrderLineController {
  constructor(
    @repository(WatchOrderLineRepository)
    public watchOrderLineRepository : WatchOrderLineRepository,
  ) {}

  @post('/watch-order-lines')
  @response(200, {
    description: 'WatchOrderLine model instance',
    content: {'application/json': {schema: getModelSchemaRef(WatchOrderLine)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(WatchOrderLine, {
            title: 'NewWatchOrderLine',
            
          }),
        },
      },
    })
    watchOrderLine: WatchOrderLine,
  ): Promise<WatchOrderLine> {
    return this.watchOrderLineRepository.create(watchOrderLine);
  }

  @get('/watch-order-lines/count')
  @response(200, {
    description: 'WatchOrderLine model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(WatchOrderLine) where?: Where<WatchOrderLine>,
  ): Promise<Count> {
    return this.watchOrderLineRepository.count(where);
  }

  @get('/watch-order-lines')
  @response(200, {
    description: 'Array of WatchOrderLine model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(WatchOrderLine, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(WatchOrderLine) filter?: Filter<WatchOrderLine>,
  ): Promise<WatchOrderLine[]> {
    return this.watchOrderLineRepository.find(filter);
  }

  @patch('/watch-order-lines')
  @response(200, {
    description: 'WatchOrderLine PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(WatchOrderLine, {partial: true}),
        },
      },
    })
    watchOrderLine: WatchOrderLine,
    @param.where(WatchOrderLine) where?: Where<WatchOrderLine>,
  ): Promise<Count> {
    return this.watchOrderLineRepository.updateAll(watchOrderLine, where);
  }

  @get('/watch-order-lines/{id}')
  @response(200, {
    description: 'WatchOrderLine model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(WatchOrderLine, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(WatchOrderLine, {exclude: 'where'}) filter?: FilterExcludingWhere<WatchOrderLine>
  ): Promise<WatchOrderLine> {
    return this.watchOrderLineRepository.findById(id, filter);
  }

  @patch('/watch-order-lines/{id}')
  @response(204, {
    description: 'WatchOrderLine PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(WatchOrderLine, {partial: true}),
        },
      },
    })
    watchOrderLine: WatchOrderLine,
  ): Promise<void> {
    await this.watchOrderLineRepository.updateById(id, watchOrderLine);
  }

  @put('/watch-order-lines/{id}')
  @response(204, {
    description: 'WatchOrderLine PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() watchOrderLine: WatchOrderLine,
  ): Promise<void> {
    await this.watchOrderLineRepository.replaceById(id, watchOrderLine);
  }

  @del('/watch-order-lines/{id}')
  @response(204, {
    description: 'WatchOrderLine DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.watchOrderLineRepository.deleteById(id);
  }
}
