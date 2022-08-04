<template>
    <div class="notificacoes">
        <article 
            class="message" 
            :class="contexto[notificacao.tipo]"
            v-for="notificacao in notificacoes" 
            :key="notificacao.id"
        >
            <div class="message-header">
                {{notificacao.titulo}}
            </div>
            <div class="message-body">
                {{notificacao.texto}}
            </div>
        </article>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "@/store";
import { computed } from "@vue/reactivity";
import { TipoNotificacao } from "@/interfaces/INotificacao";

export default defineComponent({
    name: 'NotificacoesTracker',
    data() {
        return {
            contexto: {
                [TipoNotificacao.INFO] : 'is-info',
                [TipoNotificacao.SUCESSO] : 'is-success',
                [TipoNotificacao.FALHA] : 'is-warning',
                [TipoNotificacao.ERRO] : 'is-danger',
            }
        }
    },
    setup() {
        const store = useStore();
        return {
            notificacoes: computed(() => store.state.notificacoes)
        }
    }
})

</script>

<style scoped>
.notificacoes {
    position: absolute;
    right: 0;
    width: 300px;
    padding: 8px;
    z-index: 105;
}
</style>