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
        class="text-none">
        
      </v-btn>
      
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
        class="text-none">
          Categorias
        </v-btn>
  
        <v-btn 
        size="small"
        variant="plain"
        class="text-none"
        @click="mudaCupoms()">
          Cupoms
        </v-btn>
  
        <!-- <v-btn 
        size="small"
        variant="plain"
        class="text-none">
          Moletons La's Club
        </v-btn> -->
        
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
                      label="Nome"
                      placeholder="name"
                      v-model="category.name">
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-btn 
                    variant="plain" 
                    class="text-none"
                    @click="createCategories()">
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
                      label="Nome"
                      placeholder="name"
                      v-model="category.name">
                    </v-text-field>
                  </v-col>
                  </v-row>   
                </v-card-text>
                <v-card-actions>
                  <v-btn 
                    variant="plain" 
                    class="text-none"
                    @click="editCategories()">
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
          category: {
            name: null,
          },
          headers: [
            {
              title: 'Id',
              key: 'id',
            },
            {
              title: 'Nome',
              key: 'name',
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
        await this.getCategories();
      },
    
      watch: {
        ativo(valor) {
          if (valor == false) {
            this.resetCategories()
          }
        },
        ativo2(valor) {
          if (valor == false) {
            this.resetCategories()
          }
        }
      },
    
      methods: {
        resetCategories(){
          this.category = {
            name: null,
          }
          this.ativo = false;
          this.ativo2 = false;
        },
    
        async createCategories() {
          const response = await this.$api.post('/category/persist', this.category);
          this.resetCategories();
          await this.getCategories();
        },
    
        taLigado(item) {
          this.category = {
            ...item
          }
          this.ativo2 = true;
        },
    
        async editCategories() {
          const response = await this.$api.post(`/category/persist/${this.category.id}`, this.category);
          this.resetCategories()
          await this.getCategories();  
        },
        
        mudaProdutos(){
          this.$router.push({ path: '/produtos' });
        },

        mudaCupoms(){
          this.$router.push({ path: '/cupoms' });
        },
        
        async getCategories() {
          const response = await this.$api.get('/category');
          this.items = response.data;
        },
        
        async deleteItem(item) {
          if (confirm(`Você deseja mesmo deletar o item com id ${item.id}`)) {
            const response = await this.$api.post('/category/destroy', { id: item.id });
            if (response.type == 'error') {
              alert(response.message);
            }
          }
          await this.getCategories()
        }  
      },
    }
      
    
    </script>
    
    
    