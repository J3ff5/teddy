import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from 'prom-client';
import { ILike, Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { QueryClientsDto } from './dto/query-clients.dto';
import { CLIENT_VIEWS_COUNTER } from '../metrics/metrics.module';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client) private readonly repo: Repository<Client>,
    @InjectMetric(CLIENT_VIEWS_COUNTER) private readonly views: Counter<string>,
  ) {}

  create(dto: CreateClientDto): Promise<Client> {
    return this.repo.save(this.repo.create(dto));
  }

  async findAll(query: QueryClientsDto) {
    const { page, limit, search } = query;
    const [data, total] = await this.repo.findAndCount({
      where: search ? { name: ILike(`%${search}%`) } : {},
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    };
  }

  /** Detalhe do cliente — incrementa o contador de acessos de forma atômica. */
  async findOne(id: string): Promise<Client> {
    const client = await this.getOrFail(id);
    await this.repo.increment({ id }, 'viewCount', 1);
    this.views.inc();
    client.viewCount += 1;
    return client;
  }

  async update(id: string, dto: UpdateClientDto): Promise<Client> {
    const client = await this.getOrFail(id);
    Object.assign(client, dto);
    return this.repo.save(client);
  }

  async remove(id: string): Promise<void> {
    const result = await this.repo.softDelete(id);
    if (!result.affected) {
      throw new NotFoundException(`Cliente ${id} não encontrado`);
    }
  }

  /** Cards + gráfico + últimos clientes do dashboard. */
  async stats() {
    const total = await this.repo.count();
    const recent = await this.repo.find({
      order: { createdAt: 'DESC' },
      take: 5,
    });
    const perDay = await this.repo
      .createQueryBuilder('c')
      .select("to_char(c.created_at, 'YYYY-MM-DD')", 'date')
      .addSelect('COUNT(*)', 'count')
      .where('c.deleted_at IS NULL')
      .groupBy('date')
      .orderBy('date', 'ASC')
      .getRawMany<{ date: string; count: string }>();

    return {
      total,
      recent,
      perDay: perDay.map((r) => ({ date: r.date, count: Number(r.count) })),
    };
  }

  private async getOrFail(id: string): Promise<Client> {
    const client = await this.repo.findOne({ where: { id } });
    if (!client) {
      throw new NotFoundException(`Cliente ${id} não encontrado`);
    }
    return client;
  }
}
