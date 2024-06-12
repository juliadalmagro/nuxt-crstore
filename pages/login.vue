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
            Shorts & saias
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
      <body style="background-color: #eeeceb;">
        <v-container style="margin-top: 90px;" >
          <v-row
            justify="center" >
            <v-col
              cols="12"
              md="6"
              >
              <v-card
            height="400"
            width="500"
            theme="light">
            <v-card-title>
                JÁ SOU CLIENTE
              </v-card-title>
              <v-card-text>
                <v-row>
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
                    <span>Digite a sua senha:</span>
                    <v-text-field
                    v-model="user.password"
                    variant="outlined"
                    :append-icon="show ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="show ? 'text' : 'password'"
                    @click:append="tomaShow"
                    @keyup.enter="pegaToken"
                    >
                    </v-text-field>
                    <!-- <a href="" style="color: grey;">Esqueci minha senha</a> -->
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-btn
                    color="black"
                    class="text-none"
                    block
                    border
                    @click="pegaToken()">
                      Entrar
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
            </v-col>
            <v-col
              >
              <v-card
            height="200"
            width="500"
            theme="light">
            <v-card-title>
                CRIAR CONTA
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col>
                    <span>Acesse o formulário de cadastro:</span>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-btn
                    color="black"
                    class="text-none"
                    block
                    border
                    @click="mudaCadastro()">
                    CADASTRAR
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <span>Primeira compra? Cadastre-se agora e receba um cupom de 10% OFF</span>
                  </v-col>
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
          show: true,
          user: {
            username: '',
            password: '',
          }
        }
      },
      methods: {
        
        // async login() {
        //   const response = await this.$api.post('/user/login', this.user);
        //   // this.resetUser();
        // },

        async pegaToken() {
          if(this.user.username || this.user.password) {
            try {
              const response = await this.$api.post('/user/login', this.user);
              if(response.token) {
                localStorage.setItem('token', response.token);
                this.$toast.success('Login efetuado com sucesso!');
                this.mudaIndex(); 
              }
            } catch (error) {
              console.error('Erro ao fazer login:', error);
              this.$toast.error('Erro ao fazer login. Por favor, tente novamente.');
            }
          }
        },
        
        mudaIndex(){
          this.$router.push({ path: '/' });
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
        mudaCadastro(){
          this.$router.push({ path: '/cadastro' });
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
      margin-top: 80px;
      margin-bottom: 20px;
    }
  
    </style>