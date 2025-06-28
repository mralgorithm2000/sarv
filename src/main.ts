import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { addIcons } from 'ionicons';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { home, 
  search, 
  person, 
  helpCircle, 
  camera, 
  ellipsisVerticalOutline, 
  heartOutline, 
  shareSocialOutline, 
  heart,
  close,
  alertCircleOutline,
  closeOutline } from 'ionicons/icons';

addIcons({
  'home': home,
  'search': search,
  'person': person,
  'help-circle': helpCircle,
  'camera': camera,
  'ellipsis-vertical-outline': ellipsisVerticalOutline,
  'heart-outline': heartOutline,
  'share-social-outline': shareSocialOutline,
  'heart': heart,
  'close': close,
  'alert-circle-outline': alertCircleOutline,
  'close-outline': closeOutline
});
bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    importProvidersFrom(HttpClientModule),
  ],
});
