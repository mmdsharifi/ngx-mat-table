import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDataSource, DataTableItem } from './data-table-datasource';
import { MatPaginator, MatSort } from '@angular/material';

import { Column } from './models/column';
import { Filter } from './models/paged-query-model';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  dataSource: DataTableDataSource;
  selection = new SelectionModel<DataTableItem>(true, []);
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['select', 'id', 'name', 'isActive'];

  enums: ['type1', 'typ2'];
  endpoint: string;
  columns: Column[] = [
    {
      title: 'شناسه',
      field: 'id',
      type: 'number',
      sortable: true,
      filterable: true,
      width: 10
    },
    {
      title: 'نام',
      field: 'name',
      type: 'string',
      sortable: true,
      filterable: true,
      width: 300
    },
    {
      title: 'فعال می باشد',
      field: 'isActive',
      type: 'boolean',
      sortable: true,
      filterable: true,
      width: 100
    }
  ];
  filters: Filter[] = [];
  selectedItems: any[];

  ngOnInit() {
    this.dataSource = new DataTableDataSource(this.paginator, this.sort);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  applyFilter(filterValue: string) {
    const filter = <Filter>{
      logic: 'or',
      filters: this.columns.filter(column => column.type === 'string').map(
        column =>
          <Filter>{
            field: column.field,
            operator: 'contains',
            value: filterValue
          })
    };

    console.log(filter);
  }
}
