// В константе содержится ключ, по которому мы можем получать какие-то метаданные внутри гуарда
import {SetMetadata} from "@nestjs/common";

export const ROLES_KEY = 'roles';

// Функция-декоратор, прокидывает роли
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
