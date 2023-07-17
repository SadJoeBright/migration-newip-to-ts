import Controller from '../controller/controller';
import AppView from '../view/appView';

export default class App {
  private controller: Controller;

  private view: AppView;

  constructor() {
    this.controller = new Controller();
    this.view = new AppView(
      this.controller.TABLE.table,
      this.controller.CSS_EDITOR.editor,
      this.controller.MARKUP.markupContainer,
      this.controller.SIDEBAR.sidebar,
    );
  }

  public start(): void {
    this.view.create();
  }
}
