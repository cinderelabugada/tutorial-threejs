# Tutorial ThreeJS

Seguindo a [documentação](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene).

## 1. [criandoUmaCena.js](./src/criandoUmaCena.js) (Creating a scene)

O primeiro tópico da documentação apresenta aos desenvolvedores como criar a primeira cena. Essa primeira cena consiste em adicionarmos um cubo e uma câmera, e posicionarmos esses dois objetos afim de termos uma cena com um cubo girando. Em resumo esse primeiro tópico introduz esses conceitos de cena como objeto e câmera, assim como a atualização dinâmica desses objetos no Three.JS.

### Configuração do ambiente de desenvolvimento

A documentação inicia recomendando que o desenvolvedor realize o download do código fonte da biblioteca para implementar o exemplo e utilizando html e javascript simples. No nosso caso, ao invés de utilizar essa abordagem, criamos nosso projeto utilizando bundler para que possamos utilizar ES6 no projeto. Para isso configuramos um projeto base utilizando o parcel, assim como realizamos nos tutoriais anteriores. Utilizamos esse bundler por ser de simples configuração, bastando apenas adicionar a biblioteca utilizando o `yarn`, incluindo os comandos para criar o bundle e iniciar o projeto no arquivo `package.json` e incluindo arquivo `index.html` com seus devidas tags de `script` incluindo os arquivos javascript.

### Implementação

A implementação é composta por duas funções, a `criandoUmaCena` e a `animation`. A primeira função pode ser considerada a função principal desse tópico. Assim sendo ela é responsável por configurar as características da renderização, como tamanho do canvas, cor de fundo desse canvas etc. Adicionalmente, a função também é responsável por incluir esse canvas no `body` do documento HTML. Essa função também é responsável por configurar todos os objetos que serão renderizados, assim como a câmera utilizada enquadar a composição da cena. O primeiro elemento criado pela função é a câmera, que será posteriormente adicionada à renderização ao final da função da função `animation`. Posteriormente é inicializado um mesh de cubo, onde é definida suas dimensões assim como material utilizado para sua renderização. Por fim, a função inicializa um objeto de renderização, no qual é configurada as dimensões da renderização, e é atribuída uma função de atualização da renderização. Nesse ponto é importante salientar que a função de atualização da renderização é chamada uma vez 60 vezes a cada segundo, compondo a taxa de atualização de 60fps. 

A segunda função utilizada por essa composição é a função `animation`. Essa função é responsável por realiza modificações nos elementos da cena, e como o próprio nome indica, realizar a animação da mesma. Essa tipo de atualização de cena é muito comum no desenvolvimento de jogos, e essa divisão de responsabilidades pode ser incluive vista no tutorial sobre o [pixi.js abordado anteriormente](https://github.com/cinderelabugada/tutorial-pixijs). Em fontes na literatura de jogos também se referem à esse tipo de função com o nome de `gameloop`. Nesse exemplo, nossa função realiza a atualização da rotação do cubo nos eixos `x` e `y`, utilizando como base o argumento `time` que é sempre passado para essa função.

Por fim, para utilizar essa renderização em nosso projeto, basta importarmos a função criandoUmaCena no arquivo index.js e realizarmos sua chamada.

## Como executar o projeto

```bash
# instalar dependencias
yarn install

# rodar o server (express)
# verifica localhost:1234
yarn start
```
