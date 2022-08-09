import {IRequest} from '@react-team/stage-model';

export enum SubModule {
  'my' = 'my',
}

export interface Notices {
  num: number;
}

export type IGetNotices = IRequest<{}, Notices>;
