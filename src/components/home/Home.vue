<template>
  <div class="corpo">
    <h1 class="centralizado">{{ titulo }}</h1>
    <p class="centralizado" v-show="mensagem.length > 0">
      {{ mensagem }}
    </p>

    <input type="text" @input="filtro = $event.target.value" class="filtro" placeholder="Filtre por parte do titulo...">

    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto of fotosComFiltro" :key="foto._id">
        <meu-painel :titulo="foto.titulo">
          <imagem-responsiva v-meu-transform.animate="90" :url="foto.url" :titulo="foto.titulo" />
          <meu-botao
            tipo="button"
            rotulo="Remover"
            @botaoAtivado="remover(foto)"
            :confirmacao="true"
            estilo="perigo" />

          <router-link :to="{ name: 'alterar', params: { id: foto._id } }">
            <meu-botao tipo="button" rotulo="Alterar"/>
          </router-link>
        </meu-painel>
      </li>
    </ul>
  </div>
</template>

<script>
import Painel from '../shared/painel/Painel.vue';
import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva';
import Botao from '../shared/botao/Botao.vue';
import Transform from '../../directives/Transform';
import FotoService from '../../domain/foto/FotoService';

export default {
  components: {
    'meu-painel': Painel,
    'imagem-responsiva': ImagemResponsiva,
    'meu-botao': Botao
  },
  directives: {
    'meu-transform': Transform
  },
  data() {
    return {
      filtro: '',
      titulo: 'Alura PIC',
      mensagem: '',
      fotos: []
    }
  },
  created() {
    this.service = new FotoService(this.$resource);

    this.service
      .listar()
      .then(fotos => this.fotos = fotos, error => this.mensagem = error.message);
  },
  computed: {
    fotosComFiltro() {
      if (this.filtro) {
        let exp = new RegExp(this.filtro.trim(), 'i');
        return this.fotos.filter(foto => exp.test(foto.titulo));
      }

      return this.fotos;
    }
  },
  methods: {
    remover(foto) {
      this.service
        .apagar(foto._id)
        .then(() => {
          const indice = this.fotos.indexOf(foto);
          this.fotos.splice(indice, 1);

          this.mensagem = 'Foto removida com sucesso!';
        }, error => this.mensagem = this.error.message );
    }
  }
}
</script>

<style>
  .corpo {
    font-family: Arial, Helvetica, sans-serif;
    width: 96%;
    margin: 0 auto;
  }

  .centralizado {
    text-align: center;
  }

  .lista-fotos {
    list-style: none;
  }

  .lista-fotos .lista-fotos-item {
    display: inline-block;
  }

  .filtro {
    display: block;
    width: 100%;
    padding: 10px;
    font-size: 15px;
  }
</style>
