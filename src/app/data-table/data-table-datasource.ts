import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable, merge, of as observableOf } from 'rxjs';

import { DataSource } from '@angular/cdk/collections';
import { map } from 'rxjs/operators';

// TODO: Replace this with your own data model type
export interface DataTableItem {
  name: string;
  isActive: boolean;
  id: number;
  type: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: DataTableItem[] = [
  { id: 1, name: 'Hydrogen', isActive: false, type: 'type1' },
  { id: 2, name: 'Helium', isActive: false, type: 'type1' },
  { id: 3, name: 'Lithium', isActive: true, type: 'type1' },
  { id: 4, name: 'Beryllium', isActive: true, type: 'type1' },
  { id: 5, name: 'Boron', isActive: true, type: 'type1' },
  { id: 6, name: 'Carbon', isActive: true, type: 'type1' },
  { id: 7, name: 'Nitrogen', isActive: true, type: 'type1' },
  { id: 8, name: 'Oxygen', isActive: true, type: 'type1' },
  { id: 9, name: 'Fluorine', isActive: true, type: 'type1' },
  { id: 10, name: 'Neon', isActive: true, type: 'type1' },
  { id: 11, name: 'Sodium', isActive: true, type: 'type1' },
  { id: 12, name: 'Magnesium', isActive: true, type: 'type1' },
  { id: 13, name: 'Aluminum', isActive: true, type: 'type1' },
  { id: 14, name: 'Silicon', isActive: true, type: 'type1' },
  { id: 15, name: 'Phosphorus', isActive: true, type: 'type1' },
  { id: 16, name: 'Sulfur', isActive: true, type: 'type1' },
  { id: 17, name: 'Chlorine', isActive: true, type: 'type1' },
  { id: 18, name: 'Argon', isActive: true, type: 'type1' },
  { id: 19, name: 'Potassium', isActive: true, type: 'type1' },
  { id: 20, name: 'Calcium', isActive: true, type: 'type1' }
];

/**
 * Data source for the DataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataTableDataSource extends DataSource<DataTableItem> {
  data: DataTableItem[] = EXAMPLE_DATA;

  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<DataTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginator's length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(
      map(() => {
        return this.getPagedData(this.getSortedData([...this.data]));
      })
    );
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: DataTableItem[]) {
    const startIndex = (this.paginator.pageIndex) * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: DataTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'id':
          return compare(+a.id, +b.id, isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
