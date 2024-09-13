const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');

const start = document.querySelector('.start');
const gameOver = document.querySelector('.game-over');

const audioStart = new Audio('./src/audio/audio_theme.mp3');
const audioGameOver = new Audio('./src/audio/audio_gameover.mp3');

let gameLoop; // Variável para armazenar o loop

const startGame = () => {
  pipe.classList.add('pipe-animation');
  start.style.display = 'none';

  // Inicia o áudio de fundo
  audioStart.play();

  // Inicia o loop de verificação de colisão
  loop();
};

const restartGame = () => {
  gameOver.style.display = 'none';
  pipe.style.left = '';
  pipe.style.right = '0';
  pipe.classList.add('pipe-animation'); // Reinicia a animação do pipe
  mario.src = './src/img/mario.gif';
  mario.style.width = '150px';
  mario.style.bottom = '0';

  start.style.display = 'none';

  audioGameOver.pause();
  audioGameOver.currentTime = 0;

  audioStart.play();
  audioStart.currentTime = 0;

  // Reinicia o loop de verificação de colisão
  clearInterval(gameLoop); // Garante que qualquer loop antigo seja removido
  loop(); // Inicia o loop novamente
};

const jump = () => {
  mario.classList.add('jump');

  setTimeout(() => {
    mario.classList.remove('jump');
  }, 800);
};

const loop = () => {
  gameLoop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
      pipe.classList.remove('pipe-animation');
      pipe.style.left = `${pipePosition}px`;

      mario.classList.remove('jump');
      mario.style.bottom = `${marioPosition}px`;

      mario.src = './src/img/game-over.png';
      mario.style.width = '80px';
      mario.style.marginLeft = '50px';

      audioStart.pause();
      audioGameOver.play();

      setTimeout(() => {
        audioGameOver.pause();
      }, 7000);

      gameOver.style.display = 'flex';

      clearInterval(gameLoop); // Para o loop de verificação de colisão
    }
  }, 10);
};

document.addEventListener('keypress', e => {
  const tecla = e.key;
  if (tecla === ' ') {
    jump();
  }
});

document.addEventListener('touchstart', e => {
  if (e.touches.length) {
    jump();
  }
});

document.addEventListener('keypress', e => {
  const tecla = e.key;
  if (tecla === 'Enter') {
    startGame();
  }
});

document.addEventListener('keypress', e => {
  if (e.key === 'r') { // Pressione "r" para reiniciar
    restartGame();
  }
});