export interface ElementOptions {
  tagName: string;
  classNames: [string];
  textContent?: string;
  parentNode?: HTMLElement;
  eventHandler?: () => void;
  eventType?: string;
}
