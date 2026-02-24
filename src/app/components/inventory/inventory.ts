import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { InvoicePdfService } from '../../service/invoice-pdf-service';
import { warn } from '@ant-design/icons-angular';
import { InventoryService } from '../../service/inventory.service';


@Component({
  selector: 'app-inventory',
  imports: [
    NzCardModule, NzTagModule, NzTableModule, NzButtonModule, NzFormModule, NzInputModule, NzSelectModule, NzModalModule, ReactiveFormsModule, CommonModule, FormsModule, NzIconModule

  ],
  templateUrl: './inventory.html',
  styleUrl: './inventory.less',
})
export class Inventory {
  invoiceSvc = inject(InventoryService)

  inventoryList: any[] = [

  ];

  isModalVisible = false;
  modalTitle = 'Add Item';
  inventoryForm: FormGroup

  editingItemIndex: number | null = null;

  constructor(private fb: FormBuilder) {
    this.inventoryForm = this.fb.group({
      name: [null, Validators.required],
      sku: [null, Validators.required],
      category: [null, Validators.required],
      quantity: [0, [Validators.required, Validators.min(0)]],
      status: ['Active', Validators.required],
    });
    this.getProducts()
  }

  openModal() {
    this.modalTitle = 'Add Item';
    this.isModalVisible = true;
    this.inventoryForm.reset({ status: 'Active', quantity: 0 });
    this.editingItemIndex = null;
  }

  editItem(item: any) {
    this.modalTitle = 'Edit Item';
    this.isModalVisible = true;
    this.editingItemIndex = this.inventoryList.indexOf(item);
    this.inventoryForm.setValue({
      name: item.name,
      sku: item.sku,
      category: item.category,
      quantity: item.quantity,
      status: item.status
    });
  }

  deleteItem(item: any) {
    this.inventoryList = this.inventoryList.filter(i => i !== item);
  }

  closeModal() {
    this.isModalVisible = false;
  }


  getProducts() {
    this.invoiceSvc.getProducts().subscribe(res => {
      this.inventoryList = res
      console.warn(res);

    })
  }


  deleteProduct(id: string) {
    this.invoiceSvc.deleteProduct(id).subscribe(res => {
      this.getProducts()
      console.warn(res);

    })
  }

  submitForm() {
    if (this.inventoryForm.invalid) return;

    const formValue = this.inventoryForm.value as any;

    if (this.editingItemIndex !== null) {
      // Update existing
      this.inventoryList[this.editingItemIndex] = formValue;
    } else {
      // Add new
      this.inventoryList.push(formValue);
    }

    this.closeModal();
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Active': return 'green';
      case 'Low Stock': return 'volcano';
      case 'Out of Stock': return 'red';
      default: return 'default';
    }
  }



}
