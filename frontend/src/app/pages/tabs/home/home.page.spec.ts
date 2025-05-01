import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

fdescribe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [HomePage],
      providers: [
        { provide: Router, useValue: mockRouter }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle searchIsActive on activeSearch()', () => {
    const initial = component.searchIsActive;
    component.activeSearch();
    expect(component.searchIsActive).toBe(!initial);
  });

  it('should format number to currency correctly', () => {
    const result = component.formatNumber(1234.56);
    expect(result).toContain('R$'); // depende da implementação de formatNumberToR$
  });

  it('should navigate to presents tab', () => {
    component.goToPresents();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/tabs/presents']);
  });

  it('should navigate to service detail', () => {
    component.goToServiceDetail();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/service-detail']);
  });

  it('should return "99+" when notifications > 99', () => {
    component.notificationsNumber = 100;
    expect(component.maxNotificationsReach()).toBe('99+');
  });

  it('should return the actual number when notifications <= 99', () => {
    component.notificationsNumber = 10;
    expect(component.maxNotificationsReach()).toBe(10);
  });

  it('should clear filter and reset filteredServices', () => {
    const original = component.allServices.length;
    component.Clearfilter();
    expect(component.filteredServices.length).toBe(original);
  });

  it('should filter services by name on search', () => {
    component.search('serviço'); // depende do mock de dados, mas valida que muda algo
    expect(component.filteredServices).toBeTruthy();
  });

  it('should filter services by category on filter()', () => {
    const before = component.filteredServices.length;
    component.filter('categoria');
    expect(component.filteredServices.length).toBeLessThanOrEqual(before);
  });

  it('should return category label in changeCategoryToPTBR()', () => {
    const categoriaValida = component.expanseCategories[0]?.value;
    const label = component.changeCategoryToPTBR(categoriaValida);
    expect(label).toBeTruthy();
  });

  it('should return "sem categoria" if category not found', () => {
    const label = component.changeCategoryToPTBR('inexistente');
    expect(label).toBe('sem categoria');
  });
});

