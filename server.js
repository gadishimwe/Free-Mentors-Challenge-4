import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import routes from './server/routes/index';

console.log(process.env.NODE_ENV);


const app = express();
app.use(morgan('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

export default app;
