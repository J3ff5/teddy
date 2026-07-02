import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

/**
 * Seeds the admin user on boot when it does not exist yet. There is no
 * self-service registration endpoint in the spec, so this bootstraps the
 * single login account from ADMIN_EMAIL / ADMIN_PASSWORD.
 */
@Injectable()
export class AuthSeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(AuthSeedService.name);

  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly config: ConfigService,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    const email = this.config.get<string>('ADMIN_EMAIL');
    const password = this.config.get<string>('ADMIN_PASSWORD');
    if (!email || !password) return;

    const exists = await this.users.findOne({ where: { email } });
    if (exists) return;

    const passwordHash = await bcrypt.hash(password, 10);
    await this.users.save(this.users.create({ email, passwordHash }));
    this.logger.log(`Seeded admin user: ${email}`);
  }
}
