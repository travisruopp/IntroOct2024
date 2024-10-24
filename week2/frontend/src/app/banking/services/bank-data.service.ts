import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { TransactionRecord, TransactionType } from '../types';
import { z } from 'zod';

export const BankResponseSchema = z.object({
  accountNumber: z.string(),
  statementDate: z.string(),
  openingBalance: z.number(),
  transactions: z.array(
    z.object({
      ibnTxLsn: z.string(),
      amount: z.number(),
      type: z.string(),
      postedOn: z.string(),
    })
  ),
});

type TransactionApiItem = {
  ibnTxLsn: string;
  amount: number;
  type: TransactionType;
  postedOn: string;
};
type BankStatementResponse = {
  accountNumber: string;
  statementDate: string;
  openingBalance: number;
  transactions: TransactionApiItem[];
};
@Injectable({ providedIn: 'root' })
export class BankDataService {
  #client = inject(HttpClient);

  constructor() {
    console.log('Created an instance of the BankDataService');
  }

  addDeposit(
    amount: number,
    temporaryId: string
  ): Observable<{ result: Partial<TransactionRecord>; temporaryId: string }> {
    return this.#client
      .post<TransactionApiItem>(
        `http://fake-api.bankohypertheory.com/user/deposits`,
        { amount }
      )
      .pipe(
        map(
          (r) =>
            ({
              id: r.ibnTxLsn,
              amount,
              created: isoToTimeStamp(r.postedOn),

              type: r.type,
            } as TransactionRecord)
        ),

        map((result) => ({ result, temporaryId }))
      );
  }

  getCurrentBankStatement(): Observable<TransactionRecord[]> {
    const now = new Date();
    return this.#client
      .get<BankStatementResponse>(
        `http://fake-api.bankohypertheory.com/user/statements/${now.getFullYear()}/${
          now.getMonth() + 1
        }`
      )
      .pipe(
        tap((r) => {
          const results = BankResponseSchema.safeParse(r);
          if (results.error) {
            console.log('There was an error', results.error);
            throw new Error('Bad Response from API');
          }
        }),
        map((r) => {
          let previousBalance = r.openingBalance;
          return r.transactions
            .sort(
              (a, b) => isoToTimeStamp(b.postedOn) - isoToTimeStamp(a.postedOn)
            )
            .map((t) => {
              let newBalance =
                t.type === 'deposit'
                  ? previousBalance + t.amount
                  : previousBalance - t.amount;
              const response: TransactionRecord = {
                id: t.ibnTxLsn,
                created: isoToTimeStamp(t.postedOn),
                amount: t.amount,
                newBalance,
                startingBalance: previousBalance,
                type: t.type,
              };
              previousBalance = newBalance;
              return response;
            });
        })
      );
  }
}

function isoToTimeStamp(iso: string) {
  return new Date(iso).getTime();
}
