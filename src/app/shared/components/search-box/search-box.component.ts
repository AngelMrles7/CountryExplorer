import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``,
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSubcription?: Subscription;

  @Input()
  public placeholder: string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncerSubcription = this.debouncer
      .pipe(debounceTime(300))
      .subscribe((value) => {
        console.log('debaouncer value', value);
        this.onDebounce.emit(value);
      });
  }

  ngOnDestroy(): void {
    console.log('destroy');
    this.debouncerSubcription?.unsubscribe();
  }

  emitValue(value: string) {
    this.onValue.emit(value);
  }

  onKeyPress(searchTerm: string) {
    this.debouncer.next(searchTerm);
  }
}
