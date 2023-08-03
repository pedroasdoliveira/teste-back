import { Request, Response, NextFunction } from 'express';

const RequestsHeader = (req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', `${process.env.FRONTEND_URL}`);
    res.header(
      'Access-Control-Allow-Methods',
      'GET,POST,DELETE,OPTIONS,PUT,PATCH',
    );
    res.header('Access-Control-Allow-Headers', `${process.env.FRONTEND_URL}`);
    next();
};

export default RequestsHeader;
