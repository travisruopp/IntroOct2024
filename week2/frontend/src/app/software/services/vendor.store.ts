import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { patchState, signalStore, withHooks, withMethods } from '@ngrx/signals';
import { setEntities, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

export const VendorStore = signalStore(
  withEntities<VendorItem>(),
  withDevtools('vendors'),
  withMethods((store) => {
    const http = inject(HttpClient);
    return {
      _load: rxMethod<void>(
        pipe(
          switchMap(() =>
            http
              .get<VendorItem[]>('http://localhost:1337/vendors')
              .pipe(tap((r) => patchState(store, setEntities(r))))
          )
        )
      ),
    };
  }),
  withHooks({
    onInit(store) {
      store._load();
    },
  })
);

export type VendorItem = {
  id: string;
  name: string;
};
