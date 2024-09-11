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
  HttpErrors,
} from '@loopback/rest';
import {Category, Customer} from '../models';
import {CustomerRepository} from '../repositories';

export class CustomerController {
  constructor(
    @repository(CustomerRepository)
    public customerRepository : CustomerRepository,
  ) {}

  //// Add New Bulk customers
  @post('/customers')
  @response(200, {
    description: 'Bulk create customers',
    content: {'application/json': {schema: {type: 'array', items: getModelSchemaRef(Customer)}}},
  })
  async bulkCreate(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: getModelSchemaRef(Customer),
          },
        },
      },
    })
    customers: Customer[],
  ): Promise<Customer[]> {
    return Promise.all(customers.map(Customer => this.customerRepository.create(Customer)));
  }


///View all customers using paging and sorting
@get('/customers')
@response(200, {
  description: 'Array of customer model instances with paging and sorting',
  content: {
    'application/json': {
      schema: {
        type: 'array',
        items: getModelSchemaRef(Customer, {includeRelations: true}),
      },
    },
  },
})
async find(
  @param.query.number('page', { default: 1 }) page: number,
  @param.query.number('size', { default: 1 }) size: number,
  @param.query.string('sort', { default: 'name,ASC' }) sort: string,
): Promise<Customer[]> {
  const offset = (page - 1) * size;
  const [sortField, sortOrder] = sort.split(',');

  // Build filter with paging and sorting
  const filter: Filter<Customer> = {
    limit: size,
    skip: offset,
    order: [`${sortField} ${sortOrder}`],
  };

  return this.customerRepository.find(filter);
}


  ////View Non deleted customers using paging and sorting
  @get('/customers/viewnondeleted')
  @response(200, {
    description: 'View nondeleted customers',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Customer, {includeRelations: true}),
        },
      },
    },
  })
  async findnonDeleted(
    @param.query.number('page', { default: 1 }) page: number,
    @param.query.number('size',{default:1}) size:number,
    @param.query.string('sort',{default:'model,ASC'}) sort: string,
  ): Promise<Customer[]> {
    const offset = (page - 1) * size;
    const [sortField, sortOrder] = sort.split(',');
    const filter: Filter<Customer>= {
      where: {deleted: false},
      limit: size,
      skip: offset,
      order: [`${sortField} ${sortOrder}`],
    };
    return this.customerRepository.find(filter);
  }



  //////View deleted customers
  @get('/customers/retreveDeleted')
  @response(200, {
    description: 'View deleted customers',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Customer, {includeRelations: true}),
        },
      },
    },
  })
  async findDeleted(
    @param.query.number('page',{default:1}) page:number,
    @param.query.number('size', { default: 1 }) size: number,
    @param.query.string('sort', { default: 'name,ASC' }) sort: string,
  ): Promise<Customer[]> {
    const offset = (page - 1) * size;
    const [sortField, sortOrder] = sort.split(',');

    const filter = {
      where: {deleted: true,
      limit: size,
      skip: offset,
      order: [`${sortField} ${sortOrder}`],
      }
    };
    return this.customerRepository.find(filter);
  }





  @patch('/customers/{id}')
  @response(204, {
    description: 'Customer PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Customer, {partial: true}),
        },
      },
    })
    customer: Customer,
  ): Promise<void> {
    await this.customerRepository.updateById(id, customer);
  }

  @put('/customers/{id}')
  @response(204, {
    description: 'Customer PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() customer: Customer,
  ): Promise<void> {
    await this.customerRepository.replaceById(id, customer);
  }




/////Bulk soft delete
  @patch('/customers/soft')
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
    await this.customerRepository.updateAll({deleted: true}, {customer_ID: {inq: ids}});
  }




  ///////Bulk Update
  @patch('/customers/updateBulk')
  @response(200, {
    description: 'customer PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @param.array('ids', 'query', {type: 'number'}) ids: number[],
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: getModelSchemaRef(Customer),
          },
        },
      },
    })
    data: Partial<Customer>[],
): Promise<void> {
  // Ensure IDs are provided
  if (!ids || ids.length === 0) {
    throw new HttpErrors.BadRequest('IDs must be provided in the URL.');
  }

  // Filter the customers by the provided IDs
  for (let i = 0; i < data.length; i++) {
    const customerID = data[i].customer_ID;
    if (!customerID) {
      throw new HttpErrors.BadRequest(`customer ID is missing for index ${i}`);
    }
    const updateFields: Partial<Customer> = {};

    if (data[i].deleted !== undefined) {
      updateFields.deleted = data[i].deleted;
    }
    if (data[i].added_at !== undefined) {
      updateFields.added_at = data[i].added_at;
    }
    if (data[i].updated_at !== undefined) {
      updateFields.updated_at = data[i].updated_at;
    }
    if (data[i].customer_name !== undefined) {
      updateFields.customer_name = data[i].customer_name;
    }

    const findcustomer = await this.customerRepository.findById(Number(customerID));

    await this.customerRepository.updateById(Number(customerID), updateFields);
  }
}


  ///// Search customers
  @get('/customers/search')
  @response(200, {
    description: 'Array of Customer model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Customer, {includeRelations: true}),
        },
      },
    },
  })
  async search(
    @param.query.string('name') name:string,
    @param.query.number('id') id:number
   // @param.filter(Customer) filter?: Filter<Customer>,
  ): Promise<Customer[]> {

    const searchKey:any = {}

    if(id)
    {
      searchKey.customer_ID = id
    }

    if(name)
      {
        searchKey.customer_name = name
      }

      console.log({searchKey})




    console.log({name})
    return this.customerRepository.find({where:searchKey});
  }


}
