import admin = require('firebase-admin');

const originIsAllowed = async (authorization: string) => {
  if (typeof authorization === 'string') {
    const token = authorization.replace('Bearer ', '');
    return admin.auth().verifyIdToken(token)
      .then((decodedToken) => decodedToken)
      .catch((err) => {
        console.error(err);
        return null;
      });
  }

  return null;
};

export default originIsAllowed;
