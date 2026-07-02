import { NotFoundException } from '@nestjs/common';
import { Counter } from 'prom-client';
import { Repository } from 'typeorm';
import { ClientsService } from './clients.service';
import { Client } from './entities/client.entity';

describe('ClientsService', () => {
  let service: ClientsService;
  let repo: {
    save: jest.Mock;
    create: jest.Mock;
    findAndCount: jest.Mock;
    findOne: jest.Mock;
    increment: jest.Mock;
    softDelete: jest.Mock;
    count: jest.Mock;
    find: jest.Mock;
  };

  beforeEach(() => {
    repo = {
      save: jest.fn(),
      create: jest.fn((x) => x),
      findAndCount: jest.fn(),
      findOne: jest.fn(),
      increment: jest.fn(),
      softDelete: jest.fn(),
      count: jest.fn(),
      find: jest.fn(),
    };
    const views = { inc: jest.fn() } as unknown as Counter<string>;
    service = new ClientsService(repo as unknown as Repository<Client>, views);
  });

  it('paginates results with totalPages', async () => {
    repo.findAndCount.mockResolvedValue([[{ id: '1' }], 20]);
    const res = await service.findAll({ page: 2, limit: 5 });
    expect(res).toMatchObject({ total: 20, page: 2, limit: 5, totalPages: 4 });
    expect(repo.findAndCount).toHaveBeenCalledWith(
      expect.objectContaining({ skip: 5, take: 5 }),
    );
  });

  it('increments viewCount on detail read', async () => {
    repo.findOne.mockResolvedValue({ id: '1', viewCount: 3 } as Client);
    const res = await service.findOne('1');
    expect(repo.increment).toHaveBeenCalledWith({ id: '1' }, 'viewCount', 1);
    expect(res.viewCount).toBe(4);
  });

  it('throws NotFound on detail of missing client', async () => {
    repo.findOne.mockResolvedValue(null);
    await expect(service.findOne('x')).rejects.toBeInstanceOf(NotFoundException);
    expect(repo.increment).not.toHaveBeenCalled();
  });

  it('throws NotFound when soft delete affects no rows', async () => {
    repo.softDelete.mockResolvedValue({ affected: 0 });
    await expect(service.remove('x')).rejects.toBeInstanceOf(NotFoundException);
  });
});
