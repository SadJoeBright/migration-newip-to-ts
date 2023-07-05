export default function createOpenTag(element: HTMLElement): string {
  let openTag = `<${element.tagName.toLowerCase()}`;
  if (element.className && element.className !== 'puls') {
    openTag += ` class=''${element.className.replace('puls', '')}''`;
  }
  if (element.id) {
    openTag += ` id=''${element.id}''`;
  }
  openTag += '>';
  return openTag;
}
