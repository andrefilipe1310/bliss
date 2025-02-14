import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvitationListPage } from './invitation-list.page';

describe('InvitationListPage', () => {
  let component: InvitationListPage;
  let fixture: ComponentFixture<InvitationListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitationListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
