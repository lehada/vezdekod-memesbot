// Импорт данных из конфига
const { vkBotToken, vkBotId } = require('./config');

// Импорт клавиатур
const { main, likeAndDis } = require('./addons/keyboards');

// Пользователи
const users = require('./database/users.json');

// Библиотеки
const { VK } = require('vk-io');
const fs = require('fs');

// Конструируем класс VK
const vk = new VK({
  token: vkBotToken,
  pollingGroupId: vkBotId
});

// Мемы 
const memes = [
  'photo-197700721_457240713',
  'photo-197700721_457240712',
  'photo-197700721_457240709',
  'photo-197700721_457240708',
  'photo-197700721_457240707',
  'photo-197700721_457240706',
  'photo-197700721_457240705',
  'photo-197700721_457240703',
  'photo-197700721_457240702',
  'photo-197700721_457240701',
  'photo-197700721_457240700',
  'photo-197700721_457240698',
  'photo-197700721_457240697',
  'photo-197700721_457240696',
  'photo-197700721_457240695',
  'photo-197700721_457240693',
  'photo-197700721_457240692',
  'photo-197700721_457240691',
  'photo-197700721_457240690',
  'photo-197700721_457240688',
  'photo-197700721_457240687',
  'photo-197700721_457240686',
  'photo-197700721_457240685',
  'photo-197700721_457240684',
  'photo-197700721_457240683',
  'photo-197700721_457240682',
  'photo-197700721_457240681',
  'photo-197700721_457240680',
  'photo-197700721_457240679',
  'photo-197700721_457240678',
  'photo-197700721_457240677',
  'photo-197700721_457240676',
  'photo-197700721_457240675',
  'photo-197700721_457240674',
  'photo-197700721_457240673',
  'photo-197700721_457240672',
  'photo-197700721_457240671',
  'photo-197700721_457240669',
  'photo-197700721_457240667',
  'photo-197700721_457240665',
  'photo-197700721_457240664',
  'photo-197700721_457240660',
  'photo-197700721_457240659',
  'photo-197700721_457240653',
  'photo-197700721_457240652',
  'photo-197700721_457240650',
  'photo-197700721_457240649',
  'photo-197700721_457240648',
  'photo-197700721_457240647',
  'photo-197700721_457240646'
];

vk.updates.on('message', async (context) => {

  if(!users[context.senderId]) {
    const [userInfo] = await vk.api.users.get({ user_ids: context.senderId });
    users[context.senderId] = {
      id: context.senderId,
      name: userInfo.first_name,
      likes: 0,
      dislikes: 0
    };
  };

  if(context.text.toLowerCase() == "начать") return context.send({
    message: `Добро пожаловать!\n\nЧтобы взаимодействовать с чат-ботом, используйте клавиатуру!`,
    keyboard: main()
  });

  if(context.messagePayload?.command == 'checkMemes') {
    let memId = Number(users[context.senderId].likes) + Number(users[context.senderId].dislikes);

    if(memId > memes.length) return context.send({
      message: `Похоже, вы посмотрели все мемы :( Прихожи к нам позже!`
    });

    return context.send({
      message: `Мем #${memId + 1}`,
      attachment: memes[memId],
      keyboard: likeAndDis(memId)
    });
  };

  if(context.messagePayload?.command == 'stat') return context.send({
    message: `Статистика:\n\nВы поставили ${users[context.senderId].likes} лайков\nВы поставили ${users[context.senderId].dislikes} дизлайков`
  });

  if(context.messagePayload?.command == 'likeAndDis') {
    if(context.messagePayload?.action == 'like') {
      users[context.senderId].likes += Number(1);
      return context.send({
        message: `Вы поставили лайк мему #${context.messagePayload?.memId + 1}`
      });
    };
    if(context.messagePayload?.action == 'dis') {
      users[context.senderId].dislikes += Number(1);
      return context.send({
        message: `Вы поставили дизлайк мему #${context.messagePayload?.memId + 1}`
      });
    };
  };

});

// Сохранение JSON-пользователей
setInterval(() => {
  fs.promises.writeFile('./database/users.json', JSON.stringify(users, null, '\t'));
}, 5000);

// Запуск пуллинга
vk.updates.start();