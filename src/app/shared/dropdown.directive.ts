import { Directive, ElementRef, OnInit, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {
  // This class wasn't needed after all because I added
  // bootstrap, popper and jquery js scripts
  @HostBinding('class.open') isOpen = false;

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }
  ngOnInit() {
  }
}
