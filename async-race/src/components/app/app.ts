import AppView from '../view/appView';

export default class App {
  appView: AppView;

  constructor() {
    this.appView = new AppView();
  }

  public start(): void {
    this.appView.create();
  }
}
