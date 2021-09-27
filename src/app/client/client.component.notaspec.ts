import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientComponent } from './client.component';
import { StatusCode } from '../statuscode';

describe('ClientComponent', () => {
    let component: ClientComponent;
    let fixture: ComponentFixture<ClientComponent>;
    
    beforeEach(async () => {
	await TestBed.configureTestingModule({
	    declarations: [ ClientComponent ]
	})
	    .compileComponents();
    });
    
    it('should create a ClientComponent', () => {
	const fixture = TestBed.createComponent(ClientComponent);
	const component = fixture.componentInstance;
	fixture.detectChanges();

	expect(component).toBeTruthy();
    });
    
});
