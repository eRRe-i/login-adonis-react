import User from "#models/user";


export default class UserService {

    public async getUserByMail(email : string) {
        
        const user = User.findByOrFail('email', email)
        return user
    }

} 