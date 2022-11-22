import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { SearchItemsDto } from './dto/search-items.dto';
import { ItemEntity } from './entities/item.entity';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate/index';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(3), ParseIntPipe) limit: number = 10,
  ): Promise<Pagination<ItemEntity>> {
    const options: IPaginationOptions = {
      limit,
      page,
    }
  /* const [items, meta] = await this.itemsService.paginate(options)*/

    return await this.itemsService.paginate(options);
  }


  @Get('/search')
  searchItems(@Query() dto: SearchItemsDto){
    return this.itemsService.search(dto)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(+id, updateItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemsService.remove(+id);
  }

}
