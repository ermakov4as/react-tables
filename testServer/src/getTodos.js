const users = require("./users");

const todos = [
  {
    id: 1,
    title: "Помыть посуду",
    completed: false
  },
  {
    id: 1,
    title: "Сделать уроки",
    completed: true
  },
  {
    id: 2,
    title: "Написать свой программу",
    completed: true
  },
  {
    id: 2,
    title: "Посмотреть телевизор",
    completed: false
  },
  {
    id: 2,
    title: "Позвонить маме",
    completed: false
  },
  {
    id: 2,
    title: "Отнести торт соседям",
    completed: true
  },
  {
    id: 2,
    title: "Прибраться дома",
    completed: false
  },
  {
    id: 3,
    title: "Написать свой программу",
    completed: true
  },
  {
    id: 3,
    title: "Разобраться почему не работает вентилятор",
    completed: false
  },
  {
    id: 3,
    title: "Позвонить в поликлинику",
    completed: false
  },
  {
    id: 3,
    title: "Сходить на свидание",
    completed: true
  },
  {
    id: 3,
    title: "Устроиться на работу",
    completed: false
  },
  {
    id: 3,
    title: "Написать свой первый сайт",
    completed: false
  }
];

module.exports = searchId => todos.filter(({ id }) => id === searchId);
