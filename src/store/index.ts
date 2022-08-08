import { EstadoProjeto, projeto } from './modulos/projeto/index';
import { OBTER_TAREFAS, CADASTRAR_TAREFA, ALTERAR_TAREFA } from './tipo-acoes';
import { INotificacao } from './../interfaces/INotificacao';
import ITarefa from "@/interfaces/ITarefa";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { ADICIONA_TAREFA, ALTERA_TAREFA, DEFINIR_TAREFAS, NOTIFICAR, REMOVE_TAREFA } from "./tipo-mutacoes";
import http from "@/http"

export interface Estado {
    tarefas: ITarefa[],
    notificacoes: INotificacao[],
    projeto: EstadoProjeto
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
    state: {
        tarefas: [],
        notificacoes: [],
        projeto: {
            projetos: []
        }
    },

    mutations: {
        //Tarefa
        [ADICIONA_TAREFA](state, tarefa: ITarefa) {
            //tarefa.id = new Date().toISOString();
            state.tarefas.push(tarefa);
        },
        [ALTERA_TAREFA](state, tarefa: ITarefa) {
            const indice = state.tarefas.findIndex(p => p.id == tarefa.id);
            state.tarefas[indice] = tarefa;
        },
        [REMOVE_TAREFA](state, id: string) {
            state.tarefas = state.tarefas.filter(p => p.id != id);
        },

        [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
            state.tarefas = tarefas;
        },

        //Notificacao
        [NOTIFICAR](state, novaNotificacao: INotificacao) {
            novaNotificacao.id = new Date().getTime();
            state.notificacoes.push(novaNotificacao);

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id);
            }, 3000);
        }
    },

    actions: {
        //Tarefas
        [OBTER_TAREFAS]({ commit }) {
            http.get('tarefas')
                .then(resposta => commit(DEFINIR_TAREFAS, resposta.data))
        },
        [CADASTRAR_TAREFA]({ commit }, tarefa: ITarefa) {
            return http.post('tarefas', tarefa)
                .then(resposta => commit(ADICIONA_TAREFA, resposta.data))
        },
        [ALTERAR_TAREFA]({ commit }, tarefa: ITarefa) {
            return http.put(`tarefas/${tarefa.id}`, tarefa)
                .then(() => commit(ALTERA_TAREFA, tarefa))
        },
    },

    modules: {
        projeto
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key);
}