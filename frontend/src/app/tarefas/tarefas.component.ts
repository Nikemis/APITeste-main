import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tarefa } from '../tarefa';
import { Router } from '@angular/router';

@Component({
    standalone: false,
    selector: 'app-tarefas',
    templateUrl: './tarefas.component.html',
})
export class TarefasComponent implements OnInit {
    tarefas: Tarefa[] = [];
    tarefasUrl = 'http://localhost:3000/api/tarefas';

    constructor(private http: HttpClient, private router: Router) { }

    ngOnInit(): void {
        if (!localStorage.getItem('token')) this.router.navigate(['login']);

        this.READ_tarefas();
    }

    CREATE_tarefa(descricaoNovaTarefa: string) {
        const token = localStorage.getItem('token') ?? '';
        const headers = new HttpHeaders().set("id-token", token);

        var novaTarefa = new Tarefa(descricaoNovaTarefa, false);
        this.http.post<Tarefa>(this.tarefasUrl, novaTarefa, { headers }).subscribe(
            resultado => { console.log(resultado); this.READ_tarefas(); });
    }

    READ_tarefas() {
        const token = localStorage.getItem('token') ?? '';
        const headers = new HttpHeaders().set("id-token", token);
        
        this.http.get<Tarefa[]>(this.tarefasUrl, { headers }).subscribe(
            (resultado) => { this.tarefas = resultado; },
        )
    }

    DELETE_tarefa(tarefaAserRemovida: Tarefa) {
        const token = localStorage.getItem('token') ?? '';
        const headers = new HttpHeaders().set("id-token", token);

        var indice = this.tarefas.indexOf(tarefaAserRemovida);
        var id = this.tarefas[indice]._id;
        this.http.delete<Tarefa>(`${this.tarefasUrl}/${id}`, { headers }).subscribe(
            resultado => { this.READ_tarefas(); });
    }

    UPDATE_tarefa(tarefaAserModificada: Tarefa) {
        const token = localStorage.getItem('token') ?? '';
        const headers = new HttpHeaders().set("id-token", token);

        var indice = this.tarefas.indexOf(tarefaAserModificada);
        var id = this.tarefas[indice]._id;
        this.http.put<Tarefa>(`${this.tarefasUrl}/${id}`,
            tarefaAserModificada, { headers }).subscribe(
                resultado => { this.READ_tarefas(); });
    }
}