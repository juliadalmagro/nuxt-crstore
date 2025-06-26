<template>
    <v-row
    class="py-3"
    style="background: linear-gradient(90deg, #eceff1 0%, #b0bec5 100%);"
    justify="center"
    align="center"
  >
    <v-col cols="auto">
      <v-btn
        class="mx-1 ml-6 text-none"
        variant="outlined"
        color="#607d8b"
        size="small"
        style="background: white; border-radius: 24px; font-weight: 500; transition: box-shadow 0.2s;"
        elevation="2"
        @mouseover="e => e.currentTarget.style.boxShadow = '0 4px 16px #607d8b22'"
        @mouseleave="e => e.currentTarget.style.boxShadow = ''"
        to="/secretaria/alunos"
        tag="NuxtLink"
      >
        <v-icon left size="20" class="mr-2" color="#607d8b">mdi-account</v-icon>
        Alunos
      </v-btn>
    </v-col>
    <v-col cols="auto">
      <v-btn
        class="mx-1 text-none"
        variant="outlined"
        color="#607d8b"
        size="small"
        style="background: white; border-radius: 24px; font-weight: 500; transition: box-shadow 0.2s;"
        elevation="2"
        @mouseover="e => e.currentTarget.style.boxShadow = '0 4px 16px #607d8b22'"
        @mouseleave="e => e.currentTarget.style.boxShadow = ''"
        to="/secretaria/instrutores"
        tag="NuxtLink"
      >
        <v-icon left size="20" class="mr-2" color="#607d8b">mdi-school</v-icon>
        Instrutores
      </v-btn>
    </v-col>
    <v-col cols="auto">
      <v-btn
        class="mx-1 text-none"
        variant="outlined"
        color="#607d8b"
        size="small"
        style="background: white; border-radius: 24px; font-weight: 500; transition: box-shadow 0.2s;"
        elevation="2"
        @mouseover="e => e.currentTarget.style.boxShadow = '0 4px 16px #607d8b22'"
        @mouseleave="e => e.currentTarget.style.boxShadow = ''"
        to="/secretaria/veiculos"
        tag="NuxtLink"
      >
        <v-icon left size="20" class="mr-2" color="#607d8b">mdi-car</v-icon>
        Veículos
      </v-btn>
    </v-col>
    <v-col cols="auto">
      <v-btn
        class="mx-1 text-none"
        variant="outlined"
        color="#607d8b"
        size="small"
        style="background: white; border-radius: 24px; font-weight: 500; transition: box-shadow 0.2s;"
        elevation="2"
        @mouseover="e => e.currentTarget.style.boxShadow = '0 4px 16px #607d8b22'"
        @mouseleave="e => e.currentTarget.style.boxShadow = ''"
        to="/secretaria/horarios-instrutores"
        tag="NuxtLink"
      >
        <v-icon left size="20" class="mr-2" color="#607d8b">mdi-book</v-icon>
        Horarios - Instrutores
      </v-btn>
    </v-col>
    <v-col cols="auto">
      <v-btn
        class="mx-1 text-none"
        variant="outlined"
        color="#607d8b"
        size="small"
        style="background: white; border-radius: 24px; font-weight: 500; transition: box-shadow 0.2s;"
        elevation="2"
        @mouseover="e => e.currentTarget.style.boxShadow = '0 4px 16px #607d8b22'"
        @mouseleave="e => e.currentTarget.style.boxShadow = ''"
        to="/secretaria/aulas"
        tag="NuxtLink"
      >
        <v-icon left size="20" class="mr-2" color="#607d8b">mdi-book</v-icon>
        Aulas
      </v-btn>
    </v-col>
    <v-spacer />
    <v-col cols="auto">
      <v-btn
        class="mx-1 mr-6 text-none"
        variant="outlined"
        color="#607d8b"
        size="small"
        style="background: white; border-radius: 24px; font-weight: 500; transition: box-shadow 0.2s;"
        elevation="2"
        @mouseover="e => e.currentTarget.style.boxShadow = '0 4px 16px #607d8b22'"
        @mouseleave="e => e.currentTarget.style.boxShadow = ''"
        to="/"
        tag="NuxtLink"
      >
        <v-icon left size="20" class="mr-2" color="#607d8b">mdi-logout</v-icon>
        Sair
      </v-btn>
    </v-col>
  </v-row>
  <v-container class="justify-center mt-5" style="max-width: 900px;">
    <TabelaDados  titulo="Horários - Instrutores" :loading="loading" :headers="headers" :items="items" @edit-item="editItem" @abrir-dialog="() => ativo = true" @delete-item="deleteItem"/>
  </v-container>
  <v-dialog
      v-model="ativo"
      max-width="500"
  >
    <v-card
        height="350"
        width="600"
    >
      <v-card-title>
        <v-row>
          <v-col>
            <h2 style="color: #607d8b;">
              Adicionar um instrutor
            </h2>
          </v-col>
          <v-col class="d-flex justify-end" >
            <v-icon class="mt-4" size="x-large" @click="ativo = false">
              mdi-close
            </v-icon>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <v-autocomplete
              v-model="instrutorHorario.idUsuario"
              :items="instrutores"
              item-title="nomeUsuario"
              item-value="idUsuario"
              label="Instrutor"
              variant="outlined"
            />
          </v-col>
          <v-col>
            <v-autocomplete
              v-model="instrutorHorario.idHorario"
              label="Horário"
              variant="outlined"
              :items="horarios"
              item-title="hora"
              item-value="idHorarioAula"
            />
          </v-col>
        </v-row>
        <v-row>
         <v-col>
            <v-autocomplete
              v-model="instrutorHorario.idDiaSemana"
              label="Dia da Semana"
              variant="outlined"
              :items="dias"
              item-title="diaSemana"
              item-value="idDiaSemana"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn
            color="green"
            variant="outlined"
            :loading="loadingSave"
            @click="persist"
        >
          Salvar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
<!-- 2 dialog -->
  <v-dialog
      v-model="ativoEditar"
      max-width="500"
  >
    <v-card
        height="600"
        width="600"
    >
      <v-card-title>
        <v-row>
          <v-col>
            <h2 style="color: #607d8b;">
              Editar instrutor
            </h2>
          </v-col>
          <v-col class="d-flex justify-end" >
            <v-icon class="mt-4" size="x-large" @click="ativoEditar = false">
              mdi-close
            </v-icon>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <v-text-field
                v-model="instrutorHorario.idUsuario"
                variant="outlined"
                label="Id"
                placeholder="Identificador"
                disabled
            />
          </v-col>
          <v-col>
            <v-text-field
                v-model="usuario.nomeUsuario"
                variant="outlined"
                label="Nome"
                placeholder="Nome"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
                v-model="usuario.cpfUsuario"
                variant="outlined"
                label="Cpf"
                placeholder="Cpf" 
                v-mask="'###.###.###-##'"
            />
          </v-col>
          <v-col>
            <v-text-field
                v-model="usuario.emailUsuario"
                variant="outlined"
                label="Email"
                placeholder="Email"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
                v-model="usuario.senhaUsuario"
                variant="outlined"
                label="Senha"
                placeholder="Senha"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn
            color="green"
            variant="outlined"
            :loading="loadingSave"
            @click="persist"
        >
          Salvar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
definePageMeta({
  layout: "secretaria-instrutor"
})

export default {
  data: () => {
    return {
      dialog: false,
      tituloDialog: '',
      valor: 0,
      ativo: false,
      ativoEditar: false,
      loading: true,
      textoUsuario: null,
      loadingSave: false,
      horarios: [],
      dias: [],
      instrutores: [],
      instrutorHorario: {
        idInstrutorHorario: null,
        idUsuario: null,
        idDiaSemana: null,
        idHorario: null,
      },
      headers: [
        {
          title: 'Nome',
          key: 'nomeUsuario'
        },
        {
          title: 'Cpf',
          key: 'cpfUsuario'
        },
        {
          title: 'Dia da Semana',
          key: 'diaSemana'
        },
        {
          title: 'Horário',
          key: 'hora'
        },
        {
          title: 'Actions',
          key: 'actions',
          sortable: false
        },
      ],
      items: [],
    }
  },

  watch: {
    ativo(valor) {
      if (valor == false) {
        this.resetAtividade()
      }
    }
  },

  async created(){
    await this.getItems();
    await this.getInstrutor();
    await this.getHorario();
    await this.getDia();
  },

  methods: {
    resetAtividade() {
      this.instrutorHorario = {
        idInstrutorHorario: null,
        idUsuario: null,
        idDia: null,
        idHorario: null,
      }
      this.ativo = false;
      this.ativoEditar = false;
    },

    async persist() {
      await this.getInstrutor();
      try {
        this.loadingSave = true;
        if (this.instrutorHorario.idInstrutorHorario) {
          const response = await this.$api.post(`/usuario/persist/${this.instrutorHorario.idInstrutorHorario}`, this.instrutorHorario);
        } else {
          const response = await this.$api.post('/instrutor-horarios/persist', this.instrutorHorario);
        }
        this.$toast.success(`instrutor ${this.instrutorHorario.idInstrutorHorario ? 'editado' : 'criado'} com sucesso!`);
      } catch (e) {
        this.$toast.error(`Erro ao ${this.instrutorHorario.idInstrutorHorario ? 'editar' : 'criar'} instrutor!`);
      }
      this.resetAtividade()
      await this.getItems();
      this.loadingSave = false;
    },

    editItem(item) {
      this.instrutorHorario = {
        ...item
      };
      this.getDia();
      this.getInstrutor();
      this.ativoEditar = true;
    },

    async deleteItem(item) {
      try {
        if (confirm(`Deseja deletar o instrutor ${item.nomeUsuario}?`)) {
          const response = await this.$api.delete(`/usuario/destroy/${item.idUsuario}`);
          this.$toast.success('Excluido com sucesso')
        }
      } catch (e) {
        this.$toast.error('Erro ao excluir um instrutor!')
      }
      await this.getItems();
    },

    async getHorario() {
      const response = await this.$api.get('/horario-aula');
      this.horarios = response.data;
      this.loading = false;
    },

    async getDia() {
      const response = await this.$api.get('/dias-semana');
      this.dias = response.data;
      this.loading = false;
    },

    async getInstrutor() {
      const response = await this.$api.get('/usuario/instrutor');
      this.instrutores = response.data;
      console.log(this.instrutores, 'instrutores');
      this.loading = false;
    },

    async getItems() {
      const response = await this.$api.get('/instrutor-horarios-tudo');
      this.items = response.data;
      console.log(this.items);
      this.loading = false;
    },
  }
}
</script>