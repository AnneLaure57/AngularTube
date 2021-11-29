import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  // the service is provided in the root component of the Angular app
  providedIn: 'root'
})
export class SearchService {

  // ENV VAR
  private API_URL = 'https://www.googleapis.com/youtube/v3/search';
  private API_TOKEN = '';

  constructor(private http: HttpClient) { }

  // get Videos
  getVideos(query: string): Observable <any> {
    // url to return when search
    const url = `${this.API_URL}?q=${query}&key=${this.API_TOKEN}&part=snippet&type=video&maxResults=10`;
    return this.http.get(url)
        .pipe(
          // used to modify the response received from the API call
          map((response: any) => response.items)
    );
  }
}
