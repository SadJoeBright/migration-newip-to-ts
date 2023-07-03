/* eslint-disable class-methods-use-this */
import '../../global.css';
import table from '../table/table';
import levelSideBar from '../levelViewer/level-viewer';
import createElement from '../utils/create-element';

class App {
  constructor() {
    this.createView();
  }

  public createView(): void {
    const mainContainer = createElement({
      tagName: 'div',
      classNames: ['main-container'],
      parentNode: document.body,
    });
    const tableView = table;
    const levelView = levelSideBar;
    mainContainer.append(tableView);
    document.body.append(levelView);
  }
}

export default App;
