<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-5" role="form" aria-label="Formulário para criação de uma nova tarefa">
                <input 
                    type="text" 
                    class="input" 
                    placeholder="Qual tarefa você deseja iniciar?"
                    v-model="descricao"
                />
            </div>
            <div class="column is-3">
                <div class="select">
                    <select v-model="idProjeto">
                        <option value="">Selecione o projeto</option>
                        <option
                            :value="projeto.id" 
                            v-for="projeto in projetos" 
                            :key="projeto.id"
                        >
                            {{ projeto.nome }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="column">
                <Temporizador @aoTemporizadorFinalizado="finalizarTarefa"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { TipoNotificacao } from "@/interfaces/INotificacao";
import { key } from "@/store";
import { NOTIFICAR } from "@/store/tipo-mutacoes";
import { computed } from "@vue/reactivity";
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import Temporizador from "./Temporizador.vue";

export default defineComponent({
    name: "FormularioTracker",
    emits: ['aoSalvarTarefa'],
    components: {
        Temporizador
    },
    setup(props, { emit }) {
        const store = useStore(key);

        const descricao = ref("");
        const idProjeto = ref("");

        const projetos = computed(() => store.state.projeto.projetos);

        const finalizarTarefa = (tempoDecorrido: number) : void => {
            const projeto = projetos.value.find(proj => proj.id == idProjeto.value);
            if (!projeto) {
                store.commit(NOTIFICAR, {
                titulo: 'Ops!',
                texto: "Selecione um projeto antes de finalizar a tarefa!",
                tipo: TipoNotificacao.FALHA,
                });
                return;
            }

            emit('aoSalvarTarefa', {
                duracaoEmSegundos: tempoDecorrido,
                descricao: descricao.value,
                projeto: projeto
            });

            descricao.value = '';
        }

        return  {
            descricao,
            idProjeto,
            projetos,
            finalizarTarefa
        }
    }
})

</script>

<style>
.formulario {
    color: var(--texto-primario);
    background-color: var(--bg-primario);
}
</style>