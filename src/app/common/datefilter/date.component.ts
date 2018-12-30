import { Component } from '@angular/core';
@Component({
    selector: 'date-app',
    templateUrl: './date.component.html' 
	
})
export class DateComponent {
    objDate = Date.now();
    numDate = 1478496544151;
    strDate = 'Mon Nov 7 2016';
} 