const levels = [
  {
    doThis: 'Select the plates',
    selector: 'plate',
    boardMarkup: '\n    <plate/>\n    <plate/>\n    ',
  },
  {
    doThis: 'Select the bento boxes',
    selector: 'bento',
    boardMarkup: '\n    <bento/>\n    <plate/>\n    <bento/>\n    ',
  },
  {
    doThis: 'Select the fancy plate',
    selector: '#fancy',
    boardMarkup: '<bento class="some-class"></bento>\n<plate>\n  <apple class="casual"></apple>\n</plate>\n<apple></apple>',
  },
  {
    doThis: 'Select the apple on the plate',
    selector: 'plate apple',
    boardMarkup: '\n    <bento/>\n    <plate>\n      <apple/>\n    </plate>\n    <apple/>\n    ',
  },
  {
    doThis: 'Select the pickle on the fancy plate',
    selector: '#fancy pickle',
    boardMarkup: '\n'
      + '    <bento>\n'
      + '    <orange/>\n'
      + '    </bento>\n'
      + '    <plate id="fancy">\n'
      + '      <pickle/>\n'
      + '    </plate>\n'
      + '    <plate>\n'
      + '      <pickle/>\n'
      + '    </plate>\n'
      + '    ',
  },
  {
    doThis: 'Select the small apples',
    selector: '.small',
    boardMarkup: '\n'
      + '    <apple/>\n'
      + '    <apple class="small"/>\n'
      + '    <plate>\n'
      + '      <apple class="small"/>\n'
      + '    </plate>\n'
      + '    <plate/>\n'
      + '    ',
  },
  {
    doThis: 'Select the small oranges',
    selector: 'orange.small',
    boardMarkup: '\n'
      + '    <apple/>\n'
      + '    <apple class="small"/>\n'
      + '    <bento>\n'
      + '      <orange class="small"/>\n'
      + '    </bento>\n'
      + '    <plate>\n'
      + '      <orange/>\n'
      + '    </plate>\n'
      + '    <plate>\n'
      + '      <orange class="small"/>\n'
      + '    </plate>',
  },
  {
    doThis: 'Select the small oranges in the bentos',
    selector: 'bento orange.small',
    boardMarkup: '\n'
      + '    <bento>\n'
      + '      <orange/>\n'
      + '    </bento>\n'
      + '    <orange class="small"/>\n'
      + '    <bento>\n'
      + '      <orange class="small"/>\n'
      + '    </bento>\n'
      + '    <bento>\n'
      + '      <apple class="small"/>\n'
      + '    </bento>\n'
      + '    <bento>\n'
      + '      <orange class="small"/>\n'
      + '    </bento>\n'
      + '    ',
  },
  {
    doThis: 'Select all the plates and bentos',
    selector: 'plate,bento',
    boardMarkup: '\n'
      + '    <pickle class="small"/>\n'
      + '    <pickle/>\n'
      + '    <plate>\n'
      + '      <pickle/>\n'
      + '    </plate>\n'
      + '    <bento>\n'
      + '      <pickle/>\n'
      + '    </bento>\n'
      + '    <plate>\n'
      + '      <pickle/>\n'
      + '    </plate>\n'
      + '    <pickle/>\n'
      + '    <pickle class="small"/>\n'
      + '    ',
  },
  {
    doThis: 'Select all the things!',
    selector: '*',
    boardMarkup: '\n'
      + '    <apple/>\n'
      + '    <plate>\n'
      + '      <orange class="small" />\n'
      + '    </plate>\n'
      + '    <bento/>\n'
      + '    <bento>\n'
      + '      <orange/>\n'
      + '    </bento>\n'
      + '    <plate id="fancy"/>\n'
      + '    ',
  },
  {
    doThis: 'Select everything on a plate',
    selector: 'plate *',
    boardMarkup: '\n'
      + '    <plate id="fancy">\n'
      + '      <orange class="small"/>\n'
      + '    </plate>\n'
      + '    <plate>\n'
      + '      <pickle/>\n'
      + '    </plate>\n'
      + '    <apple class="small"/>\n'
      + '    <plate>\n'
      + '      <apple/>\n'
      + '    </plate>',
  },
  {
    doThis: "Select every apple that's next to a plate",
    selector: 'plate + apple',
    boardMarkup: '\n'
      + '    <bento>\n'
      + '      <apple class="small"/>\n'
      + '    </bento>\n'
      + '    <plate />\n'
      + '    <apple class="small"/>\n'
      + '    <plate />\n'
      + '    <apple/>\n'
      + '    <apple class="small"/>\n'
      + '    <apple class="small"/>\n'
      + '    ',
  },
  {
    doThis: 'Select the pickles beside the bento',
    selector: 'bento ~ pickle',
    boardMarkup: '\n'
      + '    <pickle/>\n'
      + '    <bento>\n'
      + '      <orange class="small"/>\n'
      + '    </bento>\n'
      + '    <pickle class="small"/>\n'
      + '    <pickle/>\n'
      + '    <plate>\n'
      + '      <pickle/>\n'
      + '    </plate>\n'
      + '    <plate>\n'
      + '      <pickle class="small"/>\n'
      + '    </plate>\n'
      + '    ',
  },
  {
    doThis: 'Select the apple directly on a plate',
    selector: 'plate > apple',
    boardMarkup: '\n'
      + '    <plate>\n'
      + '      <bento>\n'
      + '        <apple/>\n'
      + '      </bento>\n'
      + '    </plate>\n'
      + '    <plate>\n'
      + '      <apple/>\n'
      + '    </plate>\n'
      + '    <plate/>\n'
      + '    <apple/>\n'
      + '    <apple class="small"/>\n'
      + '    ',
  },
  {
    doThis: 'Select the top orange',
    selector: 'plate :first-child',
    boardMarkup: '\n'
      + '    <bento/>\n'
      + '    <plate />\n'
      + '    <plate>\n'
      + '      <orange />\n'
      + '      <orange />\n'
      + '      <orange />\n'
      + '    </plate>\n'
      + '    <pickle class="small" />\n'
      + '    ',
  },
  {
    doThis: 'Select the apple and the pickle on the plates',
    selector: 'plate :only-child',
    boardMarkup: '\n'
      + '    <plate>\n'
      + '      <apple/>\n'
      + '    </plate>\n'
      + '    <plate>\n'
      + '      <pickle />\n'
      + '    </plate>\n'
      + '    <bento>\n'
      + '      <pickle />\n'
      + '    </bento>\n'
      + '    <plate>\n'
      + '      <orange class="small"/>\n'
      + '      <orange/>\n'
      + '    </plate>\n'
      + '    <pickle class="small"/>\n'
      + '    ',
  },
  {
    doThis: 'Select the small apple and the pickle',
    selector: '.small:last-child',
    boardMarkup: '\n'
      + '    <plate id="fancy">\n'
      + '      <apple class="small"/>\n'
      + '    </plate>\n'
      + '    <plate/>\n'
      + '    <plate>\n'
      + '      <orange class="small"/>\n'
      + '      <orange>\n'
      + '    </plate>\n'
      + '    <pickle class="small"/>',
  },
  {
    doThis: 'Select the 3rd plate',
    selector: ':nth-child(3)',
    boardMarkup: '\n    <plate/>\n    <plate/>\n    <plate/>\n    <plate id="fancy"/>\n    ',
  },
  {
    doThis: 'Select the 1st bento',
    selector: 'bento:nth-last-child(3)',
    boardMarkup: '\n'
      + '    <plate/>\n'
      + '    <bento/>\n'
      + '    <plate>\n'
      + '      <orange/>\n'
      + '      <orange/>\n'
      + '      <orange/>\n'
      + '    </plate>\n'
      + '    <bento/>\n'
      + '    ',
  },
  {
    doThis: 'Select first apple',
    selector: 'apple:first-of-type',
    boardMarkup: '\n'
      + '    <orange class="small"/>\n'
      + '    <apple/>\n'
      + '    <apple class="small"/>\n'
      + '    <apple/>\n'
      + '    <apple class="small"/>\n'
      + '    <plate>\n'
      + '      <orange class="small"/>\n'
      + '      <orange/>\n'
      + '    </plate>\n'
      + '    ',
  },
  {
    doThis: 'Select all even plates',
    selector: 'plate:nth-of-type(even)',
    boardMarkup: '\n'
      + '    <plate/>\n'
      + '    <plate/>\n'
      + '    <plate/>\n'
      + '    <plate/>\n'
      + '    <plate id="fancy"/>\n'
      + '    <plate/>\n'
      + '    ',
  },
  {
    doThis: 'Select every 2nd plate, starting from the 3rd',
    selector: 'plate:nth-of-type(2n+3)',
    boardMarkup: '\n'
      + '    <plate/>\n'
      + '    <plate>\n'
      + '      <pickle class="small" />\n'
      + '    </plate>\n'
      + '    <plate>\n'
      + '      <apple class="small" />\n'
      + '    </plate>\n'
      + '    <plate/>\n'
      + '    <plate>\n'
      + '      <apple />\n'
      + '    </plate>\n'
      + '    <plate/>\n'
      + '    ',
  },
  {
    selector: 'apple:only-of-type',
    doThis: 'Select the apple on the middle plate',
    boardMarkup: '\n'
      + '    <plate id="fancy">\n'
      + '      <apple class="small" />\n'
      + '      <apple />\n'
      + '    </plate>\n'
      + '    <plate>\n'
      + '      <apple class="small" />\n'
      + '    </plate>\n'
      + '    <plate>\n'
      + '      <pickle />\n'
      + '    </plate>\n'
      + '    ',
  },
  {
    doThis: 'Select the last apple and orange',
    selector: '.small:last-of-type',
    boardMarkup: '\n'
      + '    <orange class="small"/>\n'
      + '    <orange class="small" />\n'
      + '    <pickle />\n'
      + '    <pickle />\n'
      + '    <apple class="small" />\n'
      + '    <apple class="small" />\n'
      + '    ',
  },
  {
    doThis: 'Select the empty bentos',
    selector: 'bento:empty',
    boardMarkup: '\n'
      + '    <bento/>\n'
      + '    <bento>\n'
      + '      <pickle class="small"/>\n'
      + '    </bento>\n'
      + '    <plate/>\n'
      + '    <bento/>',
  },
  {
    doThis: 'Select the big apples',
    selector: 'apple:not(.small)',
    boardMarkup: '\n'
      + '    <plate id="fancy">\n'
      + '      <apple class="small" />\n'
      + '    </plate>\n'
      + '    <plate>\n'
      + '      <apple />\n'
      + '    </plate>\n'
      + '    <apple />\n'
      + '    <plate>\n'
      + '      <orange class="small" />\n'
      + '    </plate>\n'
      + '    <pickle class="small" />\n'
      + '    ',
  },
  {
    doThis: 'Select the items for someone',
    selector: '[for]',
    boardMarkup: '\n'
      + '    <bento><apple class="small"/></bento>\n'
      + '    <apple for="Ethan"/>\n'
      + '    <plate for="Alice"><pickle/></plate>\n'
      + '    <bento for="Clara"><orange/></bento>\n'
      + '    <pickle/>',
  },
  {
    doThis: 'Select the plates for someone',
    selector: 'plate[for]',
    boardMarkup: '\n'
      + '    <plate for="Sarah"><pickle/></plate>\n'
      + '    <plate for="Luke"><apple/></plate>\n'
      + '    <plate/>\n'
      + '    <bento for="Steve"><orange/></bento>\n'
      + '    ',
  },
  {
    doThis: "Select Vitaly's meal",
    selector: '[for=Vitaly]',
    boardMarkup: '\n'
      + '    <apple for="Alexei" />\n'
      + '    <bento for="Albina"><apple /></bento>\n'
      + '    <bento for="Vitaly"><orange/></bento>\n'
      + '    <pickle/>\n'
      + '    ',
  },
  {
    doThis: "Select the items for names that start with 'Sa'",
    selector: '[for^="Sa"]',
    boardMarkup: '\n'
      + '    <plate for="Sam"><pickle/></plate>\n'
      + '    <bento for="Sarah"><apple class="small"/></bento>\n'
      + '    <bento for="Mary"><orange/></bento>\n'
      + '    ',
  },
  {
    doThis: "Select the items for names that end with 'ato'",
    selector: '[for$="ato"]',
    boardMarkup: '\n'
      + '    <apple class="small"/>\n'
      + '    <bento for="Hayato"><pickle/></bento>\n'
      + '    <apple for="Ryota"></apple>\n'
      + '    <plate for="Minato"><orange/></plate>\n'
      + '    <pickle class="small"/>\n'
      + '    ',
  },
  {
    doThis: "Select the meals for names that contain 'obb'",
    selector: '[for*="obb"]',
    boardMarkup: '\n'
      + '    <bento for="Robbie"><apple /></bento>\n'
      + '    <bento for="Timmy"><pickle /></bento>\n'
      + '    <bento for="Bobby"><orange /></bento>\n'
      + '    ',
  },
];

export default levels;
