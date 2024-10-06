export type ReplyDTO = {
  image?: string;
  content?: string;
  postId: number;
}

export type updateReplyDTO = {
  id: number;
  content?: string;
  image?: string;
}