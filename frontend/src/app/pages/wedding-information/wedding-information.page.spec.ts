import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeddingInformationPage } from './wedding-information.page';

describe('WeddingInformationPage', () => {
  let component: WeddingInformationPage;
  let fixture: ComponentFixture<WeddingInformationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WeddingInformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
