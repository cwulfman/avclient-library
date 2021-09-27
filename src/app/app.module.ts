import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientComponent } from './client/client.component';
import { AvclientService } from './avclient.service';


@NgModule({
    declarations: [
	AppComponent,
	ClientComponent
    ],
    imports: [
	BrowserModule,
	AppRoutingModule,
	AvclientService
    ],
  providers: [AvclientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
