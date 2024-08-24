import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { SelectionService } from './selection.service';
import { WrapAsyncInterceptor } from 'src/middlewares/wrapAsync.interceptor';

@UseInterceptors(new WrapAsyncInterceptor())
@Controller('selections')
export class SelectionController {
    constructor(private selectionService: SelectionService) {}

    @Get('')
    async getAllSelections() {
        const tags = await this.selectionService.getAllTags();
        const countries = await this.selectionService.getAllCountries();
        return {
            data: {
                tags: tags,
                countries: countries
            }
        };
    }
}