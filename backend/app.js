import loginRoutes from './src/routes/login.js';
import logoutRoutes from './src/routes/logout.js';
import movieRoutes from './src/routes/movie.js';
import express from 'express'; //Importar express
import cookieParser from 'cookie-parser'; //Importar cookie-parser
import customerRoutes from './src/routes/customer.js'; //Importar las rutas de cliente
import employeeRoutes from './src/routes/employee.js'; //Importar las rutas de empleado
import recoveryPasswordRoutes from './src/routes/recoveryPassword.js'; //Importar las rutas de recuperar contraseña
import registerCustomerRoutes from './src/routes/registerCustomer.js'; //Importar las rutas de registrar cliente
import registerEmployeeRoutes from './src/routes/registerEmployee.js'; //Importar las rutas de registrar empleado

//crear constante que es igual a la libreria que importe
const app = express();

//Que acepte datos de json
app.use(express.json());
//Que postman acepte guardar cookies
app.use(cookieParser())

app.use('/api/movies', movieRoutes);
app.use('/api/registerCustomer', registerCustomerRoutes);
app.use('/api/recoveryPassword', recoveryPasswordRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/logout', logoutRoutes);
app.use('/api/registerEmployee', registerEmployeeRoutes);
app.use('/api/employees', employeeRoutes);




export default app;