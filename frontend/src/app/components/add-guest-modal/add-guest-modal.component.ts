import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Guest } from 'src/app/models/pages-interfaces.model';

@Component({
  selector: 'app-add-guest-modal',
  templateUrl: './add-guest-modal.component.html',
  styleUrls: ['./add-guest-modal.component.scss'],
  standalone: false,
})
export class AddGuestModalComponent {
  @Input() guestType: 'bride' | 'groom' = 'bride';
  @Input() isOpen = false;
  @Output() isOpenChange = new EventEmitter<boolean>();
  @Output() guestAdded = new EventEmitter<Guest>();

  guest: Guest = {
    id: '',
    name: '',
    type: 'guest',
    email: '',
    phone: '',
    bog: 'bride',
  };

  errorName = '';
  errorEmail = '';
  errorPhone = '';

  validate(): boolean {
    this.errorName = this.guest.name ? '' : 'Nome é obrigatório';
    this.errorEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.guest.email) ? '' : 'Email inválido';
    this.errorPhone = this.guest.phone?.length === 11 ? '' : 'Telefone inválido';

    return !this.errorName && !this.errorEmail && !this.errorPhone;
  }

  submit() {
    if (!this.validate()) return;

    this.guest.id = crypto.randomUUID();
    this.guest.bog = this.guestType;
    this.guestAdded.emit({ ...this.guest });
    this.reset();
  }

  closeModal() {
    this.reset();
    this.isOpenChange.emit(false);
  }

  private reset() {
    this.guest = {
      id: '',
      name: '',
      type: 'guest',
      email: '',
      phone: '',
      bog: this.guestType,
    };
    this.errorName = '';
    this.errorEmail = '';
    this.errorPhone = '';
  }
}
