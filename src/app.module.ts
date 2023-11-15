import { Module } from '@nestjs/common';
import { CheckModule } from './check/check.module';
import { ClientsGlobalModule } from './clients/clients.module';
import { PalletserviceModule } from './palletservice/palletservice.module';
import { HealthModule } from './health/health.module';
import { HpmdlvModule } from './hpmdlv/hpmdlv.module';
import {
  AuthGuard,
  KeycloakConnectModule,
  PolicyEnforcementMode,
  ResourceGuard,
  RoleGuard,
  TokenValidation,
} from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';
import * as process from 'process';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AnseiModule } from './ansei/ansei.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    KeycloakConnectModule.register({
      authServerUrl: process.env.AUTH_SERVER_URL,
      realm: process.env.REALM,
      clientId: process.env.CLIENT_ID,
      realmPublicKey: process.env.PUBLIC_KEY,
      secret: process.env.SECRET,
      policyEnforcement: PolicyEnforcementMode.PERMISSIVE, // optional
      tokenValidation: TokenValidation.ONLINE, // optional
    }),
    ClientsGlobalModule,
    CheckModule,
    PalletserviceModule,
    HealthModule,
    HpmdlvModule,
    AnseiModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
