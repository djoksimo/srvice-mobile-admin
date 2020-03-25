import {AgendaItemData} from './AgendaItemData';
export type AgendaItem = {
  title: string | Date;
  data: Array<AgendaItemData>;
};
