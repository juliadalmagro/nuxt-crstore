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
          style="position: relative;"
        >
    
          <v-btn
            size="small" 
            variant="plain"
            class="text-none"
            height="0%"
            @click="mudaBlusas()"
          >
            Blusas & tops
          </v-btn>
  
          <v-btn 
            size="small"
            variant="plain"
            height="0%"
            class="text-none"
            @click="mudaCalcas()"
          >
            Calças
          </v-btn>
  
          <v-btn 
            size="small"
            variant="plain"
            class="text-none"
            height="0%"
            @click="mudaShorts()"
          >
            Shorts & saias
          </v-btn>
  
          <v-btn 
            size="small"
            variant="plain"
            class="text-none"
            height="0%"
            @click="mudaTerceiras()"
          >
            Terceiras peças
          </v-btn>
  
          <v-btn 
            size="small"
            variant="plain"
            class="text-none"
            height="0%"
            @click="mudaAcessorios()"
          >
            Acessórios
          </v-btn>
    
          <v-btn 
            size="small"
            variant="plain"
            style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)"
            @click="mudaIndex()"
          >
            <img src="https://cdn.vnda.com.br/lasclothing/2024/03/08/10_3_9_926_logolasclothing.svg?v=1709905121" style="height: 36.25px; width: 66.15px;">
          </v-btn>
            
            <v-spacer></v-spacer>
            
          <v-btn 
            size="small"
            variant="plain"
            class="text-none"
            height="0%"
          >
            Feito no Brasil
          </v-btn>
          
          <v-btn 
            variant="plain"
            height="0%"
          >
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
          
          <v-btn 
            variant="plain"
            height="0%"
            @click="mudaLogin()"
          >
            <v-icon>mdi-account-outline</v-icon>
          </v-btn>
          
          <v-btn 
            variant="plain"
            height="0%"
          >
            <v-icon>mdi-shopping-outline</v-icon>
          </v-btn>
        </v-toolbar>
      </v-card>
    </template>
      <div class="text">  
        <p>TERCEIRAS PEÇAS</p>
      </div>
      <body style="background-color: #eeeceb;">
        <v-container>
          <v-row 
            justify="center"
          >
            <v-col
              v-for="(dado, i) in items"
              :key="i"
              cols="12"
              md="3"
            >
              <v-card
                class="mx-auto"
                max-width="344"
              >
                <v-img
                  height="400px"
                  :src="dado.image"
                  cover
                ></v-img>
  
                <v-card-subtitle>
                  {{ dado.name }}
                </v-card-subtitle>
  
                <v-card-subtitle>
                  R$ {{ dado.price }}
                </v-card-subtitle>
  
                <v-card-actions>
                  <v-btn
                    color="#636260"
                    text="Comprar"
                    block
                    border
                  ></v-btn>
  
                  <v-spacer></v-spacer>
  
                </v-card-actions>
  
              </v-card>
            </v-col>
          </v-row>
        </v-container>    
      </body>  
  </template>
    
    <script>
    export default {
      data: () => {
        return {
          items: [],
          show: false,
        }
      },
      
      async created() {
        await this.getProdutos();
      },
    
      methods: {
  
        async getProdutos() {
            const response = await this.$api.get(`/product/por-categoria/4`);
            this.items = response.data;
          },
  
        mudaIndex(){
          this.$router.push({ path: '/' });
        },
        mudaBlusas(){
          this.$router.push({ path: '/blusas' });
        },
        mudaShorts(){
          this.$router.push({ path: '/shorts' });
        },
        mudaCalcas(){
          this.$router.push({ path: '/calcas' });
        },
        mudaTerceiras(){
          this.$router.push({ path: '/terceiras' });
        },
        mudaAcessorios(){
          this.$router.push({ path: '/acessorios' });
        },
      }
    }
    </script>
    
    <style>
    p {
      font-size: 16px;
      color: #636260;
    }
  
    .text{
      align-items: center;
      bottom: 0;
      display: flex;
      justify-content: center;
      left: 5%;
      margin: auto;
      right: 5%;
      text-align: center;
      top: 0;
      margin-top: 20px;
      margin-bottom: 20px;
    }
  
    </style>