import {genderMap, roleMap, userStatus} from "./userMap";

/**
 * 用户类别
 */
export type UserType = {
    id:number
    "username":string
    "userAccount":string
    "avatarUrl":string
    "gender":genderMap
    "profile"?:string
    "phone":string
    "email":string
    "userStatus": userStatus
    "tags":string[]
    "userRole":roleMap
    "createTime":Date
    "userIds": string[]
};