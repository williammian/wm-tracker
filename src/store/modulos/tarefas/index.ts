import http from "@/http";
import ITarefa from "@/interfaces/ITarefa";
import { Estado } from "@/store";
import { OBTER_TAREFAS, CADASTRAR_TAREFA, ALTERAR_TAREFA } from "@/store/tipo-acoes";
import { ADICIONA_TAREFA, ALTERA_TAREFA, REMOVE_TAREFA, DEFINIR_TAREFAS } from "@/store/tipo-mutacoes";
import { Module } from "vuex";

export interface EstadoTarefa {
    tarefas: ITarefa[];
}

export const tarefa: Module<EstadoTarefa, Estado> = {
    state: {
        tarefas: [],
    },

    mutations: {
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
    }
}