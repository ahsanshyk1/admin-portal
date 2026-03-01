import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { BarChartOutline, DashboardOutline, DatabaseOutline, HomeOutline, SettingOutline, ShoppingOutline, TeamOutline, ToolOutline, UserOutline } from '@ant-design/icons-angular/icons';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { EnvService } from './services/env.service';

const antDesignIcons = Object.keys(AllIcons).map(
  key => (AllIcons as any)[key]
);
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideNzIcons(antDesignIcons),  // ⭐ REQUIRED FIX
    provideNoopAnimations(),
    provideNzI18n(en_US),
    EnvService



  ]
};
