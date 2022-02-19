import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthService } from '../services/health.service';

@Controller({
  path: 'health',
})
@ApiTags('Health')
export class HealthController {
  constructor(protected readonly healthService: HealthService) {}
  @Post()
  public async getHealthStatus() {
    console.log(this.healthService);
    return {
      status: 'At full steam boss!!',
    };
  }
}
