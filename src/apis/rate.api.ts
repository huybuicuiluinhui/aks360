import { AuthResponseSuccess, SuccessResponse } from "../types/auth.type";
import { httpWithToken } from "../utils/http";
const URL_CREATE_AVALUATE = "evaluate/create-avaluate";
const rateApis = {
  rating(body:{
    id_branch: number;
    note: string;
    star: number;
     code?: string
  }) {

    const params:{
        id_branch: number;
        note: string;
        star: number;
        code?: string;
    } = {
id_branch: body.id_branch,
note: body.note,
star: body.star,
    }
    if(body.code !== undefined){
        params.code = body.code
    }
    return httpWithToken.post<AuthResponseSuccess>(`${URL_CREATE_AVALUATE}`,params );
  },
};
export default rateApis;
