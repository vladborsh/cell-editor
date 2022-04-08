import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { CursorOverlayService } from 'src/app/services/cursor-overlay/cursor-overlay.service';

import { StoreService } from '../../services/store/store.service';
import { UpdateColor } from '../../store/actions/update-color.action';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorPickerComponent {
  @ViewChild('inputRef') inputRef: ElementRef<HTMLInputElement>;

  public color$ = this.storeService.select('color');

  constructor(
    private storeService: StoreService,
    private cursorOverlayService: CursorOverlayService,
  ) {}

  public onPickerClick(): void {
    this.inputRef.nativeElement.focus();
    this.inputRef.nativeElement.click();
  }

  public onChange(event: string): void {
    const color = event.replace('#', '');
    this.storeService.dispatch(new UpdateColor(color));
  }

  public onClickOutside(): void {
    this.cursorOverlayService.clickOutside();
  }
}
