import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SoftwareItemCreateModel, SoftwareItemModel } from '../types';
import { map, Observable } from 'rxjs';

@Injectable()
export class SoftwareDataService {
  #apiUrl = 'http://localhost:1337/';
  #client = inject(HttpClient);

  addItem(item: SoftwareItemCreateModel): Observable<SoftwareItemModel> {
    const vendor = item.vendor;
    const entityToPost = {
      title: item.title,
      isOpenSource: item.isOpenSource,
    };
    return this.#client
      .post<AddVendorResponseModel>(
        this.#apiUrl + `vendors/${vendor}/catalog`,
        entityToPost
      )
      .pipe(
        map((r) => {
          const response: SoftwareItemModel = {
            id: r.id,
            isOpenSource: r.isOpenSource,
            title: r.title,
            vendor: r.embeddedVendor.name,
          };
          return response;
        })
      );
  }

  getCatalog(): Observable<SoftwareItemModel[]> {
    return this.#client.get<SoftwareItemModel[]>(this.#apiUrl + 'catalog');
  }
}

export type AddVendorResponseModel = {
  id: string;
  title: string;
  vendorId: string;
  isOpenSource: boolean;
  embeddedVendor: {
    id: string;
    name: string;
  };
};
