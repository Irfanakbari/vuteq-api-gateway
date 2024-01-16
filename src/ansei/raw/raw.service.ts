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
        date: rowData['Date'] || null,
        vendorCode: rowData['Vendor code'],
        vendorName: rowData['Vendor name'],
        receivingArea: rowData['Receiving Area'],
        deliveryDate: rowData['Delivery date'] || null,
        deliveryPeriod: parseInt(rowData['Delivery period']) || 0,
        firm: rowData['Firm'],
        classification: rowData['Classification'],
        poNumber: rowData['PO number']?.toString(),
        item: parseInt(rowData['Item']) || 0,
        partsNumber: rowData['Parts number'],
        partsName: rowData['Parts name'],
        orderQuantity: parseInt(rowData['Order Quantity']) || 0,
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

  remove(id: number) {
    return `This action removes a #${id} raw`;
  }
}
