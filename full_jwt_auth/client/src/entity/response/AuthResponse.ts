import User from 'entity/user/User';

export default interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
}
