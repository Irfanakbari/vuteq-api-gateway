import { Module } from '@nestjs/common';
import { ExcelService } from './utils/excel/excel.service';
import { OrdersService } from './orders/orders.service';
import { OrdersController } from './orders/orders.controller';
import { HistoriesService } from './histories/histories.service';
import { HistoriesController } from './histories/histories.controller';
import { DashboardController } from './dashboard/dashboard.controller';
import { DashboardService } from './dashboard/dashboard.service';
import { EmailsService } from './emails/emails.service';
import { EmailsController } from './emails/emails.controller';

@Module({
  controllers: [
    OrdersController,
    HistoriesController,
    DashboardController,
    EmailsController,
  ],
  providers: [
    ExcelService,
    OrdersService,
    HistoriesService,
    DashboardService,
    EmailsService,
  ],
})
export class HpmdlvModule {}
