import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-priority-output',
  templateUrl: 'priority-output.component.html'
})
export class PriorityOutputComponent {
  @Input() value: number = 0;

  ngOnInit() {}
}
