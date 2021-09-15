import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { PERSISTENCE } from '@angular/fire/auth';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CanvasModule } from './components/canvas/canvas.module';
import { ColorPickerModule } from './components/color-picker/color-picker.module';
import { HeaderToolbarModule } from './components/header-toolbar/header-toolbar.module';
import { HomeModule } from './components/home/home.module';
import { ResizeBrushModule } from './components/resize-brush/resize-brush.module';
import { ResizeGridModule } from './components/resize-grid/resize-grid.module';
import { SaveFileDialogModule } from './components/save-file-dialog/save-file-dialog.module';
import { LoggerPlugin } from './store/plugins/logger.plugin';
import { StoragePlugin } from './store/plugins/storage.plugin';
import { reducers } from './store/reducers';
import { REDUCERS } from './tokens/reducers.token';
import { STORE_PLUGINS } from './tokens/store-plugins.token';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    OverlayModule,
    CanvasModule,
    SaveFileDialogModule,
    ResizeBrushModule,
    ResizeGridModule,
    ColorPickerModule,
    HomeModule,
    HeaderToolbarModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [
    {
      provide: STORE_PLUGINS,
      useClass: StoragePlugin,
      multi: true,
    },
    {
      provide: STORE_PLUGINS,
      useClass: LoggerPlugin,
      multi: true,
    },
    {
      provide: REDUCERS,
      useValue: reducers,
    },
    { provide: PERSISTENCE, useValue: 'local' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
