import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appClickStopPropagation]',
})
export class ClickStopPropagationDirective {
  @HostListener('click', ['$event'])
  public onClick(event: MouseEvent): void {
    event.stopPropagation();
  }
}
