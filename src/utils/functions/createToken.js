import jwt from 'jsonwebtoken';

const createToken = sub => jwt.sign({ sub }, process.env.JWT_SECRET, { expiresIn: '12h' });

export default createToken;
