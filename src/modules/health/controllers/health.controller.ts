import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller({
  path: 'health',
})
@ApiTags('Health')
export class HealthController {
  @Get()
  public async getHealthStatus() {
    return {
      status: 'At full steam boss!!',
    };
  }
}
