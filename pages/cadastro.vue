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
        >
          Calças
        </v-btn>

        <v-btn 
          size="small"
          variant="plain"
          class="text-none"
          height="0%"
        >
          Shorts e saias
        </v-btn>

        <v-btn 
          size="small"
          variant="plain"
          class="text-none"
          height="0%"
        >
          Terceiras peças
        </v-btn>

        <v-btn 
          size="small"
          variant="plain"
          class="text-none"
          height="0%"
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
    <p>CONECTE-SE AQUI!</p>
  </div>
     
  <body style="background-color: #eeeceb;">
    <v-container style="margin-top: 20px; position: absolute; left: 8.5%;" >
      <v-row
        justify="center" >
        <v-col
          cols="12"
          md="6">
          <v-card
            height="400"
            width="700"
            theme="light">
            <v-card-title>
              COMPLETE O SEU CADASTRO
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col>
                  <span>Nome Completo:</span>
                  <v-text-field
                    variant="outlined"
                    v-model="user.name"
                  >
                  </v-text-field>
                </v-col>
                <v-col>
                  <span>Nome de Usuário:</span>
                  <v-text-field
                    variant="outlined"
                    v-model="user.username"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <span>Telefone Celular:</span>
                  <v-text-field
                    variant="outlined"
                    v-model="user.phone"
                  >
                  </v-text-field>
                </v-col>
                <v-col>
                  <span>E-mail:</span>
                  <v-text-field
                    variant="outlined"
                    v-model="user.email"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <span>CPF:</span>
                  <v-text-field
                    variant="outlined"
                    v-model="user.cpf"
                  >
                  </v-text-field>
                </v-col>
                <v-col>
                  <span>Função:</span>
                  <v-autocomplete
                    :items="role"
                    item-title="name"
                    item-value="id"
                    v-model="user.role"
                    placeholder="Selecione"
                  >
                  </v-autocomplete>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
          
      <v-row
        justify="center">
        <v-col
          cols="12"
          md="6">
          <v-card
            height="450"
            width="700"
            theme="light">
            <v-card-title>
              ADICONAR ENDEREÇO
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col>
                  <span>CEP:</span>
                  <v-text-field
                    variant="outlined"
                    v-model="adress.zipCode"
                  >
                  </v-text-field>
                  <a href="https://buscacepinter.correios.com.br/app/endereco/index.php" target="_blank" style="color: grey;">Consulte seu CEP</a>
                </v-col>
                <v-col>
                  <span>Estado:</span>
                  <v-text-field
                    variant="outlined"
                    v-model="adress.state"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <span>Cidade:</span>
                  <v-text-field
                    variant="outlined"
                    v-model="adress.city"
                  >
                  </v-text-field>
                </v-col>
                <v-col>
                  <span>Rua:</span>
                  <v-text-field
                    variant="outlined"
                    v-model="adress.street"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <span>Número:</span>
                  <v-text-field
                    variant="outlined"
                    v-model="adress.numberForget"
                  >
                  </v-text-field>
                </v-col>
                <v-col>

                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row
        justify="center">
        <v-col
          cols="12"
          md="6">
          <v-card
            height="250"
            width="700"
            theme="light">
            <v-card-title>
              CADASTRAR SENHA
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col>
                  <span>Digite a sua senha:</span>
                  <v-text-field
                    variant="outlined"  
                    v-model="user.password"
                    :append-icon="show ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="show ? 'text' : 'password'"
                    @click:append="tomaShow"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn
                    color="black"
                    class="text-none"
                    block
                    border
                    @click="cadastrar()">
                    CADASTRAR
                  </v-btn>
                </v-col>
              </v-row>
              <v-row>
               
              </v-row>
            </v-card-text>
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
        role: ['Administrador', 'Usuário'],
        show: true,
        user: {
          name: null,
          username: null,
          phone: null,
          email: null,
          cpf: null,
          password: null,
          role: null,
        },
        adress: {
          zipCode: null,
          state: null,
          city: null,
          street: null,
          district: null,
          numberForget: null,
          idUser: null,
        },
      }
    },
    
    async created() {
      await this.getUser();
      await this.getAdress();
    },
  
    methods: {

      resetUser(){
        this.user = {
          name: null,
            username: null,
            phone: null,
            email: null,
            cpf: null,
            password: null,
            role: null,
        }
      },

      resetAdress(){
        this.adress = {
          zipCode: null,
          state: null,
          city: null,
          street: null,
          district: null,
          numberForget: null,
          idUser: null,
        }
      },

      async getUser() {
      const response = await this.$api.get('/user');
      this.items = response.data;
      },
      
      async createUser() {
        const response = await this.$api.post('/user/persist', this.user);
        this.resetUser();
        await this.getUser();
      },
      
      async getAdress() {
      const response = await this.$api.get('/adress');
      this.items = response.data;
      },
      
      async createAdress() {
        const response = await this.$api.post('/adress/persist', this.adress);
        this.resetAdress();
        await this.getAdress();
      },

      async cadastrar() {
        await this.createAdress();
        await this.createUser();
      },

      mudaIndex(){
        this.$router.push({ path: '/' });
      },

      mudaBlusas(){
        this.$router.push({ path: '/blusas' });
      },

      mudaCalcas(){
        this.$router.push({ path: '/calcas' });
      },

      mudaShorts(){
        this.$router.push({ path: '/shorts' });
      },
      
      mudaTerceiras(){
        this.$router.push({ path: '/terceiras' });
      },

      mudaAcessorios(){
        this.$router.push({ path: '/acessorios' });
      },
      tomaShow(){
        this.show = !this.show
      },
    }
  }
</script>
    
<style>
  p {
    font-size: 18px;
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
    margin-top: 40px;
    margin-bottom: 20px;
  }

</style>