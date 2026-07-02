import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let users: { findOne: jest.Mock };
  let jwt: { signAsync: jest.Mock };

  beforeEach(() => {
    users = { findOne: jest.fn() };
    jwt = { signAsync: jest.fn().mockResolvedValue('signed.jwt.token') };
    service = new AuthService(
      users as unknown as Repository<User>,
      jwt as unknown as JwtService,
    );
  });

  it('returns an access token and user for valid credentials', async () => {
    const passwordHash = await bcrypt.hash('secret1', 10);
    users.findOne.mockResolvedValue({
      id: 'u1',
      email: 'admin@teddy.com',
      passwordHash,
    } as User);

    const res = await service.login({
      email: 'admin@teddy.com',
      password: 'secret1',
    });

    expect(res.accessToken).toBe('signed.jwt.token');
    expect(res.user).toEqual({ id: 'u1', email: 'admin@teddy.com' });
    expect(jwt.signAsync).toHaveBeenCalledWith({
      sub: 'u1',
      email: 'admin@teddy.com',
    });
  });

  it('throws when the user does not exist', async () => {
    users.findOne.mockResolvedValue(null);
    await expect(
      service.login({ email: 'ghost@teddy.com', password: 'secret1' }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('throws when the password does not match', async () => {
    const passwordHash = await bcrypt.hash('correct-password', 10);
    users.findOne.mockResolvedValue({
      id: 'u1',
      email: 'admin@teddy.com',
      passwordHash,
    } as User);

    await expect(
      service.login({ email: 'admin@teddy.com', password: 'wrong-password' }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });
});
