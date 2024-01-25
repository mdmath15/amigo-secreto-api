import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import https from 'https';
import http from 'http';
import fs from 'fs';
import { siteRoutes } from './routes/site';
import { adminRoutes } from './routes/admin';
import { requestIntercepter } from './utils/request-intercepter';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all('*', requestIntercepter);

app.use('/admin', adminRoutes);
app.use('/', siteRoutes);

const runServer = (port: number, server: http.Server) => {
  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

const server = http.createServer(app);

const serverPort: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

runServer(serverPort, server);
