import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CursorOverlayService } from 'src/app/services/cursor-overlay/cursor-overlay.service';

import { StoreService } from '../../services/store/store.service';
import { UpdateColor } from '../../store/actions/update-color.action';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent implements OnInit, AfterViewInit {
  @ViewChild('inputRef') inputRef: ElementRef<HTMLInputElement>;
  @Output() clickOutside = new EventEmitter<void>();

  public color = '#e66465';

  constructor(private store: StoreService, private cursorOverlayService: CursorOverlayService) {}

  ngOnInit(): void {
    const { color } = this.store.getSnapshot();
    this.color = `#${color}`;
  }

  ngAfterViewInit(): void {
    /* Without this shim inner shadow DOM of color picker won't be
      positioned in according to component overlay position */
    setTimeout(() => {
      this.inputRef.nativeElement.focus();
      this.inputRef.nativeElement.click();
    });
  }

  public onChange(event: string): void {
    this.store.dispatch(new UpdateColor(event.replace('#', '')));
  }

  public onClickOutside(): void {
    this.clickOutside.emit();
    this.cursorOverlayService.clickOutside();
  }
}
