import { Inject, Injectable } from '@nestjs/common';
import { catchError, throwError } from 'rxjs';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ExcelService } from '../utils/excel/excel.service';

@Injectable()
export class RawService {
  constructor(
    private excelService: ExcelService,
    @Inject('ANSEI_SERVICE') private client: ClientProxy,
  ) {}

  async create(file: Express.Multer.File) {
    try {
      const data = await this.excelService.readExcel(file);
      const transformedData = data.map((rowData: any) => ({
        po_id: rowData['PO ID'],
        date: rowData['Date'],
        delivery_date: rowData['Delivery Date'],
        part_no: rowData['Part No'],
        part_name: rowData['Part Name'],
        quantity: rowData['Quantity'] ?? 0,
        id_part:
          rowData['ID Part'] !== null && rowData['ID Part'] !== undefined
            ? rowData['ID Part'].toString()
            : '',
        barcode: rowData['Barcode'],
        receiving_area: rowData['reciving area'],
        po_no: rowData['PO No'],
        model: rowData['Model'],
        bagian_part: rowData['Bagian Part'],
        delivery_period:
          rowData['Del periode'] !== null &&
          rowData['Del periode'] !== undefined
            ? rowData['Del periode'].toString()
            : '',
      }));
      return this.client
        .send('createRaw', transformedData)
        .pipe(
          catchError((error) =>
            throwError(() => new RpcException(error.response)),
          ),
        );
    } catch (error) {
      // Handle error, e.g., return an error response
      throw new Error('Error processing Excel file');
    }
  }

  findAll(pageNumber?: number, pageSize?: number) {
    return this.client
      .send('findAllRaw', {
        pageNumber,
        pageSize,
      })
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }

  findOne(id: number) {
    return `This action returns a #${id} raw`;
  }

  remove() {
    return this.client
      .send('deleteAllRaw', {})
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }
}
