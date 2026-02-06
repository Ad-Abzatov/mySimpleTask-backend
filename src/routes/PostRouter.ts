import express from 'express';
import PostController from '../controllers/PostController';

const PostRouter = express.Router();
const postController = new PostController();

PostRouter.get('/posts', postController.getAll); // Все записи
PostRouter.post('/posts', postController.create); // Создание записи
PostRouter.delete('/posts/:postId', postController.delete); // Удаление записи
PostRouter.put('/posts/:postId', postController.update); // Изменение записи
PostRouter.get('/userposts/:authorId', postController.getUserRecords); // Записи пользованиеля
PostRouter.post('/subposts', postController.createSub); // Создание подзадачи
PostRouter.put('/subposts/:postId', postController.updateSub); // Изменение подзадачи
PostRouter.delete('/subposts/:postId', postController.deleteSub); // Удаление подзадачи
PostRouter.post('/groups', postController.createGroup); // Создание группы
PostRouter.put('/groups', postController.updateGroup); // Изменение группы
PostRouter.delete('/groups', postController.deleteGroup); // Удаление группы
PostRouter.get('/test/:a', postController.testRequest);

export default PostRouter
