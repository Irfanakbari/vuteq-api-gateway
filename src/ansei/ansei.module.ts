import { Module } from '@nestjs/common';
import { AnseiController } from './ansei.controller';
import { RawController } from './raw/raw.controller';
import { RawService } from './raw/raw.service';
import { ExcelService } from './utils/excel/excel.service';
import { HistoriesController } from './histories/histories.controller';

@Module({
  controllers: [AnseiController, RawController, HistoriesController],
  providers: [RawService, ExcelService],
})
export class AnseiModule {}
