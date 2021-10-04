let express = require('express');
let app = express();
let path = require('path');
let methodOverride = require('method-override')
let session = require('express-session')
let cookieParser = require('cookie-parser')
let cookieCheck = require('./middlewares/cookieCheck')


/* Enrutadores */
let autosRouter = require('./routes/autos');
let homeRouter = require('./routes/home');
let sucursalesRouter = require('./routes/sucursales');
let adminRouter = require('./routes/admin');
let usersRouter = require('./routes/users')

/* Vistas */
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
app.use(methodOverride('_method'));

app.use(cookieParser())

/* Middlewares */
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({secret:"concesionarias"}))
app.use(cookieCheck)

/* Rutas */
app.use('/', homeRouter);
app.use('/sucursales', sucursalesRouter);
app.use('/autos', autosRouter);
app.use('/admin', adminRouter);
app.use('/users', usersRouter)

/* Vista not found */
app.use((req, res, next) => {
    res.status(404).render('not-found')
})


app.listen(3000, () => { console.log("Servidor levantado")})