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
import {WatchOrder} from '../models';
import {WatchOrderRepository} from '../repositories';

export class WatchOrderController {
  constructor(
    @repository(WatchOrderRepository)
    public watchOrderRepository : WatchOrderRepository,
  ) {}

  @post('/watch-orders')
  @response(200, {
    description: 'WatchOrder model instance',
    content: {'application/json': {schema: getModelSchemaRef(WatchOrder)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(WatchOrder, {
            title: 'NewWatchOrder',
            
          }),
        },
      },
    })
    watchOrder: WatchOrder,
  ): Promise<WatchOrder> {
    return this.watchOrderRepository.create(watchOrder);
  }

  @get('/watch-orders/count')
  @response(200, {
    description: 'WatchOrder model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(WatchOrder) where?: Where<WatchOrder>,
  ): Promise<Count> {
    return this.watchOrderRepository.count(where);
  }

  @get('/watch-orders')
  @response(200, {
    description: 'Array of WatchOrder model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(WatchOrder, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(WatchOrder) filter?: Filter<WatchOrder>,
  ): Promise<WatchOrder[]> {
    return this.watchOrderRepository.find(filter);
  }

  @patch('/watch-orders')
  @response(200, {
    description: 'WatchOrder PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(WatchOrder, {partial: true}),
        },
      },
    })
    watchOrder: WatchOrder,
    @param.where(WatchOrder) where?: Where<WatchOrder>,
  ): Promise<Count> {
    return this.watchOrderRepository.updateAll(watchOrder, where);
  }

  @get('/watch-orders/{id}')
  @response(200, {
    description: 'WatchOrder model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(WatchOrder, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(WatchOrder, {exclude: 'where'}) filter?: FilterExcludingWhere<WatchOrder>
  ): Promise<WatchOrder> {
    return this.watchOrderRepository.findById(id, filter);
  }

  @patch('/watch-orders/{id}')
  @response(204, {
    description: 'WatchOrder PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(WatchOrder, {partial: true}),
        },
      },
    })
    watchOrder: WatchOrder,
  ): Promise<void> {
    await this.watchOrderRepository.updateById(id, watchOrder);
  }

  @put('/watch-orders/{id}')
  @response(204, {
    description: 'WatchOrder PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() watchOrder: WatchOrder,
  ): Promise<void> {
    await this.watchOrderRepository.replaceById(id, watchOrder);
  }

  @del('/watch-orders/{id}')
  @response(204, {
    description: 'WatchOrder DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.watchOrderRepository.deleteById(id);
  }
}
