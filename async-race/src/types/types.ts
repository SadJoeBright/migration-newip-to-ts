export interface ElementOptions {
  tagName: string;
  classNames: string[];
  textContent?: string;
  parentNode?: HTMLElement;
  eventHandler?: (event?: Event | MouseEvent | KeyboardEvent) => void;
  eventType?: string;
}
