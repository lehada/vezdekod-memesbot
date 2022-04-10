const { Keyboard } = require("vk-io");

const main = () => {
  const keyboard = [
    [
      Keyboard.textButton({
        label: 'Смотреть мемы',
        color: Keyboard.POSITIVE_COLOR,
        payload: { command: 'checkMemes' }
      })
    ],
    [
      Keyboard.textButton({
        label: 'Статистика',
        color: Keyboard.PRIMARY_COLOR,
        payload: { command: 'stat' }
      })
    ]
  ];
  return Keyboard.keyboard(keyboard);
};

const likeAndDis = (memId) => {
  const keyboard = [
    [
      Keyboard.textButton({
        label: '👍',
        color: Keyboard.POSITIVE_COLOR,
        payload: { command: 'likeAndDis', action: 'like', memId: memId }
      }),
      Keyboard.textButton({
        label: '👎',
        color: Keyboard.NEGATIVE_COLOR,
        payload: { command: 'likeAndDis', action: 'dis', memId: memId }
      })
    ]
  ];
  return Keyboard.keyboard(keyboard).inline(true);
};

module.exports = {
  main,
  likeAndDis
};