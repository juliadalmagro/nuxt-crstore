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
      @click="$router.push('/aluno/aulas')"
    >
      <v-icon left size="20" class="mr-2" color="#607d8b">mdi-account</v-icon>
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
    <TabelaDados  titulo="Aulas" :loading="loading" :headers="headers" :items="items" @edit-item="editItem" @abrir-dialog="() => ativo = true" @delete-item="deleteItem"/>
  </v-container>
  <v-dialog
  v-model="ativo"
  max-width="600"
  >
    <v-card height="650" width="600">
      <v-card-title>
        <v-row>
          <v-col>
            <h2 style="color: #607d8b;">Novo Agendamento</h2>
          </v-col>
          <v-col class="d-flex justify-end">
            <v-icon class="mt-4" size="x-large" @click="ativo = false">
              mdi-close
            </v-icon>
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col>
            <v-select
              v-model="agendamento.idAluno"
              :items="alunos"
              item-title="nomeUsuario"
              item-value="idUsuario"
              label="Aluno"
              variant="outlined"
              disabled
            />
          </v-col>
          <v-col>
            <v-select
              v-model="agendamento.idInstrutor"
              :items="instrutores"
              item-title="nomeUsuario"
              item-value="idUsuario"
              label="Instrutor"
              variant="outlined"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-select
              v-model="agendamento.idVeiculo"
              :items="veiculos"
              item-title="modeloVeiculo"
              item-value="idVeiculo"
              label="Veículo"
              variant="outlined"
            />
          </v-col>
          <v-col>
            <v-select
              v-model="agendamento.idHorario"
              :items="horarios"
              item-title="hora"
              item-value="idHorarioAula"
              label="Horário"
              variant="outlined"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field
              v-model="agendamento.data"
              type="date"
              label="Data"
              variant="outlined"
            />
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
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

  <v-dialog
  v-model="ativo2"
  max-width="600"
  >
    <v-card height="650" width="600">
      <v-card-title>
        <v-row>
          <v-col>
            <h2 style="color: #607d8b;">Novo Agendamento</h2>
          </v-col>
          <v-col class="d-flex justify-end">
            <v-icon class="mt-4" size="x-large" @click="ativo2 = false">
              mdi-close
            </v-icon>
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col>
            <v-select
              v-model="agendamento.idAluno"
              :items="alunos"
              item-title="nomeUsuario"
              item-value="idUsuario"
              label="Aluno"
              variant="outlined"
              disabled
            />
          </v-col>
          <v-col>
            <v-select
              v-model="agendamento.idInstrutor"
              :items="instrutores"
              item-title="nomeUsuario"
              item-value="idUsuario"
              label="Instrutor"
              variant="outlined"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-select
              v-model="agendamento.idVeiculo"
              :items="veiculos"
              item-title="modeloVeiculo"
              item-value="idVeiculo"
              label="Veículo"
              variant="outlined"
            />
          </v-col>
          <v-col>
            <v-select
              v-model="agendamento.idHorario"
              :items="horarios"
              item-title="hora"
              item-value="idHorarioAula"
              label="Horário"
              variant="outlined"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field
              v-model="agendamento.data"
              type="date"
              label="Data"
              variant="outlined"
            />
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
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
export default {
  data: () => ({
    ativo: false,
    ativo2: false,
    loading: true,
    loadingSave: false,
    agendamento: {
      idAgendamento: null,
      idAluno: 7,
      idInstrutor: null,
      idVeiculo: null,
      idHorario: null,
      idStatus: null,
      data: null,
    },
    items: [],
    alunos: [],
    instrutores: [],
    veiculos: [],
    horarios: [],
    statusList: [],
    headers: [
      { title: 'Aluno', key: 'nomeAluno' },
      { title: 'Instrutor', key: 'nomeInstrutor' },
      { title: 'Veículo', key: 'modeloVeiculo' },
      { title: 'Horário', key: 'horario' },
      { title: 'Data', key: 'data' },
      { title: 'Ações', key: 'actions', sortable: false },
    ],
  }),
  async created() {
    await this.getItems();
    await this.getAlunos();
    await this.getInstrutores();
    await this.getVeiculos();
    await this.getHorarios(); 
    
  },
  methods: {
    abrirDialogNovo() {
      this.agendamento = {
        idAgendamento: null,
        idAluno: 7,
        idInstrutor: null,
        idVeiculo: null,
        idHorario: null,
        idStatus: null,
        data: null,
      };
      this.ativo = true;
    },
    async persist() {
      this.loadingSave = true;
      try {
        if (this.agendamento.idAgendamento) {
          await this.$api.post(`/agendamento/persist/${this.agendamento.idAgendamento}`, this.agendamento);
        } else {
          console.log(this.agendamento, 'agendamento para salvar');
          await this.$api.post('/agendamento/persist', this.agendamento);
        }
        this.$toast.success('Agendamento salvo com sucesso!');
        this.ativo = false;
        this.ativo2 = false;
        this.agendamento = {
          idAgendamento: null,
          idAluno: 7,
          idInstrutor: null,
          idVeiculo: null,
          idHorario: null,
          idStatus: null,
          data: null,
        };
        await this.getItems();
      } catch (e) {
        this.$toast.error('Erro ao salvar agendamento!');
      }
      this.loadingSave = false;
    },
    async deleteItem(item) {
      if (confirm('Deseja excluir este agendamento?')) {
        await this.$api.delete(`/agendamento/destroy/${item.idAgendamento}`);
        await this.getItems();
      }
    },
    editItem(item) {
      this.agendamento = { ...item };
      this.ativo2 = true;
    },
    async getItems() {
      this.loading = true;
      try {
        const response = await this.$api.get('/agendamento/aluno/7');
        this.items = response.data;
      } catch (e) {
        this.$toast.error('Erro ao carregar agendamentos.');
      }
      this.loading = false;
    },
    async getAlunos() {
      try {
        const response = await this.$api.get('/usuario/aluno');
        this.alunos = response.data;
      } catch (e) {
        this.$toast.error('Erro ao carregar alunos.');
      }
    },
    async getInstrutores() {
      try {
        const response = await this.$api.get('/usuario/instrutor');
        this.instrutores = response.data;
      } catch (e) {
        this.$toast.error('Erro ao carregar instrutores.');
      }
    },
    async getVeiculos() {
      try {
        const response = await this.$api.get('/veiculo');
        this.veiculos = response.data;
      } catch (e) {
        this.$toast.error('Erro ao carregar veículos.');
      }
    },
    async getHorarios() {
      try {
        const response = await this.$api.get('/horario-aula');
        this.horarios = response.data;
      } catch (e) {
        this.$toast.error('Erro ao carregar horários.');
      }
    },
  }
}
</script>