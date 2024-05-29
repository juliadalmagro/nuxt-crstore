<template>
  <!-- <v-container class="justify-center mt-5">
    <TabelaDados v-if="items.length > 0" @editItem="editItem" @abrirDialog="() => ativo = true" titulo="Eventos" :loading="loading" @deleteItem="deleteItem" :headers="headers" :items="items"></TabelaDados>
    <h1 v-else> Sem items</h1>
  </v-container>
  <v-dialog
      v-model="ativo"
      max-width="500"
    >
    <v-card
      height="600"
      width="700"
    >
      <v-card-title>
        <h1>
          {{ tituloDialog }} um Evento
        </h1>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <v-text-field
              variant="outlined"
              label="Id"
              placeholder="Identificador"
              disabled
              v-model="atividade.id"
            >

            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              variant="outlined"
              label="Nome"
              placeholder="Nome"
              v-model="atividade.nome"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              variant="outlined"
              label="dataInicio"
              placeholder="dataInicio"
              v-model="atividade.dataInicio"
            >
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              variant="outlined"
              label="dataFim"
              placeholder="dataFim"
              v-model="atividade.dataFim"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              variant="outlined"
              label="local"
              placeholder="local"
              v-model="atividade.local"
            >
            </v-text-field>
          </v-col>
          <v-col>
            <v-autocomplete
              :items="eventos"
              item-title="nome"
              item-value="id"
              v-model="atividade.idEvento"
            >
            </v-autocomplete>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="green"
          variant="outlined"
          @click="persist"
        >
          Salvar
        </v-btn>
      </v-card-actions>
    </v-card>
    </v-dialog> -->
  <template>
    <v-card
      color="grey-lighten-4"
      height="65px"
      rounded="0"
      flat
      style="border-bottom: 1px solid black;"
    >
      <v-toolbar 
      density="compact"
      color="toolbar"
      style="" >

      <v-btn
      size="small" 
      variant="plain"
      class="text-none">
        Roupas
      </v-btn>

      <v-btn 
      size="small"
      variant="plain">
        New in
      </v-btn>

      <v-btn 
      size="small"
      variant="plain"
      class="text-none">
        Sporty
      </v-btn>

      <v-btn 
      size="small"
      variant="plain"
      class="text-none">
        Acessórios
      </v-btn>

      <v-btn 
      size="small"
      variant="plain"
      class="text-none">
        Moletons La's Club
      </v-btn>

        <v-spacer></v-spacer>

        <v-btn 
        size="small"
        variant="plain"
        class="text-none" >
          Feito no Brasil
        </v-btn>

        <v-btn variant="plain">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn variant="plain">
          <v-icon>mdi-account-outline</v-icon>
        </v-btn>

        <v-btn variant="plain">
          <v-icon>mdi-shopping-outline</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>
  </template>
  <div>
    <v-carousel 
    theme="light"
    height="745px">
  <v-carousel-item
    src="https://cdn.vnda.com.br/lasclothing/2024/05/23/8_5_9_947_3.png?v=1716465220"
    cover
  ></v-carousel-item>

  <v-carousel-item
    src="https://cdn.vnda.com.br/lasclothing/2024/05/23/8_5_8_853_JULIA2.png?v=1716465268"
    cover
  ></v-carousel-item>

  <v-carousel-item
    src="https://cdn.vnda.com.br/lasclothing/2024/05/23/8_5_4_427_JULIA.png?v=1716465369"
    cover
  ></v-carousel-item>
</v-carousel>
  </div>
  <div>
    <v-row
      style="background-color: #eeeceb; border: 1px solid black; color: #636260; height: 80px; align-items: center">
      <v-col>
        <span></span>
        <p> <img src="https://cdn.vnda.com.br/lasclothing/2024/04/09/11_4_7_700_IMG_7330.PNG?v=1712671674" style="height: 31.7167px; width: 31.7167px;"> FRETE GRÁTIS A PARTIR DE R$450,00 EM COMPRAS. </p>
      </v-col>
      <v-col>
        <p> <img src="https://cdn.vnda.com.br/lasclothing/2024/04/09/11_4_7_700_IMG_7330.PNG?v=1712671674" style="height: 31.7167px; width: 31.7167px;"> PRIMEIRA TROCA POR CONTA DA LA'S. </p>
      </v-col>
      <v-col>
        <p> <img src="https://cdn.vnda.com.br/lasclothing/2024/04/09/11_4_7_700_IMG_7330.PNG?v=1712671674" style="height: 31.7167px; width: 31.7167px;"> ENTREGAMOS PARA TODO O BRASIL.</p>
      </v-col>
    </v-row>
  </div>
  <v-row
      style="background-color: #eeeceb; border: 1px solid black; height: 65px;">
      <v-col>
        <p>FRETE GRÁTIS A PARTIR DE R$450,00 EM COMPRAS.</p>
      </v-col>
      <v-col>
        <p>PRIMEIRA TROCA POR CONTA DA LA'S.</p>
      </v-col>
      <v-col>
        <p>ENTREGAMOS PARA TODO O BRASIL.</p>
      </v-col>
    </v-row>

</template>

<script>
// export default {
//   data: () => {
//     return {
//       dialog: false,
//       valor: 0,
//       ativo: false,
//       loading: true,
//       textoUsuario: null,
//       atividade: {
//         id: null,
//         nome: null,
//         dataInicio: null,
//         dataFim: null,
//         local: null,
//         idEvento: null
//       },
//       headers: [
//         {
//           title: 'Identificador',
//           key: 'id'
//         },
//         {
//           title: 'nome',
//           key: 'nome'
//         },
//         {
//           title: 'local',
//           key: 'local'
//         },
//         {
//           title: 'Data de Inicio',
//           key: 'dataInicio'
//         },
//         {
//           title: 'Actions',
//           key: 'actions',
//           sortable: false
//         },
//       ],
//       items: [],
//       eventos: [],
//     }
//   },

//   async created(){
//     await this.getItems();
//     await this.getEventos()
//   },

//   computed: {
//     tituloDialog: function() {
//       return this.atividade.id ? 'Editar': 'Criar';
//     }
//   },

//   watch: {
//     ativo(valor) {
//       if (valor == false) {
//         this.resetAtividade()
//       }
//     }
//   },

//   methods: {
//     resetAtividade() {
//       this.atividade = {
//         id: null,
//         nome: null,
//         dataInicio: null,
//         dataFim: null,
//         local: null,
//         idEvento: null
//       }
//       this.ativo = false;
//     },

//     async persist() {
//       if (this.atividade.id) {
//         const response = await this.$api.post(`/atividade/persist/${this.atividade.id}`, this.atividade);
//       } else {
//         const response = await this.$api.post('/atividade/persist', this.atividade);
//       }
//       this.resetAtividade()
//       await this.getItems();
//     },

//     editItem(item) {
//       this.atividade = {
//         ...item
//       };
//       this.ativo = true;
//     },

//     async deleteItem(item) {
//       if (confirm(`Deseja deletar o registro com id ${item.id}`)) {
//         const response = await this.$api.post('/atividade/destroy'  );
//         if (response.type == 'error') {
//           alert(response.message);
//         }
//       }
//       await this.getItems();
//     },

//     async getEventos() {
//       const response = await this.$api.get('/evento');
//       this.eventos = response.data;
//     },

//     async getItems() {
//       const response = await this.$api.get('/atividade');
//       this.items = response.data;
//       this.loading = false;
//     }
//   }
// }
</script>

<style>
p {
  font-size: 12px;
}
</style>