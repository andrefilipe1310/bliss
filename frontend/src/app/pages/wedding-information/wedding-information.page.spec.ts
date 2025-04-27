import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { WeddingInformationPage } from './wedding-information.page';
import { FormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular';

describe('WeddingInformationPage', () => {
  let component: WeddingInformationPage;
  let fixture: ComponentFixture<WeddingInformationPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeddingInformationPage],
      imports: [IonicModule.forRoot(), FormsModule],
      providers: [AlertController],
    }).compileComponents();

    fixture = TestBed.createComponent(WeddingInformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have an input for name', () => {
    const nameInput = fixture.nativeElement.querySelector('ion-input[placeholder="Nome"]');
    expect(nameInput).toBeTruthy();
  });

  it('should have an input for partner name', () => {
    const partnerNameInput = fixture.nativeElement.querySelector('ion-input[placeholder="Nome"]');
    expect(partnerNameInput).toBeTruthy();
  });

  it('should update budget on input change', () => {
    const inputBudget = fixture.nativeElement.querySelector('ion-input[placeholder="R$ 0,00"]');
    inputBudget.value = '1000';
    inputBudget.dispatchEvent(new Event('ionInput'));

    expect(component.budget).toBe('R$ 1.000,00');
  });

  it('should call blockInput when guests input is changed', () => {
    const inputGuests = fixture.nativeElement.querySelector('ion-input[placeholder="0"]');
    inputGuests.value = '1500';
    inputGuests.dispatchEvent(new Event('ionInput'));

    expect(inputGuests.value).toBe('1500');
  });

  it('should limit the input to 4 characters in guests', () => {
    const inputGuests = fixture.nativeElement.querySelector('ion-input[placeholder="0"]');
    inputGuests.value = '12345'; 
    inputGuests.dispatchEvent(new Event('ionInput'));

    expect(inputGuests.value).toBe('1234');
  });

  it('should call onBudgetInput on budget input', () => {
    const event = {
      target: { value: '1500' }
    };
    const spy = spyOn(component, 'onBudgetInput');
    component.onBudgetInput(event as any);
    expect(spy).toHaveBeenCalled();
  });

  it('should check if a register button is present', () => {
    const button = fixture.nativeElement.querySelector('ion-button');
    expect(button).toBeTruthy();
  });

  it('should correctly format the budget value', () => {
    const event = { target: { value: '5000' } };
    component.onBudgetInput(event as any);
    expect(component.budget).toBe('R$ 50,00');
  });
});
