import { Module } from '@nestjs/common';
import { AnseiController } from './ansei.controller';
import { RawController } from './raw/raw.controller';
import { RawService } from './raw/raw.service';
import { ExcelService } from './utils/excel/excel.service';
import { HistoriesModule } from './histories/histories.module';

@Module({
  controllers: [AnseiController, RawController],
  providers: [RawService, ExcelService],
  imports: [HistoriesModule],
})
export class AnseiModule {}
