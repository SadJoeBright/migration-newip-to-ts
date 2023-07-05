/* eslint-disable class-methods-use-this */
import '../../global.css';
import createElement from '../utils/create-element';
import levelSideBar from '../levelViewer/level-viewer';
import { editor } from '../editor/editor';
import Controller from '../controller/controller';
import Table from '../table/table';

class App {
  controller: Controller;

  table: Table;

  constructor() {
    this.createView();
    this.controller = new Controller();
  }

  public createView(): void {
    const mainContainer = createElement({
      tagName: 'div',
      classNames: ['main-container'],
      parentNode: document.body,
    });

    this.table = new Table();
    const levelView = levelSideBar;
    const editorView = editor;
    mainContainer.append(this.table.table, editorView);
    document.body.append(levelView);
  }
}

export default App;
