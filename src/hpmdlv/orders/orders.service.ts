import { Inject, Injectable, Logger } from '@nestjs/common';
import { ExcelService } from '../utils/excel/excel.service';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, throwError } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(
    private excelService: ExcelService,
    @Inject('HPM_DLV_SERVICE') private client: ClientProxy,
  ) {}
  async create(file: Express.Multer.File) {
    try {
      const data = await this.excelService.readExcel(file);
      const transformedData = data.map((rowData: object) => ({
        kode: rowData['Barcode'],
        part_no: rowData['Part No'],
        part_name: rowData['Part Name'],
        part_color: rowData['Part Color Code :'],
        qty: rowData['Qty'],
        to1: rowData['TO 1'],
        to2: rowData['TO 2'],
        date_local: rowData['Date Local']?.toString() || null,
        time_local: rowData['Time Local']?.toString() || null,
        date_export: rowData['Date Export']?.toString() || null,
        time_export: rowData['Time Export']?.toString() || null,
        weekly: rowData['Weekly'],
        type_part: rowData['Tipe Part'],
        kd_lot_no: rowData['KD Lot No'],
        seq_no: rowData['Production SEQ No'],
        date: rowData['Date :'],
        time: new Date(rowData['Time :']),
      }));
      return this.client
        .send('createOrders', transformedData)
        .pipe(
          catchError((error) =>
            throwError(() => new RpcException(error.response)),
          ),
        );
    } catch (error) {
      Logger.log(error);
      // Handle error, e.g., return an error response
      throw new Error('Error processing Excel file');
    }
  }

  findAll(pageNumber?: number, pageSize?: number) {
    return this.client
      .send('findAllOrders', {
        pageNumber,
        pageSize,
      })
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }

  findOne(id: string) {
    return this.client
      .send('findOneOrders', id)
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
