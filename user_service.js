// File: services/user.service.js
import * as UserDAO from './user_dao.js';

export const create = async (data) => await UserDAO.createUser(data);
export const findAll = async () => await UserDAO.getAllUsers();
export const findOne = async (id) => await UserDAO.getUserById(id);
export const update = async (id, data) => await UserDAO.updateUser(id, data);
export const remove = async (id) => await UserDAO.deleteUser(id);