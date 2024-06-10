<template>
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
          class="text-none"
          @click="mudaProdutos()">
            Produtos
          </v-btn>
    
          <v-btn 
          size="small"
          variant="plain"
          class="text-none"
          @click="mudaCategorias()">
            Categorias
          </v-btn>
    
          <v-btn 
          size="small"
          variant="plain"
          class="text-none">
            Cupoms
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
    <template>
      <v-app>
        <v-container>
          <TabelaComponent
            title="Categorias"
            :items="items"
            :headers="headers"
            @abrirDialog="() => ativo = true"
            @taLigado="taLigado"
            @deleteItem="deleteItem"
            />
            <v-dialog
              v-model="ativo"
              max-width="500"
            >
              <v-card
              height="320"
              width="400"
              theme="light">
              <v-card-title>
                  Criar um novo item
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col>
                      <v-text-field
                      variant="outlined"
                      label="Código"
                      placeholder="code"
                      v-model="cupom.code">
                      </v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field
                      variant="outlined"
                      label="Tipo"
                      placeholder="type"
                      v-model="cupom.type">
                      </v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                      variant="outlined"
                      label="Valor"
                      placeholder="value"
                      v-model="cupom.value">
                      </v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field
                      variant="outlined"
                      label="Quantidade"
                      placeholder="uses"
                      v-model="cupom.uses">
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-btn 
                    variant="plain" 
                    class="text-none"
                    @click="createCupoms()">
                      Criar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog
              v-model="ativo2"
              max-width="500"
              >
              <v-card
              height="320"
              width="400"
              theme="light">
              <v-card-title>
                  Editar item
                </v-card-title>
                <v-card-text>
                    <v-row>
                    <v-col>
                      <v-text-field
                      variant="outlined"
                      label="Código"
                      placeholder="code"
                      v-model="cupom.code">
                      </v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field
                      variant="outlined"
                      label="Tipo"
                      placeholder="type"
                      v-model="cupom.type">
                      </v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                      variant="outlined"
                      label="Valor"
                      placeholder="value"
                      v-model="cupom.value">
                      </v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field
                      variant="outlined"
                      label="Quantidade"
                      placeholder="uses"
                      v-model="cupom.uses">
                      </v-text-field>
                    </v-col>
                  </v-row>   
                </v-card-text>
                <v-card-actions>
                  <v-btn 
                    variant="plain" 
                    class="text-none"
                    @click="editCupoms()">
                      Editar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-container>
        </v-app>
      </template>
    </template>
    
    <script>
    
    export default { 
      data: () => {
        return {
          ativo: false,
          ativo2: false,
          search: '',
          page: 1,
          itemsPerPage: 5,
          cupom: {
            code: null,
            type: null,
            value: null,
            uses: null,

          },
          headers: [
            {
              title: 'Código',
              key: 'code',
            },
            {
              title: 'Tipo',
              key: 'type',
            },
            {
              title: 'Valor',
              key: 'value',
            },
            {
              title: 'Quantidade',
              key: 'uses',
            },
            {
              title: 'Ações',
              key: 'actions',
              sortable: false
            }
          ],
          items: [],
        }
      },
    
      async created() {
        await this.getCupoms();
      },
    
      watch: {
        ativo(valor) {
          if (valor == false) {
            this.resetCupoms()
          }
        },
        ativo2(valor) {
          if (valor == false) {
            this.resetCupoms()
          }
        }
      },
    
      methods: {
        resetCupoms(){
          this.cupom = {
            code: null,
            type: null,
            value: null,
            uses: null,
          }
          this.ativo = false;
          this.ativo2 = false;
        },
    
        async createCupoms() {
          const response = await this.$api.post('/cupom/persist', this.cupom);
          this.resetCupoms();
          await this.getCupoms();
        },
    
        taLigado(item) {
          this.cupom = {
            ...item
          }
          this.ativo2 = true;
        },
    
        async editCupoms() {
          const response = await this.$api.post(`/cupom/persist/${this.cupom.id}`, this.cupom);
          this.resetCupoms()
          await this.getCupoms();  
        },
        
        mudaProdutos(){
          this.$router.push({ path: '/produtos' });
        },

        mudaCategorias(){
          this.$router.push({ path: '/categorias' });
        },
        
        async getCupoms() {
          const response = await this.$api.get('/cupom');
          this.items = response.data;
        },
        
        async deleteItem(item) {
          if (confirm(`Você deseja mesmo deletar o item com id ${item.id}`)) {
            const response = await this.$api.post('/cupom/destroy', { id: item.id });
            if (response.type == 'error') {
              alert(response.message);
            }
          }
          await this.getCupoms()
        }  
      },
    }
      
    
    </script>
    
    
    