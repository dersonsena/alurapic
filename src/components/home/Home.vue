<template>
  <div class="corpo">
    <h1 class="centralizado">{{ titulo }}</h1>
    <input type="text" @input="filtro = $event.target.value" class="filtro" placeholder="Filtre por parte do titulo...">

    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto of fotosComFiltro" :key="foto._id">
        <meu-painel :titulo="foto.titulo">
          <imagem-responsiva :url="foto.url" :titulo="foto.titulo" />
          <meu-botao
            tipo="button"
            rotulo="Remover"
            @botaoAtivado="remover(foto)"
            :confirmacao="true"
            estilo="perigo" />
        </meu-painel>
      </li>
    </ul>
  </div>
</template>

<script>
import Painel from '../shared/painel/Painel.vue';
import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva';
import Botao from '../shared/botao/Botao.vue';

export default {
  components: {
    'meu-painel': Painel,
    'imagem-responsiva': ImagemResponsiva,
    'meu-botao': Botao
  },
  data() {
    return {
      filtro: '',
      titulo: 'Alura PIC',
      fotos: []
    }
  },
  created() {
    this.$http.get('http://localhost:3000/v1/fotos')
      .then(response => response.json())
      .then(fotos => this.fotos = fotos, error => console.error(error));
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
      alert('Remover a foto!' + foto.titulo);
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
