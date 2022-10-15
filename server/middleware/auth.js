import jwt from "jsonwebtoken";

// if user wants to do anything where we have to check if they have permission to do so, like liking a post,
// this middleware gets called after clicking the like button to verify they have permission.
// auth middleware confirms or denies the request by calling next();
// then the 'like' controller gets called
// middleware is for any kind of action that happens before 'something'

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "test");

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
