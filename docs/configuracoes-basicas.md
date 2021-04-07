# Configurções básicas

Na documentação e em alguns projetos é comum nós encontramos o modelo de modularização que divide o código em duas funções principais:
 
  1. init()
  2. animation() (ou algo similar)

### Função init()

Utilizada para inicializar os objetos básicos como camera, scene, meshes, renderer. A câmera pode ser criada em qualquer ponto do código, mas para renderizar é preciso da camera e da scena. Para incluir meshes é preciso antes criar uma scene.

#### Grafo de dependências
  - meshes -> scene
  - camera, scene -> renderer.render

  1. **PerspectiveCamera**: essa é uma câmera em perspectiva, e portanto possui o efeito que objetos que estão mais distantes são menores que objetos mais próximos, ou seja a câmera simula algo próximo da nossa visão. Além dessa câmera existe ainda a câmera ortogonal que não possui esse tipo de deformação. A assinatura da função possui como argumentos o:

  - **campo de visão** (fov): controla a área visível, quanto maior esse número maior a área visível
  - **razão de aspecto dos planos**: controla o formato dessa área.
  - **distância do plano próximo** (near clipping): utilizado para otimizar a renderização do objetos, removendo todos os objetos que estão entre a câmera e esse plano.
  - **distância do plano distante** (far clipping):otimização removendo objetos que estão depois desse plano.

  2. **Scene**: representa um container de objetos que serão posteriormente renderizados pelo renderer. O construtor desse objeto não possui argumentos, e a função mais utilizada do objeto é a add, para adicionar meshes, luzes dentre outras coisas à cena.

  3. **Meshes**: representam os modelos 3D. Podem ser cubos, planos, esferas cilindros ou modelos exportados pelo blender. Podem possuir materiais, como as primitivas basicas (cubos, planos, etc)

  4. **Luzes**: para que scena seja visível muitas vezes é necessário a utilização de luzes. Exitem vários tipos de luzes como ambiente, pontual, direcional entre outras. As luzes também são objetos que são adicionados nas scenas.

  5. **Render**: objeto resposável por realizar a renderização da cena utilizando uma das câmeras criadas. Existem vários tipos de renderizadores, sendo o mais usual o WebGLRenderer. Através dele é definida a área de renderização (setSize), e configurar o animation loop. 

### Função animation()

Essa função em geral é utilizada para atualziar o estado da scena, mudando a posição do objetos, ou quais a cameras estão sendo utilizadas. Essa função é chamada ou pela função do renderizador (setAnimationLoop) ou por consecutivas chamadas recursivas, sendo sua chamada inicial utilizando uma função do objeto window (do javascript). A função sempre recebe como parametro um tick, que identifica qual frame corrente.
