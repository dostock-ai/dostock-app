import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectQuantityOfProductComponent } from './select-quantity-of-product.component';

describe('SelectQuantityOfProductComponent', () => {
  let component: SelectQuantityOfProductComponent;
  let fixture: ComponentFixture<SelectQuantityOfProductComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectQuantityOfProductComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectQuantityOfProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
