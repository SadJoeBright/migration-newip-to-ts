import './win-massage.css';

export default function showWinMassage() {
  const winWrapper = document.createElement('div');
  winWrapper.classList.add('modal__wrapper');
  const winMassage = document.createElement('div');
  winMassage.classList.add('modal');
  const winText = document.createElement('p');
  winText.textContent = 'Hooray! All levels completed!';
  winText.classList.add('modal-text');
  const winBtn = document.createElement('div');
  winBtn.classList.add('modal__btn');
  winBtn.textContent = 'OK';
  winMassage.append(winText, winBtn);
  winWrapper.append(winMassage);
  document.body.append(winWrapper);
  winBtn.addEventListener('click', () => {
    winWrapper.remove();
  });
}
