import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BugetManagementPage } from './buget-management.page';

describe('BugetManagementPage', () => {
  let component: BugetManagementPage;
  let fixture: ComponentFixture<BugetManagementPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BugetManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
