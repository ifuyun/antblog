import { IntersectionType } from '@nestjs/mapped-types';
import { IsNotEmpty, MaxLength, ValidateIf } from 'class-validator';
import { TaxonomyStatus, TaxonomyType } from '../common/common.enum';
import { TAXONOMY_DESCRIPTION_LENGTH, TAXONOMY_NAME_LENGTH, TAXONOMY_SLUG_LENGTH } from '../common/constants';
import { getEnumStringValues } from '../helpers/helper';
import { IsId } from '../validators/is-id.validator';
import { IsIncludedIn } from '../validators/is-included-in.validator';
import { IsNumber } from '../validators/is-number.validator';
import { IsTaxonomyExist } from '../validators/is-taxonomy-exist.validator';
import { IsSlugExist } from '../validators/is-slug-exist.validator';

export class BasicTaxonomyDto {
  // 验证顺序根据注解声明顺序从下往上
  @IsIncludedIn(
    { ranges: getEnumStringValues(TaxonomyType) },
    { message: '不支持的操作' }
  )
  @IsNotEmpty({ message: '参数非法' })
  type?: string;

  @IsTaxonomyExist({ message: '修改的分类不存在' })
  @IsId({ message: '参数非法' })
  taxonomyId?: string;

  @MaxLength(TAXONOMY_NAME_LENGTH, { message: '名称长度应不大于$constraint1字符' })
  @IsNotEmpty({ message: '名称不能为空' })
  name: string;

  @IsSlugExist({ typeField: 'type', idField: 'taxonomyId' }, { message: '别名$value已存在' })
  @MaxLength(TAXONOMY_SLUG_LENGTH, { message: '别名长度应不大于$constraint1字符' })
  @IsNotEmpty({ message: '别名不能为空' })
  slug: string;

  @MaxLength(TAXONOMY_DESCRIPTION_LENGTH, { message: '描述长度应不大于$constraint1字符' })
  @IsNotEmpty({ message: '描述不能为空' })
  description: string;

  @IsTaxonomyExist({ message: '父节点不存在' })
  @IsId({ message: '参数非法' })
  parent?: string;

  @ValidateIf(o => o.type !== TaxonomyType.TAG)
  @IsNumber({ message: '排序必须为数字' })
  termOrder?: number;

  @IsIncludedIn(
    { ranges: getEnumStringValues(TaxonomyStatus) },
    { message: '状态选择错误' }
  )
  @IsNotEmpty({ message: '状态不能为空' })
  status: number;
}

export class AdditionalTaxonomyDto {
  termGroup?: string;
  count?: number;
  created?: Date;
  modified?: Date;
}

export class TaxonomyDto extends IntersectionType(BasicTaxonomyDto, AdditionalTaxonomyDto) {
}
