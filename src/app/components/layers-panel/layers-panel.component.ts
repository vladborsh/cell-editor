import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Layer } from 'src/app/interfaces/layer.interface';
import { AddLayer } from 'src/app/store/actions/add-layer.action';
import { DeleteLayer } from 'src/app/store/actions/delete-layer.action';
import { SaveHistory } from 'src/app/store/actions/save-history.action';
import { SetActiveLayer } from 'src/app/store/actions/set-layer.action';
import { UpdateLayer } from 'src/app/store/actions/update-layer.action';

import { StoreService } from '../../services/store/store.service';

@Component({
  selector: 'app-layers-panel',
  templateUrl: './layers-panel.component.html',
  styleUrls: ['./layers-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayersPanelComponent implements OnInit {
  public layers$: Observable<Layer[]>;
  public activeLayer$: Observable<number>;

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.layers$ = this.storeService.select('layers').pipe();
    this.activeLayer$ = this.storeService.select('activeLayer');
  }

  public addLayer(): void {
    this.storeService.dispatch(new AddLayer());
    this.storeService.dispatch(new SaveHistory());
  }

  public setActiveLayer(index: number): void {
    this.storeService.dispatch(new SetActiveLayer(index));
    this.storeService.dispatch(new SaveHistory());
  }

  public removeLayer(name: string): void {
    this.storeService.dispatch(new DeleteLayer(name));
    this.storeService.dispatch(new SaveHistory());
  }

  public onOpacityChange(name: string, event: string): void {
    this.storeService.dispatch(new UpdateLayer({ name, opacity: Number(event) }));
    this.storeService.dispatch(new SaveHistory());
  }

  public trackByName({ name }: Layer): string {
    return name;
  }
}
