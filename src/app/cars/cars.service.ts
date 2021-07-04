import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getCarList(model: string): Observable<any> {
    return this.httpClient.get("https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/" + model + "?format=json");
  }
}
