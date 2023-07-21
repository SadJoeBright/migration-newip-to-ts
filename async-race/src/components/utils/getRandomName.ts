import { CarNames } from '../../types/types';

function getRandomName(carNames: CarNames): string {
  const brandIndex = Math.floor(Math.random() * carNames.brand.length);
  const modelIndex = Math.floor(Math.random() * carNames.model.length);
  return `${carNames.brand[brandIndex]} ${carNames.model[modelIndex]}`;
}
export default getRandomName;
