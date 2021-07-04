import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CarsService } from './cars.service';

export interface Car {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
}

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'make', 'model_id', 'model'];
  dataSource: MatTableDataSource<Car>;
  search: string;
  dataloaded: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private carsService: CarsService,
  ) { }

  ngAfterViewInit(): void {
    
  }

  getCars() {
    this.dataloaded = false;
    this.carsService.getCarList(this.search)
    .subscribe(
      data=>
      {
        this.dataSource = new MatTableDataSource(data.Results);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
    this.dataloaded = true;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
