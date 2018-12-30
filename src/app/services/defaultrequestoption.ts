import { BaseRequestOptions, Headers } from "@angular/http";
import { Injectable } from "@angular/core";

@Injectable()
export class DefaultRequestOptions extends BaseRequestOptions {
  headers = new Headers({
    'Accept': 'application/json',
    'Access-Control-Allow-Origin':'*',
    'Content-Type':'application/json',
  });
}