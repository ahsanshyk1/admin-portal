import { Component } from '@angular/core';
import { Workbook } from 'exceljs';

import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [NzTagModule, NzTableModule, CommonModule, NzButtonModule],
  templateUrl: './report.html',
  styleUrls: ['./report.less'],
})
export class Report {
  inventoryReports = [
    { item: 'Item A', sku: 'SKU001', category: 'Category 1', quantity: 50, status: 'Active' },
    { item: 'Item B', sku: 'SKU002', category: 'Category 2', quantity: 5, status: 'Low Stock' },
    { item: 'Item C', sku: 'SKU003', category: 'Category 1', quantity: 0, status: 'Out of Stock' },
  ];

  orderReports = [
    { orderId: 'ORD001', customer: 'ABC Corp', date: '2026-02-13', totalItems: 10, status: 'Pending' },
    { orderId: 'ORD002', customer: 'XYZ Ltd', date: '2026-02-12', totalItems: 5, status: 'Shipped' },
    { orderId: 'ORD003', customer: 'DEF Inc', date: '2026-02-10', totalItems: 20, status: 'Delivered' },
  ];

  salesReports = [
    { invoiceId: 'INV001', customer: 'ABC Corp', date: '2026-02-13', totalAmount: 500, status: 'Paid' },
    { invoiceId: 'INV002', customer: 'XYZ Ltd', date: '2026-02-12', totalAmount: 300, status: 'Unpaid' },
    { invoiceId: 'INV003', customer: 'LMN Co', date: '2026-02-10', totalAmount: 800, status: 'Paid' },
  ];

  // ------------------- Status Colors -------------------
  getInventoryStatusColor(status: string): string {
    switch (status) {
      case 'Active': return 'green';
      case 'Low Stock': return 'orange';
      case 'Out of Stock': return 'red';
      default: return 'default';
    }
  }

  getOrderStatusColor(status: string): string {
    switch (status) {
      case 'Pending': return 'orange';
      case 'Shipped': return 'blue';
      case 'Delivered': return 'green';
      case 'Cancelled': return 'red';
      default: return 'default';
    }
  }

  getSalesStatusColor(status: string): string {
    return status === 'Paid' ? 'green' : 'red';
  }

  // ------------------- Excel Export -------------------
  exportToExcel(data: any[], fileName: string, headers?: string[]) {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet(fileName);

    // Use provided headers OR fallback to object keys
    const cols = headers?.map((h: string) => ({ header: h, key: h, width: 20 }))
      || Object.keys(data[0] || {}).map(key => ({ header: key, key, width: 20 }));

    worksheet.columns = cols;

    // Add Rows
    data.forEach(item => worksheet.addRow(item));

    // Style header
    worksheet.getRow(1).eachCell(cell => {
      cell.font = { bold: true };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
    });

    // Export
    workbook.xlsx.writeBuffer().then(buffer => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${fileName}-${new Date().toLocaleDateString()}.xlsx`;
      link.click();
      URL.revokeObjectURL(link.href);
      link.remove();
    });
  }

}
