import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { ChatServiceService } from './chat-service.service';
import { HttpClientModule} from '@angular/common/http'
import { from } from 'rxjs';
import {AgmCoreModule} from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBaKumS2brsx6iqDlC9PHfsrPSunxN07Lw',
      libraries:["places"]
    })
  ],
  providers: [ChatServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
