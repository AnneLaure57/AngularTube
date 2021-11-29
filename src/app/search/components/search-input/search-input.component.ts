import { Component, AfterViewInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { debounceTime, pluck, filter, map, distinctUntilChanged } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements AfterViewInit {

  constructor() { }

  @ViewChild('searchText') inputElement!: ElementRef;
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  ngAfterViewInit() {
    fromEvent(this.inputElement.nativeElement, 'keyup')
      .pipe(
        debounceTime(500),
        pluck('target', 'value'),
        // TS 2345 : attend two parameter
        distinctUntilChanged((pre: any, curr: any) => JSON.stringify(pre) === JSON.stringify(curr)), //ignore if next search term is same as previous
        filter((value: string) => value.length > 3),
        map((value) => value),
      )
      .subscribe(value => {
        this.search.emit(value);
      });
  }

}
