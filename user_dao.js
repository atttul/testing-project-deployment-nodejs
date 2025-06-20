// File: dao/user.dao.js
import { User } from './User.js';

export const createUser = async (data) => await User.create(data);
export const getAllUsers = async () => await User.findAll();
export const getUserById = async (id) => await User.findByPk(id);
export const updateUser = async (id, data) => {
    const user = await User.findByPk(id);
    if (!user) return null;
    return await user.update(data);
};
export const deleteUser = async (id) => {
    const user = await User.findByPk(id);
    if (!user) return null;
    await user.destroy();
    return user;
};