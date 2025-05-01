import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PresentsPage } from './presents.page';

describe('PresentsPage', () => {
  let component: PresentsPage;
  let fixture: ComponentFixture<PresentsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
