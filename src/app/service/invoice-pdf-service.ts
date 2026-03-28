import { inject, Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { HttpService } from './http.service';

@Injectable({ providedIn: 'root' })
export class InvoicePdfService {
  private httpSvc = inject(HttpService)
  generateInvoice(invoice: any) {
    const doc = new jsPDF();
    const primaryColor = '#f79e44';
    const secondaryColor = '#64748b';
    const darkColor = '#1e293b';

    // Header Color Bar
    doc.setFillColor(247, 158, 68); // #f79e44
    doc.rect(0, 0, 210, 40, 'F');

    // Title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    doc.text('INVOICE', 140, 25);

    // Company Info
    doc.setFontSize(14);
    doc.text('Battery Admin Portal', 20, 20);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Premium Battery Solutions Inc.', 20, 27);
    doc.text('123 Energy Way, Battery Park, NY 10004', 20, 32);

    // Invoice Meta Data
    doc.setTextColor(darkColor);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('BILL TO:', 20, 60);
    doc.setFont('helvetica', 'normal');
    doc.text(invoice.customer, 20, 66);
    doc.text('Customer Contact Info', 20, 72);

    doc.setFont('helvetica', 'bold');
    doc.text('INVOICE DETAILS:', 130, 60);
    doc.setFont('helvetica', 'normal');
    doc.text(`Invoice ID: ${invoice.invoiceId}`, 130, 66);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 130, 72);
    doc.text(`Status: ${invoice.status}`, 130, 78);

    // Table Header
    doc.setDrawColor(226, 232, 240);
    doc.line(20, 95, 190, 95);
    doc.setFont('helvetica', 'bold');
    doc.text('Product Description', 22, 102);
    doc.text('Qty', 100, 102);
    doc.text('Unit Price', 130, 102);
    doc.text('Subtotal', 165, 102);
    doc.line(20, 105, 190, 105);

    // Table Items
    doc.setFont('helvetica', 'normal');
    let currentY = 115;
    
    // Check if invoice.items exists, otherwise use a placeholder
    const items = invoice.items || [{ name: 'Battery Service/Product', quantity: 1, unitPrice: invoice.totalAmount, subtotal: invoice.totalAmount }];
    
    items.forEach((item: any) => {
      doc.text(item.name || 'Product', 22, currentY);
      doc.text(item.quantity?.toString() || '1', 100, currentY);
      doc.text(`$${(item.unitPrice || 0).toFixed(2)}`, 130, currentY);
      doc.text(`$${(item.subtotal || 0).toFixed(2)}`, 165, currentY);
      currentY += 10;
    });

    // Total Section
    doc.line(120, currentY + 5, 190, currentY + 5);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('Total Amount:', 122, currentY + 15);
    doc.setTextColor(primaryColor);
    doc.text(`$${(invoice.totalAmount || 0).toFixed(2)}`, 165, currentY + 15);

    // Footer
    doc.setTextColor(secondaryColor);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'italic');
    doc.text('Thank you for choosing Battery Admin Portal for your energy needs.', 20, 270);
    doc.text('Generated electronically on ' + new Date().toLocaleString(), 20, 275);

    doc.save(`Invoice-${invoice.invoiceId}.pdf`);
  }





}
