import { Order } from 'sequelize';
import { PostModel } from '../../models/post.model';
import { TaxonomyModel } from '../../models/taxonomy.model';
import { CommentFlag, PostStatus, PostType } from '../../common/common.enum';

export interface PostVo {
  post: PostModel;
  meta: Record<string, string>;
  tags: TaxonomyModel[];
  categories: TaxonomyModel[];
}

export interface PostListVo {
  posts: PostVo[];
  page: number;
  total: number;
}

export interface PostQueryParam {
  postType?: PostType[];
  page: number;
  pageSize?: number;
  isAdmin: boolean;
  fromAdmin?: boolean;
  keyword?: string;
  subTaxonomyIds?: string[];
  tag?: string;
  year?: string;
  month?: string;
  status?: PostStatus[];
  commentFlag?: CommentFlag[];
  original?: string[];
  author?: string;
  orders?: Order;
}

export interface PostArchivesQueryParam {
  postType: PostType[];
  status?: PostStatus[];
  showCount: boolean;
  limit: number;
  isAdmin: boolean;
  fromAdmin?: boolean;
}

export interface FileData {
  id: string,
  guid: string,
  name: string,
  originalName: string,
  mimeType: string,
  path: string;
}
