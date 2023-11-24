import { HttpResponseBuilder } from "./error";
export default function checkAuthor(roles:string[]) {
    return  function (req, res, next )
    {   
        if (roles.includes(req.userToken.role)) {
            next();
        } else
        {
            return HttpResponseBuilder.buildUnAuthorized(res,{ message: 'You are not allowed to perform this action' })
        }
        
    };
}