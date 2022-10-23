import { CorsOptions, CorsOptionsDelegate, CorsRequest } from 'cors';

const whitelist = ['http://localhost:8000', 'http://localhost:5000'];
const corsOptions: CorsOptions | CorsOptionsDelegate<CorsRequest> | undefined = {
  origin: (origin, callback) => {
    if (origin !== undefined) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'), undefined);
      }
    } else {
      callback(new Error('Not allowed by CORS'), undefined);
    }
  },
};

export default corsOptions;
