import { Module } from '@nestjs/common';
import { PalletserviceController } from './palletservice.controller';
import { CustomerController } from './customer/customer.controller';
import { CustomerService } from './customer/customer.service';
import { DestinationController } from './destination/destination.controller';
import { DestinationService } from './destination/destination.service';
import { DepartmentService } from './department/department.service';
import { DepartmentController } from './department/department.controller';
import { VehicleService } from './vehicle/vehicle.service';
import { VehicleController } from './vehicle/vehicle.controller';
import { PartController } from './part/part.controller';
import { PartService } from './part/part.service';
import { PalletController } from './pallet/pallet.controller';
import { PalletService } from './pallet/pallet.service';
import { HistoryService } from './history/history.service';
import { HistoryController } from './history/history.controller';
import { DashboardService } from './dashboard/dashboard.service';
import { DashboardController } from './dashboard/dashboard.controller';
import { StockopnameController } from './stockopname/stockopname.controller';
import { StockopnameService } from './stockopname/stockopname.service';
import { StokController } from './laporan/stok/stok.controller';
import { StokService } from './laporan/stok/stok.service';
import { MaintenanceController } from './laporan/maintenance/maintenance.controller';
import { MaintenanceService } from './laporan/maintenance/maintenance.service';
import { DeliveryController } from './delivery/delivery.controller';
import { DeliveryService } from './delivery/delivery.service';
import { HistoryOpController } from './operator/history.controller';
import { HistoryOpService } from './operator/history.service';
import { OpnameController } from './laporan/opname/stok.controller';
import { OpnameService } from './laporan/opname/stok.service';
import { RepairsModule } from './repairs/repairs.module';
import {RepairsController} from "./repairs/repairs.controller";
import {RepairsService} from "./repairs/repairs.service";

@Module({
  controllers: [
    PalletserviceController,
    CustomerController,
    DestinationController,
    DepartmentController,
    VehicleController,
    PartController,
    PalletController,
    HistoryController,
    DashboardController,
    StockopnameController,
    StokController,
    MaintenanceController,
    DeliveryController,
    HistoryOpController,
    OpnameController,
      RepairsController
  ],
  providers: [
    CustomerService,
    DestinationService,
    DepartmentService,
    VehicleService,
    PartService,
    PalletService,
    HistoryService,
    DashboardService,
    StockopnameService,
    StokService,
    MaintenanceService,
    DeliveryService,
    HistoryOpService,
    OpnameService,
      RepairsService
  ],
})
export class PalletserviceModule {}
