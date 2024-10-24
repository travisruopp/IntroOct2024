import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SoftwareItemCreateModel, SoftwareItemModel } from '../types';
import { Observable } from 'rxjs';

@Injectable()
export class SoftwareDataService {
  #apiUrl = 'http://localhost:1337/catalog';
  #client = inject(HttpClient);

  addItem(item: SoftwareItemCreateModel): Observable<SoftwareItemModel> {
    return this.#client.post<SoftwareItemModel>(this.#apiUrl, item);
  }
}
