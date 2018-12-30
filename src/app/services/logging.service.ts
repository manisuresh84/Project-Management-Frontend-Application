import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class LoggingService {
    constructor() { }

    log(error: any) {
        console.log(error.message);
    }
}