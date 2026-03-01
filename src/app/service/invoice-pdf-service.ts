import { inject, Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { HttpService } from './http.service';

@Injectable({ providedIn: 'root' })
export class InvoicePdfService {
  private httpSvc = inject(HttpService)
  generateInvoice(invoice: any) {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(18);
    doc.text('INVOICE', 150, 20);

    doc.setFontSize(12);
    doc.text('My Company Name', 20, 20);
    doc.text('Address Line 1', 20, 26);
    doc.text('Phone: +92-000-0000000', 20, 32);

    // Invoice Info
    doc.text(`Invoice ID: ${invoice.invoiceId}`, 20, 50);
    doc.text(`Customer: ${invoice.customer}`, 20, 58);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 66);

    // Table Header
    doc.setFontSize(12);
    doc.text('Description', 20, 90);
    doc.text('Amount', 160, 90);

    doc.line(20, 92, 190, 92);

    // Single item (for now)
    doc.text('Sale Amount', 20, 105);
    doc.text(`${invoice.totalAmount}`, 160, 105);

    // Total
    doc.line(20, 115, 190, 115);
    doc.setFontSize(14);
    doc.text('Total:', 130, 130);
    doc.text(`${invoice.totalAmount}`, 160, 130);

    // Footer
    doc.setFontSize(10);
    doc.text('Thank you for your business!', 20, 270);

    doc.save(`Invoice-${invoice.invoiceId}.pdf`);
  }





}
