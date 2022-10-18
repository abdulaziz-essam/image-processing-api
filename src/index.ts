import express, { Request, Response } from 'express';
import image_route from './routes/imageRoute';
const app: express.Application = express();
const port = 3000;
export default app;


app.use('/', image_route);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
