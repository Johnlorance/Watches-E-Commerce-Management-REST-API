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
import {WatchOrderShipment} from '../models';
import {WatchOrderShipmentRepository} from '../repositories';

export class WatchOrderShipmentController {
  constructor(
    @repository(WatchOrderShipmentRepository)
    public watchOrderShipmentRepository : WatchOrderShipmentRepository,
  ) {}

  @post('/watch-order-shipments')
  @response(200, {
    description: 'WatchOrderShipment model instance',
    content: {'application/json': {schema: getModelSchemaRef(WatchOrderShipment)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(WatchOrderShipment, {
            title: 'NewWatchOrderShipment',
            
          }),
        },
      },
    })
    watchOrderShipment: WatchOrderShipment,
  ): Promise<WatchOrderShipment> {
    return this.watchOrderShipmentRepository.create(watchOrderShipment);
  }

  @get('/watch-order-shipments/count')
  @response(200, {
    description: 'WatchOrderShipment model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(WatchOrderShipment) where?: Where<WatchOrderShipment>,
  ): Promise<Count> {
    return this.watchOrderShipmentRepository.count(where);
  }

  @get('/watch-order-shipments')
  @response(200, {
    description: 'Array of WatchOrderShipment model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(WatchOrderShipment, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(WatchOrderShipment) filter?: Filter<WatchOrderShipment>,
  ): Promise<WatchOrderShipment[]> {
    return this.watchOrderShipmentRepository.find(filter);
  }

  @patch('/watch-order-shipments')
  @response(200, {
    description: 'WatchOrderShipment PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(WatchOrderShipment, {partial: true}),
        },
      },
    })
    watchOrderShipment: WatchOrderShipment,
    @param.where(WatchOrderShipment) where?: Where<WatchOrderShipment>,
  ): Promise<Count> {
    return this.watchOrderShipmentRepository.updateAll(watchOrderShipment, where);
  }

  @get('/watch-order-shipments/{id}')
  @response(200, {
    description: 'WatchOrderShipment model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(WatchOrderShipment, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(WatchOrderShipment, {exclude: 'where'}) filter?: FilterExcludingWhere<WatchOrderShipment>
  ): Promise<WatchOrderShipment> {
    return this.watchOrderShipmentRepository.findById(id, filter);
  }

  @patch('/watch-order-shipments/{id}')
  @response(204, {
    description: 'WatchOrderShipment PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(WatchOrderShipment, {partial: true}),
        },
      },
    })
    watchOrderShipment: WatchOrderShipment,
  ): Promise<void> {
    await this.watchOrderShipmentRepository.updateById(id, watchOrderShipment);
  }

  @put('/watch-order-shipments/{id}')
  @response(204, {
    description: 'WatchOrderShipment PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() watchOrderShipment: WatchOrderShipment,
  ): Promise<void> {
    await this.watchOrderShipmentRepository.replaceById(id, watchOrderShipment);
  }

  @del('/watch-order-shipments/{id}')
  @response(204, {
    description: 'WatchOrderShipment DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.watchOrderShipmentRepository.deleteById(id);
  }
}
