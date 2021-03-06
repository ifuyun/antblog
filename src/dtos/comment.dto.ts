import { IntersectionType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import { CommentStatus } from '../common/common.enum';
import { COMMENT_AUTHOR_NAME_LENGTH, COMMENT_CONTENT_LENGTH } from '../common/constants';
import { Message } from '../common/message.enum';
import { format } from '../helpers/helper';
import { IsCommentExist } from '../validators/async/is-comment-exist.validator';
import { IsPostExist } from '../validators/async/is-post-exist.validator';
import { IsId } from '../validators/is-id.validator';
import { IsIncludedIn } from '../validators/is-included-in.validator';
import { IsRequired } from '../validators/is-required.validator';

export class BasicCommentDto {
  // 验证顺序根据注解声明顺序从下往上
  @IsCommentExist({ message: '修改的评论不存在' })
  @IsId({ message: format(Message.PARAM_INVALID, '$constraint1') })
  commentId?: string;

  @IsPostExist({ message: '评论文章不存在' })
  @IsId({ message: format(Message.PARAM_INVALID, '$constraint1') })
  @IsNotEmpty({ message: '评论文章不存在' })
  postId: string;

  @IsCommentExist({ message: '回复的评论不存在' })
  @IsId({ message: format(Message.PARAM_INVALID, '$constraint1') })
  commentParent?: string;

  @IsCommentExist({ message: '回复的评论不存在' })
  @IsId({ message: format(Message.PARAM_INVALID, '$constraint1') })
  commentTop?: string;

  @MaxLength(COMMENT_AUTHOR_NAME_LENGTH, { message: '昵称最大长度为$constraint1个字符' })
  @IsNotEmpty({ message: '昵称不能为空' })
  authorName?: string;

  @IsEmail({ allow_display_name: false }, { message: '邮箱输入不正确' })
  @IsNotEmpty({ message: '邮箱不能为空' })
  authorEmail?: string;

  @MaxLength(COMMENT_CONTENT_LENGTH, { message: '评论内容最大长度为$constraint1个字符' })
  @IsRequired({ message: '评论内容不能为空' })
  commentContent: string;

  @IsIncludedIn(
    {
      ranges: [CommentStatus.NORMAL, CommentStatus.PENDING, CommentStatus.TRASH, CommentStatus.REJECT, CommentStatus.SPAM],
      allowNull: true
    },
    { message: '评论状态“$constraint1”不支持' }
  )
  commentStatus?: CommentStatus;
}

export class AdditionalCommentDto {
  captchaCode?: string;
  authorEmailHash?: string;
  authorIp?: string;
  authorUserAgent?: string;
  userId?: string;
  fa?: boolean;
}

export class CommentDto extends IntersectionType(BasicCommentDto, AdditionalCommentDto) {
}
