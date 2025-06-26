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
      @click="$router.push('/secretaria/alunos')"
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
      @click="$router.push('/secretaria/instrutores')"
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
      @click="$router.push('/secretaria/veiculos')"
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
      @click="$router.push('/')"
    >
      <v-icon left size="20" class="mr-2" color="#607d8b">mdi-logout</v-icon>
      Sair
    </v-btn>
  </v-col>
</v-row>
  <v-container class="justify-center mt-5" style="max-width: 900px;">
    <TabelaDados  titulo="Alunos" :loading="loading" :headers="headers" :items="items" @edit-item="editItem" @abrir-dialog="() => ativo = true" @delete-item="deleteItem"/>
  </v-container>
  <v-dialog
      v-model="ativo"
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
              Adicionar um aluno
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
            <v-text-field
                v-model="usuario.idUsuario"
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
              Editar aluno
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
                v-model="usuario.idUsuario"
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
  layout: "secretaria"
})

export default {
  data: () => {
    return {
      dialog: false,
      tituloDialog: '',
      titulo: 'Alunos',
      valor: 0,
      ativo: false,
      ativoEditar: false,
      loading: true,
      textoUsuario: null,
      loadingSave: false,
      usuario: {
        idUsuario: null,
        nomeUsuario: null,
        cpfUsuario: null,
        emailUsuario: null,
        senhaUsuario: null,
        usuarioTipoUsuario: 1,
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
          title: 'Email',
          key: 'emailUsuario'
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
  },

  methods: {
    resetAtividade() {
      this.usuario = {
        idUsuario: null,
        nomeUsuario: null,
        cpfUsuario: null,
        emailUsuario: null,
        senhaUsuario: null,
        usuarioTipoUsuario: 1,
      }
      this.ativo = false;
      this.ativoEditar = false;
    },

    async persist() {
      try {
        this.loadingSave = true;
        if (this.usuario.idUsuario) {
          const response = await this.$api.post(`/usuario/persist/${this.usuario.idUsuario}`, this.usuario);
        } else {
          const response = await this.$api.post('/usuario/persist', this.usuario);
        }
        this.$toast.success(`Aluno ${this.usuario.idUsuario ? 'editado' : 'criado'} com sucesso!`);
      } catch (e) {
        this.$toast.error(`Erro ao ${this.usuario.idUsuario ? 'editar' : 'criar'} aluno!`);
      }
      this.resetAtividade()
      await this.getItems();
      this.loadingSave = false;
    },

    editItem(item) {
      this.usuario = {
        ...item
      };
      this.ativoEditar = true;
    },

    async deleteItem(item) {
      try {
        if (confirm(`Deseja deletar o aluno ${item.nomeUsuario}?`)) {
          const response = await this.$api.delete(`/usuario/destroy/${item.idUsuario}`  );
          this.$toast.success('Excluido com sucesso')
        }
      } catch (e) {
        this.$toast.error('Erro ao excluir um produto!')
      }
      await this.getItems();
    },

    async getItems() {
      const response = await this.$api.get('/usuario/aluno');
      this.items = response.data;
      this.loading = false;
    }
  }
}
</script>