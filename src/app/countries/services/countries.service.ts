import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';
  constructor(private http: HttpClient) {}

  searchByCapital(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${term}`;

    return this.http.get<Country[]>(url).pipe(
      catchError((error) =>
        // retorna un nuevo observable
        of([])
      )
    );
  }
  searchCountry(term: string): Observable<Country[]> {
    const url: string = `${this.apiUrl}/name/${term}`;
    return this.http.get<Country[]>(url).pipe(catchError((err) => of([])));
  }

  searchRegion(region: string): Observable<Country[]> {
    const url: string = `${this.apiUrl}/region/${region}`;

    return this.http.get<Country[]>(url).pipe(catchError((err) => of()));
  }

  searchCountryByAlphaCode(code: string): Observable<Country | null> {
    const url: string = `${this.apiUrl}/alpha/${code}`;

    return this.http.get<Country[]>(url).pipe(
      map((countries) => (countries.length > 0 ? countries[0] : null)),
      catchError((err) => of(null))
    );
  }
}
