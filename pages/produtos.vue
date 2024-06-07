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
      class="text-none">
        Produtos
      </v-btn>

      <v-btn 
      size="small"
      variant="plain"
      class="text-none"
      @click="mudaCaregorias">
        Categorias
      </v-btn>

      <v-btn 
      size="small"
      variant="plain"
      class="text-none"
      @click="mudaCupoms">
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
          title="Produtos"
          icon="mdi-star-outline"
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
                    v-model="product.name">
                    </v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                    variant="outlined"
                    label="Preço"
                    placeholder="price"
                    v-model="product.price">
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                    variant="outlined"
                    label="Descrição"
                    placeholder="description"
                    v-model="product.description">
                    </v-text-field>
                  </v-col>
                  <v-col>
                    <v-autocomplete
                      :items="categories"
                      item-title="name"
                      item-value="id"
                      v-model="product.idCategory"
                    >
                    </v-autocomplete>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                    variant="outlined"
                    label="Link Imagem"
                    placeholder="image"
                    v-model="product.image">
                    </v-text-field>
                  </v-col>
                  <v-col>
                    <img
                    :src="product.image"
                    style="max-width: 150px; max-height: 150px"
                    >
                </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-btn 
                  variant="plain" 
                  class="text-none"
                  @click="createItem()">
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
                    v-model="product.name">
                    </v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                    variant="outlined"
                    label="Preço"
                    placeholder="price"
                    v-model="product.price">
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                    variant="outlined"
                    label="Descrição"
                    placeholder="description"
                    v-model="product.description">
                    </v-text-field>
                  </v-col>
                  <v-col>
                    <v-autocomplete
                      :items="categories"
                      item-title="name"
                      item-value="id"
                      v-model="product.idCategory"
                    >
                    </v-autocomplete>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                    variant="outlined"
                    label="Link Imagem"
                    placeholder="image"
                    v-model="product.image">
                    </v-text-field>
                  </v-col>
                  <v-col>
                    <img
                    :src="product.image"
                    style="max-width: 150px; max-height: 150px"
                    >
                </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-btn 
                  variant="plain" 
                  class="text-none"
                  @click="editItem()">
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
        product: {
          name: null,
          price: null,
          image: null,
          description: null,
          idCategory: null
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
            title: 'Preço',
            key: 'price',
          },  
          {
            title: 'Descrição',
            key: 'description',
          },
          {
            title: 'Ações',
            key: 'actions',
            sortable: false
          }
        ],
        items: [],
        categories: [],
      }
    },
  
    async created() {
      await this.getItems();
      await this.getCategories();
    },
  
    watch: {
      ativo(valor) {
        if (valor == false) {
          this.resetProducts()
        }
      },
      ativo2(valor) {
        if (valor == false) {
          this.resetProducts()
        }
      }
    },
  
    methods: {
      resetProducts(){
        this.product = {
          name: null,
          price: null,
          image: null,
          description: null,
          idCategory: null
        }
        this.ativo = false;
        this.ativo2 = false;
      },
  
      async createItem() {
        const response = await this.$api.post('/product/persist', this.product);
        this.resetProducts();
        await this.getItems();
      },
  
      taLigado(item) {
        this.product = {
          ...item
        }
        this.ativo2 = true;
      },
  
      async editItem() {
        const response = await this.$api.post(`/product/persist/${this.product.id}`, this.product);
        this.resetProducts()
        await this.getItems();  
      },
      
      mudaCaregorias(){
          this.$router.push({ path: '/categorias' });
        },

      mudaCupoms(){
        this.$router.push({ path: '/cupoms' });
      },
      
      async getItems() {
        const response = await this.$api.get('/product');
        this.items = response.data;
      },

      async getCategories() {
        const response = await this.$api.get('/category');
        this.categories = response.data;
      },
      
      async deleteItem(item) {
        if (confirm(`Você deseja mesmo deletar o item com id ${item.id}`)) {
          const response = await this.$api.post('/product/destroy', { id: item.id });
          if (response.type == 'error') {
            alert(response.message);
          }
        }
        await this.getItems()
      }  
    },
  }
    
  
  </script>
  
  
  