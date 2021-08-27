import { InjectionToken } from '@angular/core';

import { PluginInterface } from '../store/plugins/pluggin.interface';

export const STORE_PLUGINS = new InjectionToken<PluginInterface[]>('STORE_PLUGINS');
