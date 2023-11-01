export default function checkAuthor(roles:string[]) {
    return  function (req, res, next )
    {   
        if (roles.includes(req.userToken.role)) {
            next();
        } else
        {
            return res.status(403).json({ message: 'You are not allowed to perform this action' });
        }
        
    };
}