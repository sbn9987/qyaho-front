import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { QrscanComponent } from './qrscan.component';

describe('qrscanComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        QrscanComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(QrscanComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'scanner'`, () => {
    const fixture = TestBed.createComponent(QrscanComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('scanner');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(QrscanComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('scanner app is running!');
  });
});
