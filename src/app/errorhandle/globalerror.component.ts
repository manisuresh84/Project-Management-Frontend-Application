import { Component, OnInit } from "@angular/core";
import { GlobalErrorHandler } from "./globalerrorhandle.error";
import {Subscription} from 'rxjs/Subscription';

@Component({
    template:`<h3>{{message}}</h3>`

    // template:`<h3>Error Occurred,
    // Please contact customer service!</h3>`
    
})

export class GlobalErrorComponent implements OnInit{
    message:string;
    subscription:Subscription;

  constructor(private data: GlobalErrorHandler) { }
    ngOnInit() {
        this.subscription = this.data.currentMessage
       .subscribe(message => this.message = message);
        //this.data.currentMessage.subscribe(message => this.message = message);
      }

      ngOnDestroy() {
        // prevent memory leak when component is destroyed
        this.subscription.unsubscribe();
      }
}