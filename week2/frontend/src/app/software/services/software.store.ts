import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { addEntity, setEntities, withEntities } from '@ngrx/signals/entities';
import { SoftwareItemCreateModel, SoftwareItemModel } from '../types';
import { computed, inject } from '@angular/core';
import { SoftwareDataService } from './software-data.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { mergeMap, pipe, switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { VendorStore } from './vendor.store';

export const SoftwareStore = signalStore(
  withState({}),
  withDevtools('software-center'),
  withEntities<SoftwareItemModel>(),
  withComputed((store) => {
    const vendorStore = inject(VendorStore);
    return {
      vendors: computed(() => vendorStore.entities()),
    };
  }),
  withMethods((store) => {
    const service = inject(SoftwareDataService);
    return {
      _load: rxMethod<void>(
        pipe(
          switchMap(() =>
            service.getCatalog().pipe(
              tapResponse({
                next: (r) => patchState(store, setEntities(r)),
                error: (e) => console.log(e),
              })
            )
          )
        )
      ),
      addItem: rxMethod<SoftwareItemCreateModel>(
        pipe(
          mergeMap((item) =>
            service.addItem(item).pipe(
              tapResponse({
                next: (i) => patchState(store, addEntity(i)),
                error: (e) => console.log(e),
              })
            )
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
