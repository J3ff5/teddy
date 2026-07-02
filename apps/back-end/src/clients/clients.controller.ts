import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { QueryClientsDto } from './dto/query-clients.dto';

@ApiTags('clients')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('clients')
export class ClientsController {
  constructor(private readonly service: ClientsService) {}

  // Declared before ':id' so "stats" is not matched as an id param.
  @Get('stats')
  @ApiOperation({ summary: 'Totais, últimos clientes e série para o gráfico' })
  getStats() {
    return this.service.stats();
  }

  @Post()
  @ApiOperation({ summary: 'Cria um cliente' })
  create(@Body() dto: CreateClientDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista clientes (paginado)' })
  findAll(@Query() query: QueryClientsDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detalhe do cliente + incrementa contador de acessos' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um cliente' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateClientDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Soft delete de um cliente' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.remove(id);
  }
}
