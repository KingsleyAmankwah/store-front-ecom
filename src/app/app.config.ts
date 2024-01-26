import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ShopComponent } from './pages/shop/shop.component';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), ShopComponent],
};
