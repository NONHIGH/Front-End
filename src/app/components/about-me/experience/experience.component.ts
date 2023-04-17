import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExperienceComponent {
  public helpAlbanil: string= "Refrigeracion de materiales h2o, trasladacamiento de materiales aumentando la produccion en un 15% ";
}
