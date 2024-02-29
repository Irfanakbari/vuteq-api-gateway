import { Module } from '@nestjs/common';
import { SewingController } from './sewing.controller';
import { MaterialsModule } from './materials/materials.module';
import { PartsModule } from './parts/parts.module';

@Module({
  controllers: [SewingController],
  providers: [],
  imports: [MaterialsModule, PartsModule],
})
export class SewingModule {}
