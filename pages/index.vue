<template>
  <v-form style="background-color: #faf9f7;">
    <v-container style="background-color: #faf9f7;">
      <v-row>
      <v-col cols="5" class="d-flex flex-column justify-center align-center" style="padding-left: 10%;">
        <div>
          <img
            src="../public/logo_vroom.jpg"
            alt="Logo"
            width="400"
            height="400"
            class="mb-4"/>
        </div>
      </v-col>
        <v-col>
          <v-container style="border-radius: 1%;width: 70%; margin-top: 13%; margin-left: 7%;" >
            <v-container style="padding: 10%;">
              <v-row justify="center" align="center">
                <v-col>
                  <h1 style="font-family: 'Poppins', sans-serif; font-size: 30px; font-weight: 600; color: #656565;">
                    Login
                  </h1>
                </v-col>
            </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                      class=""
                      label="Email"
                      v-model="login.emailUsuario"
                      variant="outlined"
                      required
                      placeholder="Email"
                      prepend-inner-icon="mdi-email"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                      label="Senha"
                      color:="blue"
                      v-model="login.senhaUsuario"
                      style="margin-top: -8%"
                      variant="outlined"
                      placeholder="Senha"
                      :append-inner-icon="show ? 'mdi-eye-off' : 'mdi-eye'"
                      @click:append-inner="show = !show"
                      :type="show ? 'text' : 'password'"
                      prepend-inner-icon="mdi-lock"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col style="margin-top:-10% ;">
                  <a href="#" class="" style="margin-top: -10%;color: #5580b5;">Esqueci minha senha</a>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn
                    x-large
                    block
                    color="#132b45"
                    :loading="loading"
                    outlined
                    @click="loginFunc"
                  >Entrar</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
  definePageMeta({
    layout: "vazio",
  })
export default {
  data: () => {
    return {
      valid: false,
      show: false,
      loading: false,
      login: {
        emailUsuario: null,
        senhaUsuario: null
      },
    }
  },

  methods: {
    async loginFunc(){
      this.loading = true;

        let response = await this.$api.post('/usuario/login', this.login)
        console.log(this.login)
        if(response.data.idTipoUsuario === 1){
          this.$toast.success("Você esta logado como Aluno")
          this.loading = false;
          this.$router.push("/aluno/aulas")
        }else if(response.data.idTipoUsuario === 2){
          this.$toast.success("Você esta logado como Instrutor")
          this.loading = false;
          this.$router.push("/instrutor/aulas")
        }else if(response.data.idTipoUsuario === 3){  
          this.$toast.success("Você esta logado como Secretaria")
          this.loading = false;
          this.$router.push("/secretaria/alunos")}
    },
  }
}
</script>