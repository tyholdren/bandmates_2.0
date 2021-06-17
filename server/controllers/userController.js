const db = require('../models/usersModels');

const userController = {};

//! TODO: are we actually creating the user with this query?
//! There seems to be no change the users when running 
//! GET requests to /users
userController.createUser = async (req, res, next) => {

  // console.log("req.body", req.body);

  const {
    name,
    username,
    password: password_digest,
    email,
    gender,
    birthdate,
    skill: skill_level,
    bio,
    location,
    genres,
    instruments,
  } = req.body;

  res.locals.user = req.body;
  // console.log("deconstructed variables", {
  //   name,
  //   username,
  //   password: password_digest,
  //   email,
  //   gender,
  //   birthdate,
  //   skill: skill_level,
  //   bio,
  //   location,
  //   genres,
  //   instruments,
  // });

  const createUserQuery = `
    INSERT INTO users (name, username, password_digest, email, gender, birthdate, skill_level, bio, location)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *
  `;
  let lowerUsername = username.toLowerCase();

  //! TODO: we are currently storing passwords directly into the DB. 
  //! We need to use Bcrypt to encrypt our users' passwords.
  const params = [
    name,
    lowerUsername,
    password_digest,
    email,
    gender,
    birthdate,
    skill_level,
    "hello",
    location
  ];

  // console.log("params", params)

  try {
    const user = await db.query(createUserQuery, params);
    //! TODO: currently, when we create a user, we are not storing their
    //! instrument or genre information anywhere. We need to update
    //! the joins tables to save that information about a new user. 
    // console.log("user line 69", user);
    // res.locals.user = user.rows[0];
    
    // grab id from user.rows[0]._id
    const userIdNum = user.rows[0]._id;
    console.log("userIdNum", userIdNum);
    res.locals.userId = userIdNum;

    // grab instrument_id from instruments table
    const instrumentSql = `SELECT * FROM instruments WHERE instrument_name = '${instruments}'`
    const instrumentIdQuery = await db.query(instrumentSql);
    // console.log("line 78", instrumentIdQuery);
    const instrumentID = instrumentIdQuery.rows[0]._id
    // console.log("insstsds", instrumentID);

    // make sql query to insert into users_instruments
    const instrumentsQuery = `
    INSERT INTO users_instruments (user_id, instrument_id)
    VALUES (${userIdNum},${instrumentID})
    `
    const usersInstrumentsQuery = await db.query(instrumentsQuery);


    // grab genre_id from genre table
    const genreSql = `SELECT * FROM genre WHERE genre_name = '${genres}'`
    const genreIdQuery = await db.query(genreSql);
    // console.log("line 88", genreIdQuery);
    const genreID = genreIdQuery.rows[0]._id
    // console.log("genre id", genreID);

    // make sql query to insert into users_genres
    const genresQuery = `
    INSERT INTO users_genres (user_id, genre_id)
    VALUES (${userIdNum},${genreID})
    `
    const usersGenresQuery = await db.query(genresQuery);

    return next();
  } catch (error) {
    return next({
      error: `userController.createUser; ERROR: ${error} `,
      message: 'Error occured in conrollers/userController.js'
    });
  }
};

userController.viewUsers = async (req, res, next) => {
  // find all instruments and genres played and preferred by a specific user id in the intermediary tables
  const viewUsers = `
    SELECT users.*, instruments.instrument_name as instruments, genre.genre_name as genres FROM users
    INNER JOIN users_instruments ON users._id = users_instruments.user_id
    INNER JOIN instruments ON instruments._id = users_instruments.instrument_id
    INNER JOIN users_genres ON users._id = users_genres.user_id
    INNER JOIN genre ON genre._id = users_genres.genre_id
  `;

  // This is getting a table showing all the users and the instruments and genres they like
  // select users.*, instruments.instrument_name as instruments, genre.genre_name as genres  from users inner join users_instruments on users._id = users_instruments.user_id inner join instruments on instruments._id =
  //   users_instruments.instrument_id INNER JOIN users_genres on users._id = users_genres.user_id INNER JOIN genre on genre._id = users_genres.genre_id

  // select users.*, instruments.instrument_name as instruments, genre.genre_name as genres  from users inner join users_instruments on users._id = users_instruments.user_id inner join instruments on instruments._id =
  //   users_instruments.instrument_id INNER JOIN users_genres on users._id = users_genres.user_id INNER JOIN genre on genre._id = users_genres.genre_id
  try {
    const users = await db.query(viewUsers);
    const rows = users.rows;
    console.log(rows);
    const builtUsers = new Set();

    const formattedUsers = rows.reduce((acc, user) => {
      if (builtUsers.has(user.username)) {
        const filteredUser = acc.filter(u => u.username === user.username)[0];
        const uniqueGenres = [...new Set([...filteredUser.genres, user.genres])];
        const uniqueInstruments = [...new Set([...filteredUser.instruments, user.instruments])];

        filteredUser.instruments = uniqueInstruments;
        filteredUser.genres = uniqueGenres;
      } else {
        builtUsers.add(user.username);

        const newUser = {
          ...user,
          instruments: [user.instruments],
          genres: [user.genres],
        };

        acc.push(newUser);
      }

      return acc;
    }, []);
    
    console.log("formatted users", formattedUsers);

    res.locals.users = formattedUsers;
    return next();
  } catch (error) {
    return next({
      error: `userController.viewUsers; ERROR: ${error} `,
      message: 'Error occured in controllers/userController.js'
    });
  }
};

//TODO: this middleware will find one user based on that user's ID. 
userController.findUser = async (req, res, next) => {
  // console.log('COOOOOOOKIEEEEEEEE: ', req.cookies.SSID);

  // console.log(req.params.id);
  let userID = req.cookies.SSID;
  console.log("userID", userID);  
  
  const viewUsers = `
    SELECT users.*, instruments.instrument_name as instruments, genre.genre_name as genres FROM users
    INNER JOIN users_instruments ON users._id = users_instruments.user_id
    INNER JOIN instruments ON instruments._id = users_instruments.instrument_id
    INNER JOIN users_genres ON users._id = users_genres.user_id
    INNER JOIN genre ON genre._id = users_genres.genre_id
  `;

  // This is getting a table showing all the users and the instruments and genres they like
  // select users.*, instruments.instrument_name as instruments, genre.genre_name as genres  from users inner join users_instruments on users._id = users_instruments.user_id inner join instruments on instruments._id =
  //   users_instruments.instrument_id INNER JOIN users_genres on users._id = users_genres.user_id INNER JOIN genre on genre._id = users_genres.genre_id

  // select users.*, instruments.instrument_name as instruments, genre.genre_name as genres  from users inner join users_instruments on users._id = users_instruments.user_id inner join instruments on instruments._id =
  //   users_instruments.instrument_id INNER JOIN users_genres on users._id = users_genres.user_id INNER JOIN genre on genre._id = users_genres.genre_id
  try {
    const users = await db.query(viewUsers);
    const rows = users.rows;
    console.log("rows line 146", rows);
    const builtUsers = new Set();

    const formattedUsers = rows.reduce((acc, user) => {
      if (builtUsers.has(user.username)) {
        const filteredUser = acc.filter(u => u.username === user.username)[0];
        const uniqueGenres = [...new Set([...filteredUser.genres, user.genres])];
        const uniqueInstruments = [...new Set([...filteredUser.instruments, user.instruments])];

        filteredUser.instruments = uniqueInstruments;
        filteredUser.genres = uniqueGenres;
      } else {
        builtUsers.add(user.username);

        const newUser = {
          ...user,
          instruments: [user.instruments],
          genres: [user.genres],
        };

        acc.push(newUser);
      }

      return acc;
    }, []);

    console.log("formatted users on profile page", formattedUsers)
    let userData;
    console.log("user ID line 224", userID);
    for(let i = 0; i < formattedUsers.length; i++) {
      console.log("formattedUsers[i]._id", formattedUsers[i]._id);
      if(formattedUsers[i]._id == userID) {
        userData = formattedUsers[i];
        break;
      }
    }


    // res.locals.user = await db.query(findUser); 
    console.log("line 182", userData);
    res.locals.user = userData;
    

    return next();
  } catch (error) {
    return next({
      error: `userController.findUser; ERROR: ${error} `,
      message: 'Error occured in controllers/userController.js'
    });
  }
};

//TODO: this middleware will find one user based on that user's ID,
// and update based on the body. 
userController.updateUser = async (req, res, next) => {
  try {
    const updateUser = undefined; //some selection
      // res.locals.message = await db.query(updateUser);
      res.locals.user = await db.query(updateUser);
  } catch (error) {
    return next({
      error: `userController.updateUser; ERROR: ${error} `,
      message: 'Error occured in controllers/userController.js'
    });
  }
};

//TODO: this middleware will find one user and delete them
// from the database. 
userController.deleteUser = async (req, res, next) => {
  try {
    const deleteUser = undefined; //some selection
    await db.query(deleteUser);
    res.locals.message = 'User has been deleted'; //.rows[0]; 
    return next();
  } catch (error) {
    return next({
      error: `userController.deleteUser; ERROR: ${error} `,
      message: 'Error occured in controllers/userController.js'
    });
  }
};





//JOSH
userController.verifyUser = async (req, res, next) => {


  console.log('helpppppppppp')
  console.log(req.body);
  // const [username, password] = req.body;
  const username = req.body.username;
  const password = req.body.password;

  if(username === undefined || password === undefined || username === '' || password === ''){
    req.body.valid = false;
    next();
  }
  const params = [
    username,
    password,
  ]
  const  selectUserQuery = `SELECT * FROM users WHERE username = $1 AND password_digest = $2`

  try {
    const user = await db.query(selectUserQuery, params)
    // console.log(user.rows[0]);
    
    if(user.rows[0] !== undefined){
      res.locals.valid = true;
      res.locals.userId = user.rows[0]._id;
    }
    else{
      res.locals.valid = false;
    }
    next();
  }catch(err){
    console.log('err on verifyUser')
    next({
      message: err
    });
  }

}




module.exports = userController;
