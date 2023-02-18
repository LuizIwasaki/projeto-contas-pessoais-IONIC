import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import User from "../models/User";
import { StatusCodes } from "http-status-codes";
export default {
  async create(request: Request, response: Response) {
    //desestruturar o corpo da requisição (JSON)
    const { nome, senha,email,telefone } = request.body;

    const userRepository = AppDataSource.getRepository(User);

    const user = userRepository.create({
      nome,
      senha,
      email,
      telefone,
    });

    await userRepository.save(user);

    return response.status(201).json(user);
  },
  async index(request: Request, response: Response) {
    const userRepository = AppDataSource.getRepository(User);

    //Filtrar pelo nome (WHERE)
    // const users = await userRepository
    // .find({ nome: "Luiz" });

    //Filtrar pelo nome (WHERE) usando a função LIKE
    // const users = await userRepository
    // .find({ nome: Like("%Luiz%") });

    // Filtrar as colunas (SELECT)
    // const users = await userRepository
    //   .createQueryBuilder("user")
    //   .select(["user.nome", "user.password"])
    //   .getMany();

    //Buscar tudo
    const users = await userRepository.find();

    response.json(users);
  },
  async show(request: Request, response: Response) {
    const { id } = request.params;
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOneBy({
      id: +id,
    });

    response.json(user);
  },
  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOneBy({
      id: +id,
    });
    
    if (user) {
      await userRepository.delete(user);
      return response.status(StatusCodes.NO_CONTENT).json(user);
    }
    response.status(404).json();
    
  },
};
