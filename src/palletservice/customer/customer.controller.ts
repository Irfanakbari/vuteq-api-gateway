import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerService } from './customer.service';
import { Roles } from 'nest-keycloak-connect';
import { UpdateCustomerDto } from './dto/update-customer.dto';

// @UseGuards(AuthSuperGuard)
@Controller({
  path: 'pallet/customers',
})
export class CustomerController {
  constructor(private custService: CustomerService) {}
  @Get()
  @Roles({ roles: ['pallet-control:super', 'pallet-control:admin'] })
  getCustomer() {
    return this.custService.getAllCustomer();
  }

  @Post()
  @Roles({ roles: ['pallet-control:super'] })
  createCustomer(@Body() data: CreateCustomerDto) {
    return this.custService.createCustomer(data);
  }

  @Delete(':id')
  @Roles({ roles: ['pallet-control:super'] })
  deleteCustomer(@Param('id') id: string) {
    return this.custService.deleteCustomer(id);
  }

  @Patch(':id')
  @Roles({ roles: ['pallet-control:super'] })
  updateDepartment(@Param('id') id: string, @Body() data: UpdateCustomerDto) {
    return this.custService.update(data, id);
  }
}
