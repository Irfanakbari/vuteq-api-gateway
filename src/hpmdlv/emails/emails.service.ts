import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, throwError } from 'rxjs';
import { CreateEmailsDto } from './dto/create-emails.dto';

@Injectable()
export class EmailsService {
  constructor(@Inject('HPM_DLV_SERVICE') private client: ClientProxy) {}
  create(createEmailsDto: CreateEmailsDto) {
    return this.client
      .send('createEmail', createEmailsDto)
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }

  findAll() {
    return this.client
      .send('findAllEmails', {})
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }

  remove(id: string) {
    return this.client
      .send('removeEmail', id)
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }
}
