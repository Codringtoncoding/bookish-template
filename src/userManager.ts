import {client , GetUserByEmail} from './querySelector';
import crypto from "crypto";

export interface Member {
    id: number;
    name: string;
    email: string;
    hash: string;
    salt: string;

}

export const passwordFunction = (password : string , salt : string) => {
    const valueToHash = password + salt;
    return crypto
    .createHash('sha256')
    .update(password)
    .digest('base64')
};

//I want this function to get the email and passwords and send it to the database after making it hashed up.
export const addNewMember = (name: string , phone_number:string, address: string, email: string, password: string) => {
    const lengthOfSalt = 10;
    const salt = crypto.randomBytes(lengthOfSalt).toString('base64');
    const hashedValue = passwordFunction(password, salt)
    return client('member')
        .insert({name: name, phone_number: phone_number, address: address, email: email, salt: salt, hash: hashedValue })

};


export const tryLoginMember = async(email: string, password: string): Promise<Member | null> => {
    const member = await GetUserByEmail(email);
    ​console.log(member, email, password)
    if (!member) {
        return null;
    }

    if (passwordsMatch(member.salt, password, member.hash)) {
        return member;
    }
    return null;
}
​
const passwordsMatch = (salt: string, password: string, hashedValue: string): Boolean => {
    const hashedAttempt = passwordFunction(password, salt);
    return hashedAttempt === hashedValue;
}
​
