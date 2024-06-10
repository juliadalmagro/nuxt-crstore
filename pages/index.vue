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
          @click="mudaBlusas()" >
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
          @click="mudaShorts()">
          Shorts & saias
        </v-btn>

        <v-btn 
          size="small"
          variant="plain"
          class="text-none"
          height="0%"
          @click="mudaTerceiras()">
          Terceiras peças
        </v-btn>

        <v-btn 
          size="small"
          variant="plain"
          class="text-none"
          height="0%"
          @click="mudaAcessorios()">
        Acessórios
        </v-btn>

        <v-btn 
        size="small"
        variant="plain"
        style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)"
      >
        <img src="https://cdn.vnda.com.br/lasclothing/2024/03/08/10_3_9_926_logolasclothing.svg?v=1709905121" style="height: 36.25px; width: 66.15px;">
      </v-btn>
        
        <v-spacer></v-spacer>
        
        <v-btn 
          size="small"
          variant="plain"
          class="text-none"
          height="0%">
        Feito no Brasil
      </v-btn>
      
      <v-btn 
      variant="plain"
      height="0%">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      
      <v-btn 
      variant="plain"
      height="0%"
      @click="mudaLogin()">
        <v-icon>mdi-account-outline</v-icon>
      </v-btn>
      
      <v-btn 
      variant="plain"
      height="0%">
        <v-icon>mdi-shopping-outline</v-icon>
      </v-btn>
  </v-toolbar>
    </v-card>
  </template>
  <div>
    <v-carousel 
    theme="light"
    height="770px">
  <v-carousel-item
    src="https://cdn.vnda.com.br/lasclothing/2024/05/23/8_5_9_947_3.png?v=1716465220"
    cover
  ></v-carousel-item>

  <v-carousel-item
    src="https://cdn.vnda.com.br/lasclothing/2024/05/23/8_5_8_853_JULIA2.png?v=1716465268"
    cover
  ></v-carousel-item>

  <v-carousel-item
    src="https://cdn.vnda.com.br/lasclothing/2024/05/23/8_5_4_427_JULIA.png?v=1716465369"
    cover
  ></v-carousel-item>
</v-carousel>
  </div>
  <div style="position: relative; border-bottom: 1px solid black; height: 65px; display: flex; flex-direction: row" >
    <div style="color: #636260; width: 80%; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
      <v-row>
        <v-col>
          <p style="position: absolute; top: -40%;"> <img src="https://cdn.vnda.com.br/lasclothing/2024/04/09/11_4_7_700_IMG_7330.PNG?v=1712671674" class="img-ursinho"> FRETE GRÁTIS A PARTIR DE R$450,00 EM COMPRAS.</p>
        </v-col>
        <v-col>
          <p> <img src="https://cdn.vnda.com.br/lasclothing/2024/04/09/11_4_7_700_IMG_7330.PNG?v=1712671674" class="img-ursinho"> PRIMEIRA TROCA POR CONTA DA LA'S.</p>
        </v-col>
        <v-col>
          <p> <img src="https://cdn.vnda.com.br/lasclothing/2024/04/09/11_4_7_700_IMG_7330.PNG?v=1712671674" class="img-ursinho"  > ENTREGAMOS PARA TODO O BRASIL.</p>
        </v-col>
      </v-row>
    </div>
  </div>

</template>

<script>
export default {
  data: () => {

  },


  methods: {
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
    mudaLogin(){
      this.$router.push({ path: '/login' });
    },
  }
}
</script>

<style>
p {
  font-size: 12px;
}

.img-ursinho {
  height: 35px; 
  width: 35px; 
  margin-top: 10px;
}

</style>