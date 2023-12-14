import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    // Суть этой функции в том, что когда она возвращает false - доступ запрещен/ true - разрешен
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        // Получаем реквест из контекста
        const req = context.switchToHttp().getRequest();

        try {
            const authHeader = req.headers.authorization;
            const [bearer, token] = authHeader.split(' ');


            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({message: 'Пользователь не авторизован'});
            }

            req.user = this.jwtService.verify(token);

            return true;
        } catch (e) {
            throw new UnauthorizedException({message: 'Пользователь не авторизован'});
        }
    }
}