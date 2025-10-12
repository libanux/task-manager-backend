import { UserRepository } from './user.repository';
import { IUser } from './user.model';
import { generateToken } from '../../utils/jwt';

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export class UserService {
  private userRepository = new UserRepository();

  async register(userData: Partial<IUser>): Promise<AuthResponse> {
    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(userData.email!);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Create user
    const user = await this.userRepository.create(userData);

    // Generate token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email
    });

    return {
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email
      }
    };
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    // Find user by email
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // Generate token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email
    });

    return {
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email
      }
    };
  }
}