import { Request, Response } from "express";
import ApiError from "../error/ApiError";
import { PrismaClient } from "../generated/prisma/client";

const prisma = new PrismaClient();

class PostController {
  async getAll (_req: Request, res: Response): Promise<Response | void> {
    try {
      const posts = await prisma.post.findMany();
      return res.send(posts);
    } catch (error) {
      ApiError.badRequest(`Ошибка: ${error}`)
    }
  }

  async getUserRecords (req: Request, res: Response): Promise<Response | void> {
    try {
      const {authorId} = req.params;
      const a = Number(authorId);
      const userRecords = await prisma.post.findMany({
        where: {
          authorId: a
        },
        include: {
          subPosts: true,
        },
      });
      return res.send(userRecords);
    } catch (error) {
      ApiError.badRequest(`Ошибка: ${error}`)
    }
  }

  async testRequest (req: Request, res: Response): Promise<Response | void> {
    try {
      // const a = req.params.a;
      // const b = Number(a);
      return res.send(`${req.params.a}`);
    } catch (error) {
      ApiError.badRequest(`Ошибка: ${error}`)
    }
  }

  async create (req: Request, res: Response) {
    const posts = await prisma.post.create({data: {
      title: req.body.title,
      author: {
        connect: {id: req.body.authorId}
      }
    }});
    return res.send(posts);
  }

  async delete (req: Request, res: Response) {
    const posts = await prisma.post.delete({where: {id: parseInt(req.params.postId)}})
    return res.send(posts);
  }

  async update (req: Request, res: Response) {
    const postId = parseInt(req.params.postId);
    const posts = await prisma.post.update({
      where: {
        id: postId,
      },
      data: req.body,
    });
  return res.send(posts);
  }

  async createSub(req: Request, res: Response) {
    const subPosts = await prisma.subPost.create({data: {
      title: req.body.title,
      mainPost: {
        connect: {id: req.body.postId}
      }
    }});
    return res.send(subPosts);
  }

  async updateSub(req: Request, res: Response) {
    const postId = parseInt(req.params.postId);
    const subPosts = await prisma.subPost.update({
      where: {
        id: postId,
      },
      data: req.body,
    });
  return res.send(subPosts);
  }

  async deleteSub(req: Request, res: Response) {
    const subPosts = await prisma.subPost.delete({where: {id: parseInt(req.params.postId)}})
    return res.send(subPosts);
  }

  async createGroup(req: Request, res: Response) {
    const group = await prisma.group.create({data: {
      title: req.body.title,
      author: {
        connect: {id: req.body.authorId}
      }
    }});
    return res.send(group);
  }

  async updateGroup(req: Request, res: Response) {
    const groupId = parseInt(req.params.groupId);
    const grpups = await prisma.group.update({
      where: {
        id: groupId,
      },
      data: req.body,
    });
  return res.send(grpups);
  }

  async deleteGroup (req: Request, res: Response) {
    const groups = await prisma.group.delete({where: {id: parseInt(req.params.groupId)}})
    return res.send(groups);
  }

}

export default PostController
