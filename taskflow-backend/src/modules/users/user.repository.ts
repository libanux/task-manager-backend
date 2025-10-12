import { UserModel, IUser } from './user.model';

export class UserRepository {
  async create(userData: Partial<IUser>): Promise<IUser> { /*Partial<IUser> means 
    "All properties of IUser are optional" 🎯 */
    const user = new UserModel(userData);
    return await user.save();
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await UserModel.findOne({ email });
  }

  async findById(id: string): Promise<IUser | null> {
    return await UserModel.findById(id);
  }
}