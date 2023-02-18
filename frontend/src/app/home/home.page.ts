import { Component } from '@angular/core';
import { UserService } from '../api/user.service';
import { ToastController } from '@ionic/angular';
import { StatusCodes } from 'http-status-codes';
import { Request, Response} from 'express';
import { exit } from 'process';
import { waitForAsync } from '@angular/core/testing';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public id: number;
  public username: string;
  public password: string;
  users: any[] = [];
  public email: string;
  public telefone: string;

  constructor(private userService: UserService,
    private toastController: ToastController) {
    this.obterUsuarios();
    this.getUsers();
  }
  
  private obterUsuarios() {
    this.userService.obterUsuarios().then((resultado) => {
      console.log(resultado);
    });
  }

  private async showMessage(message: string): Promise<void>{
    const mensagem = await this.toastController.create({
    message: message, duration: 2000
    });
    mensagem.present();
  }
    //CONTINUAR METODO DELETE, PROBLEMA: NAO ESTA SETADO O ID.
    //CORRIGIR PARAMETRO ID CALL BACK-END. CORRIGIR BOTAO EXCLUIR (DUPLICIDADE)
   criarObjetoPass():void {
    const p = {
      id: this.id,
      nome: this.username,
      senha: this.password,
      email: this.email,
      telefone: this.telefone
    };
    if(p.nome != null && p.senha != null && p.telefone != null)
    {

      this.userService
      .createUser(p)
      .then((user) => {
        console.log(user);
        this.showMessage('Usuario Criado!');
      })
      .catch((erro) => {
        console.log(erro);
      });
    }

    }
  public async nextPage(request: Request, response: Response): Promise<void>{
    await fetch('http://localhost:3333/users')
   .then((response) => StatusCodes.ACCEPTED) // 201
   .catch((response) => StatusCodes.GATEWAY_TIMEOUT); //504
  }

  public remove(id: any): void{
    this.userService
      .excluirUsuarios(id);
    this.showMessage("Deletado com sucesso!");
  }
    getUsers() {
    this.userService
      .getAll()
      .then((users: any[]) => {
        this.users = users;
      })
      .catch((erro) => {
        console.log(erro);
      });
      console.log("Usuarios:");
      console.log(this.users);
  }
  
}
