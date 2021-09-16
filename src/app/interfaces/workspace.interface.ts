import { CanvasBoardState } from './global-state.interface';

export interface Workspace {
  id: string;
  name: string;
  state: CanvasBoardState;
  createdDate: number;
  createdByName: string;
  createdBy: string;
  lastModifiedDate: number;
  lastModifiedById: number;
  lastModifiedByName: string;
  views: number;
}
