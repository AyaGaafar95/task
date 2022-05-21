import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/* use those apis to get user geolocations and nationality all apis accept get request
https://backofficeapi.online-tkt.com/api/GetAllCountriesByLangName?LangCode=en
returns all countries with country codes
*********
https://api.ipify.org/?format=json
returns users ip adress
*********
use ip adress to get user geo location and country
https://ipapi.co/${ip-adress}/json/
*/

@Injectable({
  providedIn: 'root',
})
export class MyApisService {
  userdata = {};
  constructor(private client: HttpClient) {}
  getCityInformation(): Observable<any> {
    return this.client.get(
      `https://backofficeapi.online-tkt.com/api/GetAllCountriesByLangName?LangCode=en`
    );
  }
  getApi(): Observable<any> {
    return this.client.get(`https://api.ipify.org/?format=json`);
  }
  getCountry(ipAddress: string): Observable<any> {
    return this.client.get(`https://ipapi.co/${ipAddress}/json/`);
  }
}
