<template>
    <div class="column is-three-quarter conteudo">
      <Formulario @aoSalvarTarefa="salvarTarefa"/>
      <div class="lista">
        <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa"/>
        <Box v-if="listaEstaVazia">
          Você não está muito produtivo hoje :(
        </Box>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Formulario from '../components/Formulario.vue';
import Tarefa from '../components/Tarefa.vue';
import ITarefa from '../interfaces/ITarefa';
import Box from '../components/Box.vue';
import { useStore } from "@/store";
import { computed } from "@vue/reactivity";
import { ADICIONA_TAREFA } from '@/store/tipo-mutacoes';

export default defineComponent({
    name: "App",
    components: {
        Formulario,
        Tarefa,
        Box
    },
    computed: {
      listaEstaVazia() : boolean {
        return this.tarefas.length == 0;
      }
    },
    methods: {
      salvarTarefa(tarefa: ITarefa) {
        this.store.commit(ADICIONA_TAREFA, tarefa);
      }
    },
    setup() {
        const store = useStore();
        return {
            tarefas: computed(() => store.state.tarefas),
            store
        }
    }
});
</script>
