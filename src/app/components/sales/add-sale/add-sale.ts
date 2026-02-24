import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTagModule } from 'ng-zorro-antd/tag';
import jsPDF from 'jspdf';
import { InvoicePdfService } from '../../../service/invoice-pdf-service';

@Component({
  selector: 'app-add-sale',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzTableModule,
    NzButtonModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzTagModule
  ],
  templateUrl: './add-sale.html',
  styleUrl: './add-sale.less',
})
export class AddSale {



  sales: any[] = [
    {
      invoiceId: 'INV001', customer: 'ABC Corp', totalAmount: 500, status: 'Paid', items: [
        { name: 'Item A', quantity: 2, unitPrice: 100, subtotal: 200 },
        { name: 'Item B', quantity: 3, unitPrice: 100, subtotal: 300 }
      ]
    },
    {
      invoiceId: 'INV002', customer: 'XYZ Ltd', totalAmount: 300, status: 'Unpaid', items: [
        { name: 'Item C', quantity: 3, unitPrice: 100, subtotal: 300 }
      ]
    }
  ];

  isModalVisible = false;
  isEditMode = false;
  editingIndex: number | null = null;

  salesForm: FormGroup;

  constructor(private fb: FormBuilder, private invoicePdf: InvoicePdfService) {
    this.salesForm = this.fb.group({
      invoiceId: ['', Validators.required],
      customer: ['', Validators.required],
      status: ['Paid', Validators.required],
      items: this.fb.array([]),
      totalAmount: [{ value: 0, disabled: true }] // ← add this

    });
  }

  get items(): FormArray {
    return this.salesForm.get('items') as FormArray;
  }

  newItem(item?: any): FormGroup {
    return this.fb.group({
      name: [item?.name || '', Validators.required],
      quantity: [item?.quantity || 1, [Validators.required, Validators.min(1)]],
      unitPrice: [item?.unitPrice || 0, [Validators.required, Validators.min(0)]],
      subtotal: [{ value: item?.subtotal || 0, disabled: true }]
    });
  }

  addItem(item?: any) {
    this.items.push(this.newItem(item));
  }

  removeItem(index: number) {
    this.items.removeAt(index);
    this.updateTotal();
  }

  updateSubtotal(index: number) {
    const item = this.items.at(index);
    const quantity = item.get('quantity')?.value || 0;
    const unitPrice = item.get('unitPrice')?.value || 0;
    item.get('subtotal')?.setValue(quantity * unitPrice);
    this.updateTotal();
  }

  updateTotal() {
    const total = this.items.controls.reduce((sum, i) => sum + (i.get('subtotal')?.value || 0), 0);
    this.salesForm.get('totalAmount')?.setValue(total);
  }
  openAddModal() {
    this.isEditMode = false;
    this.salesForm.reset({ status: 'Paid', totalAmount: 0 });
    this.items.clear();
    this.addItem(); // start with 1 item row
    this.isModalVisible = true;
  }

  openEditModal(index: number) {
    this.isEditMode = true;
    this.editingIndex = index;
    const sale = this.sales[index];
    this.salesForm.patchValue({
      invoiceId: sale.invoiceId,
      customer: sale.customer,
      status: sale.status,
      totalAmount: sale.totalAmount
    });
    this.items.clear();
    sale.items.forEach((i: any) => this.addItem(i));
    this.isModalVisible = true;
  }

  handleOk() {
    if (this.salesForm.invalid) {
      this.salesForm.markAllAsTouched();
      return;
    }

    const formValue = this.salesForm.getRawValue();

    if (this.isEditMode && this.editingIndex !== null) {
      this.sales[this.editingIndex] = formValue;
    } else {
      this.sales.push(formValue);
    }

    // ✅ Generate PDF immediately
    this.downloadInvoice(formValue);

    this.isModalVisible = false;
  }

  generateInvoice(sale: any) {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(18);
    doc.text('INVOICE', 150, 20);
    doc.setFontSize(12);
    doc.text(`Invoice ID: ${sale.invoiceId}`, 20, 30);
    doc.text(`Customer: ${sale.customer}`, 20, 36);
    doc.text(`Status: ${sale.status}`, 20, 42);

    // Table header
    let startY = 60;
    doc.text('Product', 20, startY);
    doc.text('Qty', 80, startY);
    doc.text('Unit Price', 110, startY);
    doc.text('Subtotal', 150, startY);

    doc.line(20, startY + 2, 190, startY + 2);

    // Table items
    sale.items.forEach((item: any, i: number) => {
      const y = startY + 10 + i * 8;
      doc.text(item.name, 20, y);
      doc.text(item.quantity.toString(), 80, y);
      doc.text(item.unitPrice.toFixed(2), 110, y);
      doc.text(item.subtotal.toFixed(2), 150, y);
    });

    // Total
    const totalY = startY + 10 + sale.items.length * 8 + 10;
    doc.setFontSize(14);
    doc.text(`Total: ${sale.totalAmount}`, 150, totalY);

    doc.save(`Invoice-${sale.invoiceId}.pdf`);
  }



  handleCancel() {
    this.isModalVisible = false;
  }

  deleteSale(index: number) {
    this.sales.splice(index, 1);
  }

  getStatusColor(status: string): string {
    return status === 'Paid' ? 'green' : 'red';
  }

  downloadInvoice(sale: any) {
    this.invoicePdf.generateInvoice(sale);
  }
}
