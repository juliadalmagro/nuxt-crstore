<template>
  <v-container>
    <v-container class="justify-center mt-5">
      <TabelaDados
        titulo="Ficha Cartográfica"
        :loading="loading"
        :headers="headers"
        :items="items"
        @edit-item="editItem"
        @abrir-dialog="ativo = true"
        @delete-item="deleteItem"
      />
    </v-container>
    <v-dialog v-model="ativo" max-width="100vh">
      <v-card height="950" width="900" class="centro" style="overflow-y: auto;">
        <v-card-title>
          <v-row>
            <v-col cols="10">
              <h1>{{ tituloDialog }} uma Ficha Cartográfica</h1>
            </v-col>
            <v-col class="d-flex justify-end">
              <v-btn
                class="mt-4"
                color="red-darken-4"
                icon="mdi-close"
                size="small"
                variant="outlined"
                @click="reset"/>
            </v-col>
          </v-row>
        </v-card-title>

        <v-form @submit.prevent>
          <v-card-text>
            <v-tabs v-model="tab" align-tabs="center">
              <v-tab text="Primeira" value="um" />
              <v-tab text="Segunda" value="dois" />
              <v-tab text="Terceira" value="tres" />
              <v-tab text="Quarta" value="quatro" />
              <v-tab text="Quinta" value="quinta" />
              <v-tab text="Sexta" value="sexta" />
            </v-tabs>

          <v-tabs-window v-model="tab">
            <v-tabs-window-item value="um">
              <v-form @submit.prevent>
                <v-card-text>
                  <v-row class="mt-n4">
                    <v-col>
                      <v-tooltip
                        text="Ex: CCFOT 00001 a 00040."
                        location="bottom"
                      >
                        <template #activator="{ props }">
                          <v-text-field
                            v-bind="props"
                            v-model="fichaCartografica.idImagem"
                            variant="outlined"
                            :rules="CampoObrigatorio"
                            label="ID"
                            placeholder="ID"
                          />
                        </template>
                      </v-tooltip>
                    </v-col>
                  </v-row>
                  <v-row class="mt-n5">
                    <v-col>
                      <v-tooltip
                        text="Título do Mapa que deve ser colocado por extenso da maneira como se encontra na carta cartográfica."
                        location="bottom"
                      >
                        <template #activator="{ props }">
                          <v-text-field
                            v-bind="props"
                            v-model="fichaCartografica.idDescricaoImagem"
                            variant="outlined"
                            :rules="CampoObrigatorio"
                            label="Título"
                            placeholder="Título"
                          />
                        </template>
                      </v-tooltip>
                    </v-col>
                  </v-row>
                  <v-row class="mt-n5">
                    <v-col>
                      <v-autocomplete
                        v-model="fichaCartografica.fundoColecao"
                        clearable
                        :items="ParametroFunCol"
                        :rules="[
                          (v) => (!!v && v > -1) || 'Campo obrigatório!',
                        ]"
                        item-title="nomePar"
                        item-value="codSeqPar"
                        placeholder="Fundo/Coleção"
                        label="Fundo/Coleção"
                        :menu-props="{ width: 600 }"
                      />
                    </v-col>
                    <v-col>
                      <v-autocomplete
                        v-model="fichaCartografica.serie"
                        clearable
                        :items="ParametroSerie"
                        :rules="[
                          (v) => (!!v && v > -1) || 'Campo obrigatório!',
                        ]"
                        item-title="nomePar"
                        item-value="codSeqPar"
                        placeholder="Série"
                        label="Série"
                      />
                    </v-col>
                    <v-col>
                      <v-autocomplete
                        v-model="fichaCartografica.subSerie"
                        clearable
                        :items="ParametroSubSerie"
                        :rules="[
                          (v) => (!!v && v > -1) || 'Campo obrigatório!',
                        ]"
                        item-title="nomePar"
                        item-value="codSeqPar"
                        label="Sub-série"
                        placeholder="Sub-série"
                        :menu-props="{ width: 400 }"
                      />
                    </v-col>
                  </v-row>
                  <v-row class="mt-n5">
                    <v-col>
                      <v-text-field
                        v-model="fichaCartografica.dataObjeto"
                        variant="outlined"
                        label="Data"
                        type="date"
                      />
                    </v-col>
                    <v-col>
                      <v-text-field
                        v-model="fichaCartografica.datacao"
                        variant="outlined"
                        label="Data Aprox"
                        type="date"
                      />
                    </v-col>
                  </v-row>
                  <v-row class="mt-n5">
                    <v-col>
                      <v-tooltip
                        text="Indicar os elementos que os contém. Ex: estradas, estradas vicinais, estradas tronco, águas minerais, sede de municípios, etc..."
                        location="bottom"
                      >
                        <template #activator="{ props }">
                          <v-textarea
                            v-model="fichaCartografica.legenda"
                            variant="outlined"
                            label="Legenda"
                            placeholder="Legenda"
                            v-bind="props"
                          />
                        </template>
                      </v-tooltip>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <IDragNDrop2
                        :ficha="fichaCartografica"
                        @get-file="getFile"
                      />
                    </v-col>
                    <v-col>
                      <div
                        v-if="validadorArquivo"
                        class="ml-5 mt-2"
                        style="color: #c05f71"
                      >
                        Campo obrigatório!
                      </div>
                      <div class="text-center pa-4">
                        <v-btn
                          v-if="
                            imagePreview ||
                            (fichaCartografica.idImagem &&
                              tituloDialog != 'Criar')
                          "
                          class="text-none"
                          elevation="6"
                          color="primary"
                          rounded="xl"
                          @click="dialog2 = true"
                        >
                         Visualizar imagens
                      </v-btn>
                        <v-dialog v-model="dialog2" width="auto">
                          <v-card
                            width="fit-content"
                            class="centro"
                            style="
                              border-radius: 3cqmin;
                              position: relative;
                              overflow: hidden;
                            "
                          >
                            <v-card-title>
                              <v-row>
                                <v-col class="d-flex justify-center">
                                  <h2>Imagem</h2>
                                </v-col>
                              </v-row>
                            </v-card-title>
                            <v-card-text v-if="imagePreview.length > 0">
                              <v-carousel
                                :continuous="false"
                                hide-delimiters
                                >
                                <v-carousel-item
                                  v-for="(image, index) in imagePreview"
                                  :key="index"
                                >
                                  <img
                                    :src="image"
                                    width="550"
                                    height="550"
                                    alt="Não há imagem para visualizar."
                                    style="max-width: 800px; max-height: 800px"
                                  >
                                </v-carousel-item>
                              </v-carousel>
                            </v-card-text>
                            <v-row>
                              <v-col class="d-flex justify-center">
                                <v-btn
                                  class="mb-2"
                                  color="red-darken-4"
                                  icon="mdi-close"
                                  size="small"
                                  variant="outlined"
                                  @click="dialog2 = false"
                                />
                              </v-col>
                            </v-row>
                          </v-card>
                        </v-dialog>
                      </div>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-row class="d-flex justify-end mb-6">
                  <v-col class="d-flex justify-end mb-6 ml-6">
                    <v-tooltip text="Próximo">
                      <template #activator="{ props }">
                        <v-btn
                          v-bind="props"
                          class="ma-2 pa-2"
                          icon="mdi-arrow-right"
                          size="small"
                          variant="outlined"
                          :type="submit"
                          @click="camposObrigatorios()"
                        />
                      </template>
                    </v-tooltip>
                  </v-col>
                </v-row>
              </v-form>
            </v-tabs-window-item>

            <v-tabs-window-item value="dois">
              <v-form @submit.prevent>
                <v-card-text>
                  <v-row>
                    <v-col>
                      <v-textarea
                        v-model="fichaCartografica.nomeImagem"
                        variant="outlined"
                        label="Responsabilidade de projeto/planta"
                        placeholder="Segundo Campo"
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-autocomplete
                        v-model="fichaCartografica.dpi"
                        clearable
                        :items="Parametrodpi"
                        :rules="[
                          (v) => (!!v && v > -1) || 'Campo obrigatório!',
                        ]"
                        item-title="nomePar"
                        item-value="codSeqPar"
                        label="Resolução Digital - DPI"
                        placeholder="Resolução Digital - DPI"
                      />
                    </v-col>
                    <v-col>
                      <v-autocomplete
                        v-model="fichaCartografica.extensao"
                        clearable
                        :items="ParametroExDoc"
                        :rules="[
                          (v) => (!!v && v > -1) || 'Campo obrigatório!',
                        ]"
                        item-title="nomePar"
                        item-value="codSeqPar"
                        label="Extensão do Documento"
                        placeholder="Extensão do Documento"
                      />
                    </v-col>
                    <v-col>
                      <v-autocomplete
                        v-model="fichaCartografica.equipamento"
                        clearable
                        :items="ParametroEqip"
                        :rules="[
                          (v) => (!!v && v > -1) || 'Campo obrigatório!',
                        ]"
                        item-title="nomePar"
                        item-value="codSeqPar"
                        label="Equipamento Utilizado"
                        placeholder="Equipamento Utilizado"
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-autocomplete
                        v-model="fichaCartografica.originalReproducao"
                        clearable
                        :items="ParametroReproducao"
                        :rules="[
                          (v) => (!!v && v > -1) || 'Campo obrigatório!',
                        ]"
                        item-title="nomePar"
                        item-value="codSeqPar"
                        label="Original/Reprodução"
                        placeholder="Original/Reprodução"
                      />
                    </v-col>
                    <v-col>
                      <v-autocomplete
                        v-model="fichaCartografica.localizacaoFisica"
                        clearable
                        :items="localizacaoFisica"
                        :rules="[
                          (v) => (!!v && v > -1) || 'Campo obrigatório!',
                        ]"
                        item-title="nomePar"
                        item-value="codSeqPar"
                        label="Localização Física"
                        placeholder="Localização Física"
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-textarea
                        v-model="fichaCartografica.descricaoImagem"
                        variant="outlined"
                        label="Descrição"
                        placeholder="Descrição"
                      />
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-row class="d-flex justify-end mb-6">
                  <v-col class="d-flex justify-end mb-6 mt-15 ml-6">
                    <v-tooltip text="Voltar" location="start">
                      <template #activator="{ props }">
                        <v-btn
                          v-bind="props"
                          class="ma-2 pa-2"
                          icon="mdi-arrow-left"
                          size="small"
                          variant="outlined"
                          @click="tab = 0"
                        />
                      </template>
                    </v-tooltip>
                    <v-tooltip text="Próximo">
                      <template #activator="{ props }">
                        <v-btn
                          v-bind="props"
                          class="ma-2 pa-2 ml-n1"
                          icon="mdi-arrow-right"
                          size="small"
                          variant="outlined"
                          type="submit"
                          @click="camposObrigatorios2()"
                        />
                      </template>
                    </v-tooltip>
                  </v-col>
                </v-row>
              </v-form>
            </v-tabs-window-item>

            <v-tabs-window-item value="tres">
              <v-form @submit.prevent>
                <v-card-text>
                  <v-row>
                    <v-col>
                      <v-textarea
                        v-model="fichaCartografica.inscricaoOriginal"
                        variant="outlined"
                        label="Inscrição manuscritas no original"
                        placeholder="Inscrição manuscritas no original"
                        justify
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-textarea
                        v-model="fichaCartografica.historico"
                        variant="outlined"
                        label="Histórico"
                        placeholder="Histórico"
                        justify
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-textarea
                        v-model="fichaCartografica.referenciaBibliografica"
                        variant="outlined"
                        label="Referência bibliográfica"
                        placeholder="Referência bibliográfica"
                        justify
                      />
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-row class="d-flex justify-end mb-6">
                  <v-col class="d-flex justify-end mb-6 mt-13 ml-6">
                    <v-tooltip text="Voltar" location="start">
                      <template #activator="{ props }">
                        <v-btn
                          v-bind="props"
                          class="ma-2 pa-2"
                          icon="mdi-arrow-left"
                          size="small"
                          variant="outlined"
                          @click="tab = 1"
                        />
                      </template>
                    </v-tooltip>
                    <v-tooltip text="Próximo">
                      <template #activator="{ props }">
                        <v-btn
                          v-bind="props"
                          class="ma-2 pa-2 ml-n1"
                          icon="mdi-arrow-right"
                          size="small"
                          variant="outlined"
                          type="submit"
                          @click="tab = 3"
                        />
                      </template>
                    </v-tooltip>
                  </v-col>
                </v-row>
              </v-form>
            </v-tabs-window-item>

            <v-tabs-window-item value="quatro">
              <v-form @submit.prevent>
                <v-card-text>
                  <v-row>
                    <v-col>
                      <p>Descrição Física</p>
                    </v-col>
                  </v-row>
                  <v-row class="mt-n3">
                    <v-col>
                      <v-autocomplete
                        v-model="fichaCartografica.suporte"
                        clearable
                        :items="Suporte"
                        :rules="[
                          (v) => (!!v && v > -1) || 'Campo obrigatório!',
                        ]"
                        item-title="nomePar"
                        item-value="codSeqPar"
                        label="Suporte"
                        placeholder="Suporte"
                      />
                    </v-col>
                    <v-col>
                      <v-autocomplete
                        v-model="fichaCartografica.cor"
                        clearable
                        :items="Cor"
                        :rules="[
                          (v) => (!!v && v > -1) || 'Campo obrigatório!',
                        ]"
                        item-title="nomePar"
                        item-value="codSeqPar"
                        label="Cor"
                        placeholder="Cor"
                      />
                    </v-col>
                    <v-col>
                      <v-text-field
                        v-model="fichaCartografica.numeracaoAnterior"
                        variant="outlined"
                        label="Quantidade"
                        placeholder="Quantidade"
                      />
                    </v-col>
                  </v-row>
                  <v-row class="mt-n5">
                    <v-col>
                      <p>Dimensões do suporte</p>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-tooltip
                        text="Refere-se à altura total do objeto."
                        location="bottom"
                      >
                        <template #activator="{ props }">
                          <v-text-field
                            v-bind="props"
                            v-model="fichaCartografica.altura"
                            variant="outlined"
                            label="Altura (cm)"
                            placeholder="Altura (cm)"
                          />
                        </template>
                      </v-tooltip>
                    </v-col>
                    <v-tooltip
                      text="Refere-se à largura total do objeto."
                      location="bottom"
                    >
                      <template #activator="{ props }">
                        <v-col>
                          <v-text-field
                            v-bind="props"
                            v-model="fichaCartografica.largura"
                            variant="outlined"
                            label="Largura (cm)"
                            placeholder="Largura (cm)"
                          />
                        </v-col>
                      </template>
                    </v-tooltip>
                  <v-col>
                    <v-autocomplete
                      v-model="fichaCartografica.conservacao"
                      clearable
                      :items="Conservacao"
                      :rules="[
                          (v) => (!!v && v > -1) || 'Campo obrigatório!',
                        ]"
                      item-title="nomePar"
                      item-value="codSeqPar"
                      label="Estado conservação"
                      placeholder="Estado conservação"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-tooltip
                      text="Refere-se à largura total do objeto."
                      location="bottom"
                    >
                      <template #activator="{ props }">
                        <v-col>
                          <v-text-field
                            v-bind="props"
                            v-model="fichaCartografica.materialConfeccao"
                            variant="outlined"
                            label="Limites"
                            placeholder="Limites"
                          />
                        </v-col>
                      </template>
                    </v-tooltip>
                  <v-col>
                    <v-text-field
                      v-model="fichaCartografica.intervencaoSofrida"
                      variant="outlined"
                      label="Escala (númerica)"
                      placeholder="Escala (númerica)"
                    />
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="fichaCartografica.nivelProfundidade"
                      variant="outlined"
                      label="Área em m²"
                      placeholder="Área em m²"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-textarea
                      v-model="fichaCartografica.informacaoComplementar"
                      variant="outlined"
                      label="Informação Complementar"
                      placeholder="Informação Complementar"
                    />
                  </v-col>
                </v-row>
              </v-card-text>
              <v-row class="mt-9"/>
                <v-row class="d-flex justify-end mb-6">
                  <v-col class="d-flex justify-end mb-6 mt-16 ml-6">
                    <v-tooltip text="Voltar" location="start">
                      <template #activator="{ props }">
                        <v-btn
                          v-bind="props"
                          class="ma-2 pa-2"
                          icon="mdi-arrow-left"
                          size="small"
                          variant="outlined"
                          @click="tab = 2"
                        />
                      </template>
                    </v-tooltip>
                    <v-tooltip text="Próximo">
                      <template #activator="{ props }">
                        <v-btn
                          v-bind="props"
                          class="ma-2 pa-2 ml-n1"
                          icon="mdi-arrow-right"
                          size="small"
                          variant="outlined"
                          type="submit"
                          @click="camposObrigatorios3()"
                        />
                      </template>
                    </v-tooltip>
                  </v-col>
                </v-row>
              </v-form>
            </v-tabs-window-item>

            <v-tabs-window-item value="quinta">
              <v-form @submit.prevent>
                <v-card-text>
                  <!-- Quinto campo -->
                  <v-row>
                    <v-col>
                      <v-textarea
                        v-model="fichaCartografica.circulacao"
                        variant="outlined"
                        label="Circulação do Mapa"
                        placeholder="Circulação do Mapa"
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-textarea
                        v-model="fichaCartografica.referenciaNoAcervo"
                        variant="outlined"
                        label="Referências no Acervo"
                        placeholder="Referências no Acervo"
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-textarea
                        v-model="fichaCartografica.outros"
                        variant="outlined"
                        label="Carimbos no original"
                        placeholder="Carimbos no original"
                      />
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-row class="d-flex justify-end mb-6">
                  <v-col class="d-flex justify-end mb-6 mt-13 ml-6">
                    <v-tooltip text="Voltar" location="start">
                      <template #activator="{ props }">
                        <v-btn
                          v-bind="props"
                          class="ma-2 pa-2"
                          icon="mdi-arrow-left"
                          size="small"
                          variant="outlined"
                          @click="tab = 3"
                        />
                      </template>
                    </v-tooltip>
                    <v-tooltip text="Próximo">
                      <template #activator="{ props }">
                        <v-btn
                          v-bind="props"
                          class="ma-2 pa-2 ml-n1"
                          icon="mdi-arrow-right"
                          size="small"
                          variant="outlined"
                          type="submit"
                          @click="tab = 5"
                        />
                      </template>
                    </v-tooltip>
                  </v-col>
                </v-row>
              </v-form>
            </v-tabs-window-item>
            <v-tabs-window-item value="sexta">
              <v-form @submit.prevent>
                <v-card-text>
                  <!-- Sexto campo -->
                  <v-row>
                    <v-col>
                      <v-tooltip
                        text="Neste campo são indicadas as palavras-chave que servem para descrever o objeto."
                        location="bottom"
                      >
                        <template #activator="{ props }">
                          <v-textarea
                            v-bind="props"
                            v-model="fichaCartografica.palavrasChave"
                            variant="outlined"
                            label="Descritores"
                            placeholder="Descritores"
                          />
                        </template>
                      </v-tooltip>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="4">
                      <v-text-field
                        v-model="fichaCartografica.compilador"
                        variant="outlined"
                        label="Compilador"
                        placeholder="Compilador"
                      />
                    </v-col>
                    <v-col>
                      <v-text-field
                        v-model="fichaCartografica.tmpCampo"
                        variant="outlined"
                        placeholder="Segundo Campo"
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="fichaCartografica.dataIncCompilador"
                        variant="outlined"
                        label="Data Início Compilador"
                        type="date"
                        disabled
                      />
                    </v-col>
                    <v-col>
                      <v-text-field
                        v-model="fichaCartografica.dataUltAlteracao"
                        variant="outlined"
                        label="Data Supervisor"
                        type="date"
                        disabled
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="4">
                      <v-text-field
                        v-model="fichaCartografica.tmpCampo"
                        variant="outlined"
                        label="Supervisor"
                        placeholder="Supervisor"
                      />
                    </v-col>
                    <v-col>
                      <v-text-field
                        v-model="fichaCartografica.tmpCampo"
                        variant="outlined"
                        placeholder="Segundo Campo"
                      />
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-row class="mt-9" />
                <v-row class="d-flex justify-end mb-6 mt-16">
                  <v-col class="d-flex justify-end mb-6 mt-16 ml-6">
                    <v-tooltip text="Voltar" location="start">
                      <template #activator="{ props }">
                        <v-btn
                          v-bind="props"
                          class="ma-2 pa-2"
                          icon="mdi-arrow-left"
                          size="small"
                          variant="outlined"
                          @click="tab = 4"
                        />
                      </template>
                    </v-tooltip>
                    <v-tooltip text="Salvar">
                      <template #activator="{ props }">
                        <v-btn
                          v-bind="props"
                          class="ma-2 pa-2 ml-n1"
                          color="green"
                          variant="outlined"
                          size="small"
                          icon="mdi-check"
                          :loading="loadingSave"
                          type="submit"
                          @click="persist()"
                        />
                      </template>
                    </v-tooltip>
                  </v-col>
                </v-row>
              </v-form>
            </v-tabs-window-item>
          </v-tabs-window>
        </v-card-text>
      </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
definePageMeta({
  layout: "admin",
});
export default {
  data: () => {
    return {
      tab: null,
      dialog: false,
      dialog2: false,
      edit: false,
      validadorArquivo: false,
      valor: 0,
      ativo: false,
      show: false,
      loading: true,
      textoUsuario: null,
      imagePreview: [],
      loadingSave: false,
      midia: {
        hash: null,
        codSeqImagem: null,
      },
      fichaCartografica: {
        codSeqImagem: null,
        idImagem: null,
        idDescricaoImagem: null,
        fundoColecao: null,
        serie: null,
        subSerie: null,
        dataObjeto: null,
        outros: null,
        tipoFicha: 508,
        cor: null,
        suporte: null,
        conservacao: null,
        dpi: null,
        extensao: null,
        equipamento: null,
        originalReproducao: null,
        descricaoImagem: null,
        incricaoOriginal: null,
        palavrasChave: null,
        historico: null,
        referenciaBibliografica: null,
        localizacaoFisica: null,
        circulacao: null,
        materialConfeccao: null,
        referenciaNoAcervo: null,
        informacaoComplementar: null,
        compilador: null,
        dataIncCompilador: null,
        
        tmpCampo: null,
      },

      headers: [
        { title: "ID Objeto", key: "idImagem" },
        { title: "Id Descritivo Objeto", key: "idDescricaoImagem" },
        { title: "Actions", key: "actions", sortable: false },
      ],
      imagem: null,
      items: [],
      campo: 1,
      Parametro: [],
      Parametrodpi: [],
      ParametroFunCol: [],
      ParametroSerie: [],
      ParametroSubSerie: [],
      ParametroExDoc: [],
      ParametroEqip: [],
      Cor: [],
      Suporte: [],
      Conservacao: [],
      ParametroReproducao: [],
      localizacaoFisica: [],
      // usuarioAtivo: {},
      CampoObrigatorio: [
        (value) => {
          if (value?.length > 0) return true;
          return "Campo obrigatório!";
        },
      ],
    };
  },

  computed: {
    tituloDialog: function () {
      return this.edit ? "Editar" : "Criar";
    },
  },

  watch: {
    ativo(valor) {
      if (valor == false) {
        this.resetAtividade();
        this.dialog2 = false;
      }
    },
  },

  async created() {
    await Promise.all([
      this.getItems(),
      this.getParametro(),
      this.getParametrodpi(),
      this.getParametroFunColecao(),
      this.getParametroSerie(),
      this.getParametroSubSerie(),
      this.getParametroExDoc(),
      this.getParametroEquip(),
      this.getParametroReproducao(),
      this.getParametroLocalizacao(),
      this.getSuporte(),
      this.getCor(),
      this.getEstadoConservacao(),
    ]);

    this.fichaCartografica.matriculaSupervisor =
    this.usuarioAtivo.data.matricula;
    this.fichaCartografica.nomeSupervisor = this.usuarioAtivo.data.nomeUser;
  },

  methods: {
    resetAtividade() {
      this.fichaCartografica = {
        codSeqImagem: null,
        idImagem: null,
        idDescricaoImagem: null,
        fundoColecao: null,
        serie: null,
        subSerie: null,
        dataObjeto: null,
        tipoFicha: 508,
        suporte: null,
        dpi: null,
        extensao: null,
        cor: null,
        equipamento: null,
        originalReproducao: null,
        descricaoImagem: null,
        incricaoOriginal: null,
        historico: null,
        outros: null,
        referenciaBibliografica: null,
        palavrasChave: null,
        localizacaoFisica: null,
        circulacao: null,
        referenciaNoAcervo: null,
        informacaoComplementar: null,
        compilador: null,
        dataIncCompilador: null,
        tmpCampo: null,
        hash: null,
        materialConfeccao: null,
      };
      this.validadorArquivo = false;
      this.tab = 0;
      this.ativo = false;
      this.campo = 1;
      this.edit = false;
      this.imagePreview = null;
    },

    setCampo(idCampo) {
      this.campo = idCampo;
    },

    async reset() {
      this.ativo = false;
      this.edit = false;
      console.log(this.ativo, 'ativo');
    },

    getFile(file, preview) {
      console.log(file, preview,"ajisfhlaijekshf");
      this.imagePreview = preview; 
      this.imagem = file;
      this.validadorArquivo = false;
    },
    camposObrigatorios() {
      if (
        this.fichaCartografica.idImagem == null ||
        this.fichaCartografica.idImagem == "" ||
        this.fichaCartografica.idDescricaoImagem == null ||
        this.fichaCartografica.idDescricaoImagem == "" ||
        this.fichaCartografica.fundoColecao == null ||
        this.fichaCartografica.fundoColecao == "" ||
        this.fichaCartografica.serie == null ||
        this.fichaCartografica.serie == "" ||
        this.fichaCartografica.subSerie == null ||
        this.fichaCartografica.subSerie == "" ||
        (!this.file && !this.imagem)
      ) {
        if (!this.file && !this.imagem) {
          console.log(this.validadorArquivo, this.imagem, this.file, 'validador, imagem, file');
          this.validadorArquivo = true;
        } else {
          this.validadorArquivo = false;
        }
        this.$toast.warning("Preencha todos os campos obrigatórios!");
      } else {
        this.tab = 1;
      }
    },
    camposObrigatorios2() {
      if (
        this.fichaCartografica.dpi == null ||
        this.fichaCartografica.dpi == "" ||
        this.fichaCartografica.extensao == null ||
        this.fichaCartografica.extensao == "" ||
        this.fichaCartografica.equipamento == null ||
        this.fichaCartografica.equipamento == "" ||
        this.fichaCartografica.originalReproducao == null ||
        this.fichaCartografica.originalReproducao == "" ||
        this.fichaCartografica.localizacaoFisica == null ||
        this.fichaCartografica.localizacaoFisica == ""
      ) {
        this.$toast.warning("Preencha todos os campos obrigatórios!");
      } else {
        this.tab = 2;
      }
    },
    camposObrigatorios3() {
      if (
        this.fichaCartografica.suporte == null ||
        this.fichaCartografica.suporte == "" ||
        this.fichaCartografica.cor == null ||
        this.fichaCartografica.cor == "" ||
        this.fichaCartografica.conservacao == null ||
        this.fichaCartografica.conservacao == ""
      ) {
        this.$toast.warning("Preencha todos os campos obrigatórios!");
      } else {
        this.tab = 4;
      }
    },

    async persist() {
      try {
        this.loadingSave = true;

        const validar =
          !this.fichaCartografica.fundoColecao ||
          !this.fichaCartografica.serie ||
          !this.fichaCartografica.subSerie ||
          !this.fichaCartografica.dpi ||
          !this.fichaCartografica.extensao ||
          !this.fichaCartografica.equipamento ||
          !this.fichaCartografica.originalReproducao ||
          !this.fichaCartografica.localizacaoFisica ||
          !this.fichaCartografica.cor ||
          !this.fichaCartografica.suporte ||
          !this.fichaCartografica.conservacao ||
          !this.imagem;

        if (validar) {
          this.loadingSave = false;
          this.$toast.warning("Preencha todos os campos obrigatórios!");
          return;
        }

        console.log(this.imagem, 'imagem existe?');

        if (this.imagem.length > 0) {
          const hashes = [];

          for (const imagem of this.imagem) {
            const formData = new FormData();
            console.log(formData, 'formDatateste');
            console.log(imagem, 'imagemteste');
            formData.append("uploadFile", imagem);

            try {
              const response = await this.$apiImagem.post("/imagem/create", formData);
              hashes.push(response.hash);
            } catch (e) {
              this.$toast.warning("Erro ao fazer upload da imagem!");
              throw e;
            }
          }
          console.log(hashes, 'hashes amigue');
          this.midia.hash = hashes;
          console.log(this.midia, 'midia com os hashes fofa');
          
        }

        if (this.edit) {
          this.fichaCartografica.dataUltAlteracao = new Date()
            .toISOString()
            .split("T")[0];

          console.log(this.fichaCartografica.codSeqImagem);
          
          await this.$api.patch(
            `/ficha-cartografica/persist/${this.fichaCartografica.codSeqImagem}`,
            this.fichaCartografica
          );
          this.$toast.success("Ficha cartográfica editada com sucesso!");
        } else {
          this.fichaCartografica.dataIncCompilador = new Date()
            .toISOString()
            .split("T")[0];
          console.log(this.fichaCartografica, 'fichaCartografica antes de criar');
          const response =  await this.$api.post("/ficha-cartografica/persist", this.fichaCartografica);
          this.midia.codSeqImagem = response.data.codSeqImagem;
          await this.saveHashes();
          
          this.$toast.success("Ficha cartográfica criada com sucesso!");
        }
      this.resetAtividade();
    } catch (e) {
      this.$toast.warning(
        `Erro ao ${this.edit ? "editar" : "criar"} ficha cartográfica!`
      );
      console.error(e);
    } finally {
      this.loadingSave = false;
      await this.getItems();
    }
  },

  async saveHashes() {
  if (!this.midia || !this.midia.hash || this.midia.hash.length === 0) {
    this.$toast.warning("Nenhum hash disponível para salvar.");
    return;
  }

  if (!this.midia.codSeqImagem) {
    this.$toast.warning("Código de sequência de imagem não definido.");
    return;
  }

  for (const hash of this.midia.hash) {
    console.log(hash, 'hash beleza');
    console.log(this.midia.codSeqImagem, 'midia codseq blz');
    try {
      await this.$api.post("/midia/persist", {
        codSeqImagem: this.midia.codSeqImagem,
        hash: hash
      });
    } catch (e) {
      this.$toast.warning("Erro ao salvar a mídia!");
      console.error(`Erro ao salvar o hash ${hash}`, e);
    }
  }
},

    async editItem(item) {
      this.edit = true;
      this.ativo = true;
      this.$nextTick(async () => {
        this.fichaCartografica = {
          ...item,
        };
        await this.getMidia(item.codSeqImagem);
        this.imagePreview = await this.getFileLink(this.fichaCartografica.hashM);
        this.imagePreview = this.imagePreview ? this.imagePreview.link : null;
        console.log(this.imagePreview, 'imagePreview apos link');
        
      });
    },

    async deleteItem(item) {
      console.log(item, 'item');
      
      try {
        if (confirm(`Deseja deletar o registro com id ${item.idImagem}?`)) {
          const response1 = await this.getMidia(item.codSeqImagem);
          console.log(response1, 'response1');
          response1.forEach(async (cod) => {
            await this.$api.delete(
              `/midia/destroy/${cod.codSeqMidia}`
            );
          });
          await this.$api.delete(
            `/ficha-cartografica/destroy/${item.codSeqImagem}`
          );
          this.$toast.success("Excluido com sucesso");
          this.loading = true;
        }
      } catch (error) {
        this.$toast.warning("Erro ao excluir uma ficha cartografica!");
      }
      await this.getItems();
      this.loading = false;
    },

    async getMidia(codSeqImagem) {
      const response = await this.$api.get(`/midia/imagem/${codSeqImagem}`);
      this.midia = response.data;
      console.log(this.midia);
      return response.data;
      this.loading = false;
    },

    async getItems() {
      const response = await this.$api.get("/ficha-cartografica");
      this.items = response.data;
      console.log(this.items);
      
      this.loading = false;
    },

    async getParametro() {
      const response = await this.$api.get("/parametros");
      this.Parametro = response.response;
    },

    async getParametrodpi() {
      const response = await this.$api.get("/parametros/tipo/50");
      this.Parametrodpi = response.response;
    },

    async getParametroSerie() {
      const response = await this.$api.get("/parametros/tipo/260");
      this.ParametroSerie = response.response;
    },

    async getParametroFunColecao() {
      const response = await this.$api.get("/parametros/tipo/90");
      this.ParametroFunCol = response.response;
    },

    async getParametroSubSerie() {
      const response = await this.$api.get("/parametros/tipo/250");
      this.ParametroSubSerie = response.response;
    },

    async getParametroExDoc() {
      const response = await this.$api.get("/parametros/tipo/70");
      this.ParametroExDoc = response.response;
    },

    async getParametroEquip() {
      const response = await this.$api.get("/parametros/tipo/60");
      this.ParametroEqip = response.response;
    },

    async getParametroReproducao() {
      const response = await this.$api.get("/parametros/tipo/80");
      this.ParametroReproducao = response.response;
    },

    async getParametroLocalizacao() {
      const response = await this.$api.get("/parametros/tipo/120");
      this.localizacaoFisica = response.response;
    },

    async getSuporte() {
      const response = await this.$api.get("/parametros/tipo/10");
      this.Suporte = response.response;
    },

    async getEstadoConservacao() {
      const response = await this.$api.get("/parametros/tipo/40");
      this.Conservacao = response.response;
    },

    async getCor() {
      const response = await this.$api.get("/parametros/tipo/20");
      this.Cor = response.response;
    },
    async getFileLink(hash) {
      if (hash) {
        return await this.$apiImagem.get(`/imagem/link?token=${hash}`);
      }
    },
  },
};
</script>
idImagem
<style scoped>
.centro {
  align-self: center;
}

.img-btn {
  display: block;
  height: 100px;
  width: auto;
  border: 1px solid grey;
  border-radius: 2%;
  transition: border-color 0.2s;
}
.img-btn:hover {
  border-color: white;
}
.img-btn button {
  border: none;
  padding: 0;
}
.img-btn img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.v-field__input {
  text-align: justify !important;
}
</style>