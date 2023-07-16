import { Level } from '../types/types';

const levelsData: Level[] = [
  {
    doThis: 'Select the plates',
    selector: 'plate',
    boardMarkup: '<plate></plate><plate></plate>',
  },
  {
    doThis: 'Select the bento boxes',
    selector: 'bento',
    boardMarkup: '<bento></bento><plate></plate><bento></bento>',
  },
  {
    doThis: 'Select the fancy plate',
    selector: '#fancy',
    boardMarkup: '<plate></plate><bento></bento><plate id="fancy"></plate>',
  },
  {
    doThis: 'Select the apple on the plate',
    selector: 'plate apple',
    boardMarkup: '<bento></bento></bento><apple></apple><plate><apple></apple></plate>',
  },
  {
    doThis: 'Select the pickle on the fancy plate',
    selector: '#fancy pickle',
    boardMarkup: '<bento><orange></orange></bento><plate id="fancy"><pickle/></plate><plate><pickle/></plate>',
  },

  {
    doThis: 'Select the small apples',
    selector: '.small',
    boardMarkup: '<apple></apple><apple class="small"></apple><plate><apple class="small"></apple></plate><plate></plate>',
  },
  {
    doThis: 'Select the small oranges in the bentos',
    selector: 'bento orange.small',
    boardMarkup: '<bento><orange></orange></bento><orange class="small"></orange><bento><orange class="small"></orange></bento><bento><apple class="small"></apple></bento><bento><orange class="small"></orenge></bento>',
  },
  {
    doThis: 'Select the 3rd plate',
    selector: ':nth-child(3)',
    boardMarkup: '<plate></plate><plate></plate><plate id="fancy"></plate>',
  },
  {
    doThis: 'Select all the things!',
    selector: '*',
    boardMarkup: '<apple></apple><plate><orange class="small"></orange></plate><bento></bento><bento><orange></orange></bento><plate id="fancy"></plate>',
  },
  {
    doThis: 'Select everything on a plate',
    selector: 'plate *',
    boardMarkup: '<plate id="fancy"><orange class="small"></orange></plate><plate><pickle></pickle></plate><apple class="small"></apple><plate><apple></apple></plate>',
  },
];
export default levelsData;
