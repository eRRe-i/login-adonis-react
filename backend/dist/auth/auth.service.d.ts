import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto, RegisterDto } from "./dto";
export declare class AuthService {
    private prisma;
    constructor(prisma: PrismaService);
    signup(dto: RegisterDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        hash: string;
        firstName: string;
        lastName: string;
    }>;
    signin(dto: AuthDto): Promise<void>;
}
