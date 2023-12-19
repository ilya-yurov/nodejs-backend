import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {Reflector} from "@nestjs/core";
import {ROLES_KEY} from "src/auth/roles-auth.decorator";
import {User} from "src/users/users.model";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector,
    ) {}

    // Суть этой функции в том, что когда она возвращает false - доступ запрещен/ true - разрешен
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                // Получаем контекст, для того, чтобы рефлектор понимал какие данные необходимо доставать
                context.getHandler(),
                context.getClass(),
            ])

            if (!requiredRoles) {
                return true;
            }

            // Получаем реквест из контекста
            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers.authorization ?? '';
            const [bearer, token] = authHeader.split(' ');

            if (bearer !== 'Bearer' || !token) {
                throw new HttpException('Пользователь не авторизован', HttpStatus.UNAUTHORIZED);
            }

            const user = this.jwtService.verify(token);

            req.user = user

            const userHasRole = user.roles.some(role => requiredRoles.includes(role.value));

            if (!userHasRole) {
                throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN);
            }

            return userHasRole;
        } catch (e) {
            throw e;
        }
    }
}