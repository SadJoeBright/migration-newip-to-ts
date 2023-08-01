import './sources.css';
import { ApiSource } from '../../../types';

class Sources {
    public draw(data: ApiSource[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');
        if (sourceItemTemp) {
            data.forEach((item: ApiSource): void => {
                const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment | null;

                if (sourceClone) {
                    const itemNameElement: Element | null = sourceClone.querySelector('.source__item-name');
                    if (itemNameElement) {
                        itemNameElement.textContent = item.name;
                    }

                    const sourceItemElement: Element | null = sourceClone.querySelector('.source__item');
                    if (sourceItemElement) {
                        sourceItemElement.setAttribute('data-source-id', item.id);
                    }

                    fragment.append(sourceClone);
                }
            });
        }

        const sourcesContainer: Element | null = document.querySelector('.sources');
        if (sourcesContainer) {
            sourcesContainer.append(fragment);
        }
    }
}

export default Sources;
