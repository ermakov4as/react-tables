const express = require("express");
const users = require("./users");
const getTodos = require("./getTodos");
const app = express();

// For correct work with CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

/////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////     LOCAL FUNCTIONS     ////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
const compareAsc = (a, b, field) => {
  if (a[field] < b[field]) {
    return -1;
  }
  if (a[field] > b[field]) {
    return 1;
  }
  return 0;
};
const compareDesc = (a, b, field) => {
  if (a[field] < b[field]) {
    return 1;
  }
  if (a[field] > b[field]) {
    return -1;
  }
  return 0;
};

const sortFunction = (arr, field, direction) => {
  if (direction === "asc") {
    return arr.sort((a, b) => compareAsc(a, b, field));
  }
  if (direction === "desc") {
    return arr.sort((a, b) => compareDesc(a, b, field));
  }
};

const filterFunction = (response, searchField, search) => {
  console.log(searchField, search);
  return response.filter(elem => {
    return elem[searchField.toLowerCase()]
      .toLowerCase()
      .startsWith(search.toLowerCase());
  });
};

const filterFromMoscow = (response) => {
  console.log('from Moscow only!');
  return response.filter(elem => {
    return elem.city === 'Москва' || elem.city === 'Moscow'
  });
};

const filterMailfunction = (response, filterMail) => {
  console.log('onye emails in ', filterMail)
  return response.filter(elem => {
    return elem.email.indexOf(filterMail) + 1
  })
}

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////     CORE FUNCTIONS     ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/users", function(req, res) {
  const field = req.query.field;
  const direction = req.query.direction;
  const searchField = req.query.searchField;
  const search = req.query.search;
  const fromMoscow = req.query.fromMoscow;
  const filterMail = req.query.filterMail;
  let response = users;
  if (field && direction) {
    response = sortFunction(users, field, direction);
  }
  if (searchField && search) {
    response = filterFunction(response, searchField, search);
  }
  if (fromMoscow) {
    response = filterFromMoscow(response);
  }
  if (filterMail) {
    response = filterMailfunction(response, filterMail);
  }
  res.send(response);
});

app.get("/users/:id/todos", function(req, res) {
  res.send(getTodos(+req.params.id));
});

app.listen(8087, "0.0.0.0", () => {
  console.clear();
  console.log(`🚀 Server ready`);
});
