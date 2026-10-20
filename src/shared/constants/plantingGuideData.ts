import { AppIcons, IconName } from './appIcons';

export type CultivationMethodKey = 'seed' | 'cutting' | 'seedling';

export interface GuideStep {
    id: string;
    stepNumber: number;
    title: string;
    shortTitle: string;
    description: string;
    detailedInstructions: string[];
    proTip?: string;
    caution?: string;
    badge: string;
    icon: IconName;
}

export interface MaterialItem {
    id: string;
    name: string;
    description: string;
    required: boolean;
}

export interface MethodGuide {
    key: CultivationMethodKey;
    label: string;
    tagline: string;
    conceptTitle: string;
    conceptDescription: string;
    advantage: string;
    idealFor: string;
    suitableSpecies: string[];
    materials: MaterialItem[];
    steps: GuideStep[];
}

export interface CriticalAlertItem {
    id: string;
    category: 'toxicity' | 'hazards' | 'invasive' | 'transplant' | 'container' | 'crown';
    title: string;
    plantName: string;
    scientificName: string;
    alertText: string;
    actionRequired: string;
    severity: 'danger' | 'warning' | 'info';
    icon: IconName;
}

export interface UniversalTipItem {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    steps: string[];
    benefits: string[];
    icon: IconName;
}

export const CULTIVATION_METHODS: Record<CultivationMethodKey, MethodGuide> = {
    seed: {
        key: 'seed',
        label: 'Semente',
        tagline: 'Semeadura Direta ou em Bandejas',
        conceptTitle: 'O que é a Semente e Como Funciona?',
        conceptDescription:
            'A semente é a origem sexuada da planta, contendo um embrião protegido por uma casca. Embora exija mais paciência para germinar do zero, desenvolve um sistema radicular profundo e vigoroso a longo prazo.',
        advantage:
            'Para iniciantes, o segredo de ouro é manter umidade constante nas primeiras 14 horas (fase em que toda a água de germinação é absorvida) e utilizar substrato leve e aerado.',
        idealFor: 'Hortaliças de ciclo rápido, raízes e ervas sensíveis a transplante.',
        suitableSpecies: [
            'Alface Crocante',
            'Coentro',
            'Rabanete',
            'Erva-doce',
            'Beterraba Maravilha',
            'Rúcula',
        ],
        materials: [
            {
                id: 'm1',
                name: 'Sementes Selecionadas',
                description: '2 a 3 sementes por cova ou célula de germinação.',
                required: true,
            },
            {
                id: 'm2',
                name: 'Recipiente com Drenagem',
                description: 'Vaso, sementeira ou potes reutilizáveis com furos na base.',
                required: true,
            },
            {
                id: 'm3',
                name: 'Substrato Leve de Germinação',
                description: 'À base de turfa ou terra vegetal fina (nunca areia compactada).',
                required: true,
            },
            {
                id: 'm4',
                name: 'Borrifador de Água',
                description: 'Evita que o jato forte arranque as sementes da terra.',
                required: true,
            },
            {
                id: 'm5',
                name: 'Etiqueta de Identificação',
                description: 'Para marcar a data de semeadura e a espécie cultivada.',
                required: false,
            },
        ],
        steps: [
            {
                id: 's1',
                stepNumber: 1,
                title: 'PREPARAÇÃO DO RECIPIENTE',
                shortTitle: 'Recipiente',
                badge: 'Furos essenciais',
                icon: AppIcons.POTTED_PLANT,
                description:
                    'Escolha um vaso, jardineira ou pote reutilizável (copo descartável, pote de iogurte). Faça furos generosos na parte inferior.',
                detailedInstructions: [
                    'Certifique-se de que a água flui livremente pelos furos do fundo.',
                    'Se a água não escoar rapidamente, aumente o tamanho dos orifícios.',
                    'Para vasos definitivos, utilize uma camada de brita ou argila expandida no fundo.',
                ],
                proTip: 'Recipientes rasos de 5 a 10 cm são perfeitos para sementeiras iniciais.',
            },
            {
                id: 's2',
                stepNumber: 2,
                title: 'SUBSTRATO E UMIDECIMENTO',
                shortTitle: 'Substrato',
                badge: 'Terra leve',
                icon: AppIcons.LEAF,
                description:
                    'Preencha o recipiente com substrato leve e aerado. Molhe bem o solo antes de depositar as sementes.',
                detailedInstructions: [
                    'Use terra vegetal peneirada misturada com turfa ou húmus de minhoca.',
                    'Nunca use areia pura ou barro compactado, pois sufocam as raízes frágeis.',
                    'Umedeça todo o substrato de forma homogênea antes de colocar as sementes.',
                ],
                proTip: 'A terra deve ficar como uma esponja úmida: molhada, mas sem pingar poças de lama.',
            },
            {
                id: 's3',
                stepNumber: 3,
                title: 'SEMEADURA E PROFUNDIDADE',
                shortTitle: 'Semeadura',
                badge: 'Profundidade exata',
                icon: AppIcons.SUN_DIM,
                description:
                    'A profundidade correta é o fator número 1 para o sucesso da germinação de acordo com o tamanho da semente.',
                detailedInstructions: [
                    'Sementes pequenas (Alface, Rúcula): devem ficar na superfície ou cobertas por uma camada finíssima (0,5 cm), pois exigem luz indireta para despertar.',
                    'Sementes maiores (Coentro, Rabanete, Erva-doce, Beterraba): devem ser enterradas entre 1 cm e 2 cm de profundidade.',
                    'Deposite de 2 a 3 sementes por cova para assegurar a germinação.',
                ],
                caution: 'Cobrir sementes pequenas com muita terra impede que a luz as alcance e elas morrem sem germinar.',
            },
            {
                id: 's4',
                stepNumber: 4,
                title: 'PRIMEIRA REGA E MICROCLIMA',
                shortTitle: 'Primeira Rega',
                badge: 'Uso de borrifador',
                icon: AppIcons.DROPLET,
                description:
                    'Irrigue com suavidade absoluta. O segredo é manter umidade ininterrupta nas primeiras 14 horas.',
                detailedInstructions: [
                    'Use SEMPRE um borrifador nas primeiras semanas para a força do jato não afundar ou arrancar as sementes.',
                    'Em dias quentes, borrife água de 1 a 2 vezes por dia para que o solo superficial não resseque.',
                    'Mantenha em local com sombra e luz filtrada (nunca sob sol direto forte nos primeiros dias).',
                ],
                proTip: 'Conforme as primeiras folhas verdadeiras surgirem, aumente gradualmente a exposição ao sol da manhã.',
            },
            {
                id: 's5',
                stepNumber: 5,
                title: 'DESBASTE (SELEÇÃO DOS FORTES)',
                shortTitle: 'Desbaste',
                badge: 'Eliminar competição',
                icon: AppIcons.LIST_DASHES,
                description:
                    'Quando brotarem várias mudinhas na mesma cova, é necessário realizar o desbaste para evitar disputa por espaço e luz.',
                detailedInstructions: [
                    'Aguarde o surgimento das primeiras folhas verdadeiras (cerca de 7 a 14 dias).',
                    'Corte ou puxe com extremo cuidado as mudinhas mais fracas e raquíticas.',
                    'Deixe apenas o broto mais robusto e vigoroso em cada ponto de plantio.',
                    'Mantenha um espaçamento final de 5 cm a 20 cm entre plantas.',
                ],
                proTip: 'Corte os brotos descartados com tesourinha rente ao solo para não mexer nas raízes do broto que vai ficar.',
            },
            {
                id: 's6',
                stepNumber: 6,
                title: 'TRANSPLANTE OU LOCAL DEFINITIVO',
                shortTitle: 'Transplante',
                badge: 'Mudança de estágio',
                icon: AppIcons.TREE,
                description:
                    'Identifique o momento exato em que a planta jovem está pronta para ir ao canteiro ou vaso definitivo.',
                detailedInstructions: [
                    'Momento ideal: quando a planta atingir de 4 a 6 pares de folhas verdadeiras ou raízes apontarem nos furos de drenagem.',
                    'Atenção Crítica: Coentro e Rabanete possuem raízes pivotantes sensíveis e NUNCA devem ser transplantados (devem ser semeados diretamente no local final).',
                    'Para alfaces e outras hortaliças, transplante no final da tarde para reduzir o estresse térmico.',
                ],
                caution: 'Proteja a muda recém-transplantada de sol tórrido nos primeiros 2 dias.',
            },
        ],
    },
    seedling: {
        key: 'seedling',
        label: 'Muda',
        tagline: 'Planta Jovem com Raiz Formada',
        conceptTitle: 'O que é a Muda e Suas Vantagens?',
        conceptDescription:
            'A muda é uma planta jovem que já superou a fase mais crítica da germinação, contando com raízes e primeiras folhas consolidadas.',
        advantage:
            'Ganha de 20 a 30 dias de vantagem sobre a semente, possuindo uma taxa de sobrevivência e pegamento excelente, mesmo para cultivadores iniciantes.',
        idealFor: 'Plantas ornamentais, aromáticas e hortaliças de fruto.',
        suitableSpecies: [
            'Jiboia',
            'Manjericão',
            'Orégano',
            'Orquídea Phalaenopsis',
            'Couve',
            'Salsinha',
            'Melissa',
            'Pimenta Biquinho',
            'Morango',
            'Almeirão Amarelo',
        ],
        materials: [
            {
                id: 'mm1',
                name: 'Muda Vigorosa com Torrão',
                description: 'Planta com raízes brancas e folhas sem pragas ou manchas.',
                required: true,
            },
            {
                id: 'mm2',
                name: 'Vaso Definitivo Adequado',
                description: 'Com diâmetro e profundidade correspondentes ao porte da espécie.',
                required: true,
            },
            {
                id: 'mm3',
                name: 'Camada de Drenagem',
                description: 'Brita, argila expandida ou cacos de telha para o fundo.',
                required: true,
            },
            {
                id: 'mm4',
                name: 'Substrato Específico',
                description: 'Terra orgânica para hortaliças ou casca de pinus para orquídeas.',
                required: true,
            },
            {
                id: 'mm5',
                name: 'Regador com Bico Fino',
                description: 'Para rega direta no solo sem espirrar terra nas folhas.',
                required: true,
            },
        ],
        steps: [
            {
                id: 'm_s1',
                stepNumber: 1,
                title: 'PREPARE O VASO DEFINITIVO',
                shortTitle: 'Vaso',
                badge: 'Porte da espécie',
                icon: AppIcons.POTTED_PLANT,
                description:
                    'Escolha o recipiente definitivo observando a profundidade necessária para as raízes da espécie.',
                detailedInstructions: [
                    'Verifique os furos de drenagem no fundo do vaso; faça novos furos se necessário.',
                    'Espécies de porte médio (como Couve e Tomate Cereja) necessitam de no mínimo 10 a 20 litros.',
                    'Plantas como a Orquídea Phalaenopsis exigem OBRIGATORIAMENTE vaso de plástico transparente.',
                ],
                proTip: 'Vasos de barro evaporam mais rápido; vasos de plástico retêm umidade por mais tempo.',
            },
            {
                id: 'm_s2',
                stepNumber: 2,
                title: 'CAMADA DE DRENAGEM EFICIENTE',
                shortTitle: 'Drenagem',
                badge: 'Fundo protegido',
                icon: AppIcons.CROSSHAIR,
                description:
                    'Forre o fundo do vaso para criar um espaço livre que impeça a água de empoçar e apodrecer as raízes.',
                detailedInstructions: [
                    'Coloque uma camada de 2 a 4 cm de argila expandida, brita ou cacos de cerâmica no fundo.',
                    'Opcional: coloque uma manta bidim (ou pedaço de tecido TNT) sobre as pedras para a terra não descer e entupir os furos.',
                    'Isso garante excelente aeração radicular e longevidade à planta.',
                ],
                caution: 'Sem drenagem, 90% das mudas de interior morrem por asfixia e podridão radicular.',
            },
            {
                id: 'm_s3',
                stepNumber: 3,
                title: 'ADICIONE O SUBSTRATO',
                shortTitle: 'Substrato',
                badge: 'Nutrição correta',
                icon: AppIcons.LEAF,
                description:
                    'Preencha o vaso até cerca da metade com o substrato ideal para o tipo de planta.',
                detailedInstructions: [
                    'Para hortaliças e aromáticas: terra vegetal rica em húmus de minhoca e matéria orgânica.',
                    'Para cactos e suculentas: substrato bem arenoso e poroso.',
                    'Para orquídeas: substrato especial sem terra (casca de pinus, carvão e fibra de coco).',
                ],
                proTip: 'Não compacte a terra ao colocar. Deixe-a fofa e solta.',
            },
            {
                id: 'm_s4',
                stepNumber: 4,
                title: 'POSICIONAMENTO DA MUDA',
                shortTitle: 'Posicionamento',
                badge: 'Torrão intacto',
                icon: AppIcons.PLANT,
                description:
                    'Retire a muda do saquinho ou vaso original com extremo cuidado para preservar todo o torrão de raízes.',
                detailedInstructions: [
                    'Aperte suavemente as laterais do saquinho plástico e deslize a muda sem puxar bruscamente pelo caule.',
                    'Mantenha o bloco de terra firme ao redor das raízes intacto para evitar choque térmico e hídrico.',
                    'Posicione a muda no centro exato do novo vaso.',
                    'CUIDADO CRÍTICO COM O COLO: não enterre o caule além do nível original. No Morango, a coroa DEVE ficar estritamente acima da terra!',
                ],
                caution: 'Enterrar a coroa do morango ou o colo de mudas jovens provoca podridão fulminante.',
            },
            {
                id: 'm_s5',
                stepNumber: 5,
                title: 'PREENCHIMENTO E FIXAÇÃO',
                shortTitle: 'Preenchimento',
                badge: 'Acomodação suave',
                icon: AppIcons.NOTE_PENCIL,
                description:
                    'Preencha os espaços vazios ao redor do torrão com mais substrato até nivelar.',
                detailedInstructions: [
                    'Coloque substrato até cerca de 1 a 2 cm abaixo da borda do vaso para facilitar as futuras regas.',
                    'Pressione suavemente com as pontas dos dedos ao redor da muda apenas para firmá-la.',
                    'Evite socar o solo com força, pois as raízes precisam de oxigênio nos microporos.',
                ],
                proTip: 'Deixe um pequeno vão de 2 cm até a borda do vaso para a água não transbordar ao regar.',
            },
            {
                id: 'm_s6',
                stepNumber: 6,
                title: 'PRIMEIRA REGA E ADAPTAÇÃO',
                shortTitle: 'Adaptação',
                badge: 'Período de cura',
                icon: AppIcons.DROPLET,
                description:
                    'Realize a primeira rega de estabelecimento e dê à muda um tempo de descanso.',
                detailedInstructions: [
                    'Regue de forma moderada a abundante até a água começar a escorrer pelos furos de drenagem.',
                    'Essa rega inicial assenta a terra e elimina possíveis bolsas de ar presas nas raízes.',
                    'Nos primeiros 3 a 5 dias, mantenha o vaso em local protegido de ventos fortes e do sol direto intenso.',
                    'Após esse período de adaptação, inicie o cronograma regular de cuidados e adubação superficial.',
                ],
                proTip: 'No PlanPaz, a planta entra no estágio de Crescimento assim que supera esses primeiros dias de adaptação!',
            },
        ],
    },
    cutting: {
        key: 'cutting',
        label: 'Estaca',
        tagline: 'Propagação por Galhos, Touceiras e Rizomas',
        conceptTitle: 'O que é Propagação Assexuada (Clone)?',
        conceptDescription:
            'É a multiplicação vegetal realizada a partir de uma parte vegetativa da planta-mãe (pedaço de caule, ramo, folha ou divisão de brotos/touceiras).',
        advantage:
            'Produz resultados muito mais rápidos que a semente e preserva 100% das características genéticas da planta matriz, gerando um clone perfeito e produtivo.',
        idealFor: 'Trepadeiras, aromáticas rasteiras, suculentas e folhagens ornamentais.',
        suitableSpecies: [
            'Jiboia (galho/estaca)',
            'Hortelã (estaca/mudas laterais)',
            'Espada de São Jorge (divisão de touceira)',
            'Colar de Pérolas (estaca de ramo)',
            'Ora-pro-nóbis (estaca de caule)',
            'Babosa (broto lateral)',
            'Planta Jade (estaca de folha/ramo)',
            'Tomilho (estaca de ramo)',
        ],
        materials: [
            {
                id: 'mc1',
                name: 'Ramo ou Touceira Saudável',
                description: 'Galho de 10-15 cm ou broto lateral com raízes já formadas.',
                required: true,
            },
            {
                id: 'mc2',
                name: 'Tesoura de Poda Esterilizada',
                description: 'Limpa com álcool 70% para não transmitir fungos ou bactérias.',
                required: true,
            },
            {
                id: 'mc3',
                name: 'Substrato Poroso e Leve',
                description: 'Mistura com boa aeração que estimula o desenvolvimento de radicelas.',
                required: true,
            },
            {
                id: 'mc4',
                name: 'Vaso com Drenagem',
                description: 'Com furos e camada de pedriscos.',
                required: true,
            },
            {
                id: 'mc5',
                name: 'Luvas de Proteção',
                description: 'Obrigatórias para plantas com espinhos (Ora-pro-nóbis) ou látex (Coroa de Cristo).',
                required: false,
            },
        ],
        steps: [
            {
                id: 'c_s1',
                stepNumber: 1,
                title: 'SELEÇÃO DO RAMO / TOUCEIRA',
                shortTitle: 'Seleção',
                badge: 'Material saudável',
                icon: AppIcons.LEAF,
                description:
                    'Corte um ramo jovem e viável de uma planta adulta bem nutrida e sem sinais de pragas.',
                detailedInstructions: [
                    'Corte uma haste de 10 a 15 cm (para Jiboia, Tomilho, Ora-pro-nóbis) logo abaixo de um nó foliar.',
                    'Para Divisão de Touceiras (Espada de São Jorge, Hortelã, Babosa): retire a planta do vaso e separe cuidadosamente os brotos laterais ("filhotes") já enraizados.',
                    'Para Colar de Pérolas: selecione ramos com bolinhas verdes túrgidas e nós visíveis.',
                ],
                proTip: 'O corte deve ser limpo e em ângulo de 45 graus com tesoura afiada e esterilizada.',
            },
            {
                id: 'c_s2',
                stepNumber: 2,
                title: 'PREPARAÇÃO DA ESTACA',
                shortTitle: 'Preparação',
                badge: 'Limpeza de nós',
                icon: AppIcons.CROSSHAIR,
                description:
                    'Prepare a haste para direcionar a energia na produção de raízes, e não na evaporação de água.',
                detailedInstructions: [
                    'Retire as folhas dos 4 a 6 cm inferiores da haste que ficarão enterrados.',
                    'Deixe apenas 2 a 4 folhas no topo do galho.',
                    'Para suculentas (Jade, Babosa): deixe a ponta cortada secar em local sombreado por 1 a 2 dias para cicatrizar antes de plantar.',
                ],
                caution: 'Folhas enterradas sob a terra apodrecem rapidamente e atraem bactérias fatais para a estaca.',
            },
            {
                id: 'c_s3',
                stepNumber: 3,
                title: 'PREPARO DO VASO E SUBSTRATO',
                shortTitle: 'Vaso e Solo',
                badge: 'Alta aeração',
                icon: AppIcons.POTTED_PLANT,
                description:
                    'Estacas necessitam de um substrato bem oxigenado e sem compactação para emitir raízes frágeis.',
                detailedInstructions: [
                    'Monte o vaso com camada de brita ou argila expandida no fundo.',
                    'Preencha com mistura leve: terra vegetal com boa proporção de areia grossa ou perlita.',
                    'Umedeça o substrato previamente para que fique ligeiramente úmido.',
                ],
                proTip: 'Enraizamento prévio na água funciona muito bem para Jiboia e Hortelã antes de passar para a terra.',
            },
            {
                id: 'c_s4',
                stepNumber: 4,
                title: 'PLANTIO E FIXAÇÃO',
                shortTitle: 'Fixação',
                badge: 'Nó enterrado',
                icon: AppIcons.TREE,
                description:
                    'Posicione a estaca ou broto no substrato conforme as particularidades morfológicas da espécie.',
                detailedInstructions: [
                    'Estacas de Ramos (Jiboia, Tomilho, Ora-pro-nóbis): enterre cerca de 1/3 do galho, assegurando que pelo menos um nó de crescimento fique completamente coberto pela terra.',
                    'Divisão de Touceiras (Espada de São Jorge, Hortelã, Cebolinha, Babosa): acomode as raízes no substrato e preencha até a linha do colo.',
                    'Colar de Pérolas: deite os ramos horizontalmente sobre o substrato poroso, pressionando levemente os nós sobre o solo para enraizarem ao longo de toda a extensão.',
                ],
                proTip: 'Pressione de leve a terra ao redor da haste para que ela não fique frouxa ou tombe.',
            },
            {
                id: 'c_s5',
                stepNumber: 5,
                title: 'PRIMEIRA REGA E LUMINOSIDADE',
                shortTitle: 'Rega Inicial',
                badge: 'Luz indireta',
                icon: AppIcons.DROPLET,
                description:
                    'Regue com cautela para assentar o solo ao redor do corte e posicione em local estratégico.',
                detailedInstructions: [
                    'Faça uma rega moderada para firmar o substrato sem encharcar.',
                    'Mantenha o vaso em local com excelente luminosidade natural INDIRETA.',
                    'NUNCA exponha a estaca a sol direto antes do enraizamento, pois a ausência de raízes fará as folhas desidratarem em poucas horas.',
                ],
                caution: 'Sol forte direto em estaca sem raízes queima as folhas e seca o ramo irreversivelmente.',
            },
            {
                id: 'c_s6',
                stepNumber: 6,
                title: 'SINAIS DE SUCESSO E TRANSIÇÃO',
                shortTitle: 'Enraizamento',
                badge: 'Novos brotos',
                icon: AppIcons.CHECK_CIRCLE,
                description:
                    'Acompanhe os sinais biológicos de que a estaca criou raízes e se tornou uma planta independente.',
                detailedInstructions: [
                    'Tempo médio: entre 2 a 4 semanas para a maioria das espécies.',
                    'Sinal evidente: surgimento de novas brotações verdes e folhas viçosas na ponta da haste.',
                    'Teste suave: puxe a estaca com levíssima pressão; se houver resistência, significa que as novas raízes já agarraram o solo.',
                    'A partir deste ponto, a planta passa aos cuidados regulares de rotina no aplicativo!',
                ],
                proTip: 'Parabéns! Sua nova muda clonada está pronta para crescer forte e saudável no seu jardim.',
            },
        ],
    },
};

export const UNIVERSAL_CARE_TIPS: UniversalTipItem[] = [
    {
        id: 'u1',
        title: 'Dica Universal de Rega',
        subtitle: 'O Teste do Dedo no Solo',
        description:
            'A causa número 1 de perda de plantas no cultivo doméstico é o excesso de água (encharcamento), e não a falta dela.',
        steps: [
            'Insira o dedo indicador cerca de 2 a 3 cm dentro da terra do vaso.',
            'Se o solo estiver úmido, frio ou a terra grudar no dedo: NÃO REGUE.',
            'Regue APENAS se o solo estiver seco ao toque (ou levemente seco, dependendo da espécie).',
            'Sempre garanta que a água em excesso escorra pelos orifícios do fundo do vaso.',
        ],
        benefits: [
            'Previne o apodrecimento letal das raízes.',
            'Evita proliferação de fungos e mosquitinhos do fungo (fungus gnats).',
            'Estimula as raízes a crescerem mais profundas em busca de água.',
        ],
        icon: AppIcons.DROPLET,
    },
    {
        id: 'u2',
        title: 'Adubação Superficial Segura',
        subtitle: 'A Forma Mais Recomendada para Iniciantes',
        description:
            'A adubação por cobertura suave nutre a planta gradualmente a cada rega sem risco de queimar as raízes sensíveis.',
        steps: [
            'Afrouxe delicadamente a camada superficial da terra (1 a 2 cm), sem atingir as raízes profundas.',
            'Espalhe uma pequena quantidade de composto orgânico, húmus de minhoca ou esterco bem curtido.',
            'Misture suavemente apenas na parte superior do solo.',
            'Regue normalmente para ativar os nutrientes.',
        ],
        benefits: [
            'Os nutrientes solúveis descem suavemente com a água a cada rega.',
            'Não machuca e não queima o sistema radicular.',
            'Ideal para alface, manjericão, ervas aromáticas e hortaliças em geral.',
        ],
        icon: AppIcons.LEAF,
    },
];

export const CRITICAL_ALERTS: CriticalAlertItem[] = [
    {
        id: 'a1',
        category: 'toxicity',
        title: 'Toxicidade e Látex Irritante',
        plantName: 'Mini Coroa de Cristo Vermelha',
        scientificName: 'Euphorbia milii var. imperatae',
        alertText:
            'A seiva leitosa (látex) desta planta contém toxinas que podem causar severas irritações na pele, inflamação nos olhos e alergias em crianças ou animais.',
        actionRequired:
            'Mantenha a planta estritamente fora do alcance de crianças e pets. Use luvas de borracha sempre que fizer podas ou manutenção.',
        severity: 'danger',
        icon: AppIcons.WARNING,
    },
    {
        id: 'a2',
        category: 'hazards',
        title: 'Espinhos e Estruturas Perigosas',
        plantName: 'Cacto Coroa de Frade, Ora-pro-nóbis e Capim-Limão',
        scientificName: 'Melocactus zehntneri / Pereskia aculeata / Cymbopogon citratus',
        alertText:
            'O Cacto possui espinhos rígidos protetores; a Ora-pro-nóbis possui ramos longos com espinhos pontiagudos; e o Capim-Limão possui folhas com bordas serrilhadas cortantes.',
        actionRequired:
            'Manuseie com luvas reforçadas de jardinagem ou raspa de couro. Evite áreas de passagem frequente de pessoas.',
        severity: 'warning',
        icon: AppIcons.WARNING,
    },
    {
        id: 'a3',
        category: 'invasive',
        title: 'Comportamento Invasivo e Agressivo',
        plantName: 'Hortelã',
        scientificName: 'Mentha sp.',
        alertText:
            'A hortelã possui raízes e estolões subterrâneos extremamente rápidos e espaçosos, capazes de sufocar e roubar todos os nutrientes de plantas vizinhas.',
        actionRequired:
            'NUNCA plante a hortelã no mesmo vaso ou pequeno canteiro compartilhado com outras espécies. Reserve sempre um vaso individual exclusivo para ela.',
        severity: 'warning',
        icon: AppIcons.CROSSHAIR,
    },
    {
        id: 'a4',
        category: 'transplant',
        title: 'Sensibilidade Alta a Transplantes',
        plantName: 'Coentro e Rabanete',
        scientificName: 'Coriandrum sativum / Raphanus sativus',
        alertText:
            'Ambas as espécies desenvolvem raízes pivotantes profundas muito frágeis. Se o torrão for partido no transplante, a planta sofre parada de crescimento e fenece.',
        actionRequired:
            'Faça SEMEADURA DIRETA no recipiente ou local definitivo. Não utilize sementeiras intermediárias para transplante posterior.',
        severity: 'danger',
        icon: AppIcons.WARNING,
    },
    {
        id: 'a5',
        category: 'container',
        title: 'Exigência de Vaso Transparente',
        plantName: 'Orquídea Phalaenopsis',
        scientificName: 'Phalaenopsis spp.',
        alertText:
            'As raízes da orquídea Phalaenopsis possuem clorofila e necessitam de exposição à luz indireta para realizar processos vitais de fotossíntese.',
        actionRequired:
            'Utilize EXCLUSIVAMENTE vasos transparentes e substrato poroso (casca de pinus/carvão). Nunca use vasos escuros ou terra comum.',
        severity: 'warning',
        icon: AppIcons.SUN,
    },
    {
        id: 'a6',
        category: 'crown',
        title: 'Cuidado Crítico com a Coroa',
        plantName: 'Morango',
        scientificName: 'Fragaria vesca',
        alertText:
            'A coroa (ponto de junção das raízes com o início dos caules e folhas) é extremamente sensível à umidade do solo.',
        actionRequired:
            'Ao plantar a muda, posicione a coroa ESTRITAMENTE ACIMA do nível da terra. Enterrar a coroa causa apodrecimento irreversível da planta.',
        severity: 'danger',
        icon: AppIcons.WARNING,
    },
];

export interface SpeciesCultivationInfo {
    name: string;
    scientificName: string;
    method: CultivationMethodKey;
    methodLabel: string;
    difficulty: 'Fácil' | 'Média' | 'Difícil';
    wateringLevel: 'Baixa' | 'Média' | 'Alta';
    luminosity: 'Baixa' | 'Média' | 'Intensa';
    temperature: 'Baixa' | 'Média' | 'Alta';
    size: 'Pequeno' | 'Médio' | 'Grande';
    type: 'Ornamental' | 'Comestível' | 'Aromática';
    keyGuideline: string;
    alerts?: string[];
}

export const SPECIES_CULTIVATION_MAP: Record<string, SpeciesCultivationInfo> = {
    'jiboia': {
        name: 'Jibóia',
        scientificName: 'Epipremnum aureum',
        method: 'cutting',
        methodLabel: 'Estaca de galho ou muda',
        difficulty: 'Fácil',
        wateringLevel: 'Média',
        luminosity: 'Média',
        temperature: 'Média',
        size: 'Médio',
        type: 'Ornamental',
        keyGuideline:
            'Corte estaca de 10-15 cm e enterre com pelo menos um nó sob o solo úmido. Nunca sol direto por mais de 1 hora.',
        alerts: ['Aguarde de 2 a 3 semanas após o transplante antes de podar.'],
    },
    'manjericao': {
        name: 'Manjericão Verde',
        scientificName: 'Ocimum basilicum',
        method: 'seedling',
        methodLabel: 'Muda ou semente',
        difficulty: 'Média',
        wateringLevel: 'Alta',
        luminosity: 'Intensa',
        temperature: 'Alta',
        size: 'Pequeno',
        type: 'Aromática',
        keyGuideline:
            'Exige de 4 a 6 horas de sol direto por dia e solo levemente úmido. Retire as flores para prolongar as folhas.',
    },
    'oregano': {
        name: 'Orégano',
        scientificName: 'Origanum vulgare',
        method: 'seedling',
        methodLabel: 'Muda ou estaca',
        difficulty: 'Fácil',
        wateringLevel: 'Baixa',
        luminosity: 'Intensa',
        temperature: 'Média',
        size: 'Pequeno',
        type: 'Aromática',
        keyGuideline:
            'Rega baixa e muito sol direto (mínimo 6 horas diárias) para desenvolver aroma intenso.',
    },
    'orquidea': {
        name: 'Orquídea (Phalaenopsis)',
        scientificName: 'Phalaenopsis spp.',
        method: 'seedling',
        methodLabel: 'Muda jovem',
        difficulty: 'Difícil',
        wateringLevel: 'Média',
        luminosity: 'Média',
        temperature: 'Média',
        size: 'Médio',
        type: 'Ornamental',
        keyGuideline:
            'Regue apenas quando o substrato e raízes estiverem secos. Adubação a cada 15 dias após irrigação.',
        alerts: [
            'Exigência de vasos transparentes e substrato especial para fotossíntese nas raízes!',
        ],
    },
    'mini coroa de cristo': {
        name: 'Mini Coroa de Cristo',
        scientificName: 'Euphorbia milii var. imperatae',
        method: 'seedling',
        methodLabel: 'Muda ou estaca',
        difficulty: 'Fácil',
        wateringLevel: 'Baixa',
        luminosity: 'Intensa',
        temperature: 'Alta',
        size: 'Pequeno',
        type: 'Ornamental',
        keyGuideline:
            'Suculenta resistente à seca que floresce o ano todo sob sol pleno.',
        alerts: [
            'Látex irritante e tóxico! Manter fora do alcance de crianças/animais e usar luvas.',
        ],
    },
    'cacto coroa de frade': {
        name: 'Cacto Coroa de Frade',
        scientificName: 'Melocactus zehntneri',
        method: 'seedling',
        methodLabel: 'Muda com torrão',
        difficulty: 'Fácil',
        wateringLevel: 'Baixa',
        luminosity: 'Intensa',
        temperature: 'Alta',
        size: 'Pequeno',
        type: 'Ornamental',
        keyGuideline:
            'Regas espaçadas de 5 a 7 dias em solo arenoso drenado. Necessita de 6 a 8 horas de sol direto.',
        alerts: ['Espinhos rígidos! Manuseie com luvas grossas.'],
    },
    'alface': {
        name: 'Alface Crocantela',
        scientificName: 'Lactuca sativa L',
        method: 'seed',
        methodLabel: 'Semente',
        difficulty: 'Média',
        wateringLevel: 'Alta',
        luminosity: 'Intensa',
        temperature: 'Baixa',
        size: 'Pequeno',
        type: 'Comestível',
        keyGuideline:
            'Semear a 0,5 cm de profundidade ou superfície com umidade constante nas primeiras 14 horas. Desbaste essencial.',
    },
    'hortela': {
        name: 'Hortelã',
        scientificName: 'Mentha sp.',
        method: 'cutting',
        methodLabel: 'Estaca ou touceira',
        difficulty: 'Fácil',
        wateringLevel: 'Alta',
        luminosity: 'Intensa',
        temperature: 'Média',
        size: 'Pequeno',
        type: 'Aromática',
        keyGuideline:
            'Enterre estaca com nós desfolhados. Regue abundantemente após o plantio.',
        alerts: [
            'Planta invasora agressiva! Cultive exclusivamente em vaso individual.',
        ],
    },
    'cebolinha': {
        name: 'Cebolinha',
        scientificName: 'Allium fistulosum',
        method: 'cutting',
        methodLabel: 'Divisão de touceira ou semente',
        difficulty: 'Fácil',
        wateringLevel: 'Média',
        luminosity: 'Intensa',
        temperature: 'Média',
        size: 'Pequeno',
        type: 'Comestível',
        keyGuideline:
            'Separe brotos com raiz e plante a cada 10 cm. Bastante luz solar de 4 a 6 horas.',
    },
    'tomilho': {
        name: 'Tomilho Comum',
        scientificName: 'Thymus vulgaris',
        method: 'cutting',
        methodLabel: 'Estaca de ramo',
        difficulty: 'Fácil',
        wateringLevel: 'Baixa',
        luminosity: 'Intensa',
        temperature: 'Média',
        size: 'Pequeno',
        type: 'Aromática',
        keyGuideline:
            'Solo leve e bem drenado. Regar apenas com solo seco na superfície. Não tolera encharcamento.',
    },
    'couve': {
        name: 'Couve Manteiga',
        scientificName: 'Brassica oleracea',
        method: 'seedling',
        methodLabel: 'Muda em vaso espaçoso',
        difficulty: 'Média',
        wateringLevel: 'Alta',
        luminosity: 'Intensa',
        temperature: 'Média',
        size: 'Médio',
        type: 'Comestível',
        keyGuideline:
            'Vaso grande de 10-20 litros e sol direto de 6 horas por dia. Colha as folhas inferiores.',
    },
    'coentro': {
        name: 'Coentro',
        scientificName: 'Coriandrum sativum',
        method: 'seed',
        methodLabel: 'Semeadura Direta Obrigatória',
        difficulty: 'Média',
        wateringLevel: 'Alta',
        luminosity: 'Intensa',
        temperature: 'Média',
        size: 'Pequeno',
        type: 'Comestível',
        keyGuideline:
            'Semear de 2 a 3 sementes por cova a 1-2 cm de profundidade direto no vaso definitivo.',
        alerts: [
            'Alta sensibilidade a transplante! Exige semeadura direta no local definitivo.',
        ],
    },
    'jade': {
        name: 'Planta Jade',
        scientificName: 'Crassula ovata',
        method: 'cutting',
        methodLabel: 'Estaca de galho ou folha',
        difficulty: 'Fácil',
        wateringLevel: 'Baixa',
        luminosity: 'Intensa',
        temperature: 'Alta',
        size: 'Médio',
        type: 'Ornamental',
        keyGuideline:
            'Substrato arenoso e camada de drenagem reforçada com brita. Deixe secar entre as regas.',
    },
    'violeta': {
        name: 'Violeta',
        scientificName: 'Saintpaulia ionantha',
        method: 'seedling',
        methodLabel: 'Muda de interior',
        difficulty: 'Difícil',
        wateringLevel: 'Média',
        luminosity: 'Média',
        temperature: 'Média',
        size: 'Pequeno',
        type: 'Ornamental',
        keyGuideline:
            'Luz indireta filtrada e rega pelo prato (por baixo) para não molhar as folhas aveludadas.',
    },
    'colar de perolas': {
        name: 'Colar de Pérolas',
        scientificName: 'Curio rowleyanus',
        method: 'cutting',
        methodLabel: 'Estaca de ramo deitado',
        difficulty: 'Difícil',
        wateringLevel: 'Baixa',
        luminosity: 'Média',
        temperature: 'Média',
        size: 'Médio',
        type: 'Ornamental',
        keyGuideline:
            'Deite os ramos horizontalmente sobre terra porosa para que enraízem ao longo dos nós.',
    },
    'samambaia': {
        name: 'Samambaia',
        scientificName: 'Polypodium persicifolium',
        method: 'cutting',
        methodLabel: 'Divisão de touceira',
        difficulty: 'Média',
        wateringLevel: 'Alta',
        luminosity: 'Média',
        temperature: 'Média',
        size: 'Grande',
        type: 'Ornamental',
        keyGuideline:
            'Luz filtrada/indireta e alta umidade. Solo uniformemente úmido sem encharcar.',
    },
    'espada de sao jorge': {
        name: 'Espada de São Jorge',
        scientificName: 'Dracaena trifasciata',
        method: 'cutting',
        methodLabel: 'Divisão de touceira',
        difficulty: 'Fácil',
        wateringLevel: 'Baixa',
        luminosity: 'Média',
        temperature: 'Média',
        size: 'Médio',
        type: 'Ornamental',
        keyGuideline:
            'Separe brotos laterais com raízes. Regar somente quando a terra estiver 100% seca.',
    },
    'tomate cereja': {
        name: 'Tomate Cereja',
        scientificName: 'Solanum lycopersicum',
        method: 'seedling',
        methodLabel: 'Muda com tutoramento',
        difficulty: 'Média',
        wateringLevel: 'Alta',
        luminosity: 'Intensa',
        temperature: 'Alta',
        size: 'Médio',
        type: 'Comestível',
        keyGuideline:
            'Vaso de 10-20L com estaca de bambu para sustentação e 6 horas diárias de sol.',
    },
    'rabanete': {
        name: 'Rabanete Vermelho Comprido',
        scientificName: 'Raphanus sativus',
        method: 'seed',
        methodLabel: 'Semeadura Direta',
        difficulty: 'Fácil',
        wateringLevel: 'Média',
        luminosity: 'Intensa',
        temperature: 'Média',
        size: 'Pequeno',
        type: 'Comestível',
        keyGuideline:
            'Semear a 1-2 cm de profundidade. Ciclo ultra veloz de 25 a 40 dias.',
        alerts: [
            'Raiz sensível a transplante! Exige semeadura direta no local final.',
        ],
    },
    'salsinha': {
        name: 'Salsinha',
        scientificName: 'Petroselinum crispum',
        method: 'seed',
        methodLabel: 'Semente ou muda',
        difficulty: 'Fácil',
        wateringLevel: 'Média',
        luminosity: 'Intensa',
        temperature: 'Média',
        size: 'Pequeno',
        type: 'Aromática',
        keyGuideline:
            'Semeadura a 1 cm mantida úmida até a germinação. Colheita a partir de 10 cm de altura.',
    },
    'melissa': {
        name: 'Melissa Erva Cidreira',
        scientificName: 'Melissa officinalis L.',
        method: 'seedling',
        methodLabel: 'Muda ou estaca',
        difficulty: 'Fácil',
        wateringLevel: 'Média',
        luminosity: 'Média',
        temperature: 'Média',
        size: 'Médio',
        type: 'Aromática',
        keyGuideline:
            'Vaso com boa drenagem e substrato arenoso. Folhas aromáticas com sabor suave de limão.',
    },
    'ora-pro-nobis': {
        name: 'Ora-pro-nóbis',
        scientificName: 'Pereskia aculeata',
        method: 'cutting',
        methodLabel: 'Estaca de caule',
        difficulty: 'Fácil',
        wateringLevel: 'Média',
        luminosity: 'Intensa',
        temperature: 'Alta',
        size: 'Grande',
        type: 'Comestível',
        keyGuideline:
            'Corte de 10 a 15 cm enterrando 1/3 do galho com nó na terra. Alta rusticidade.',
        alerts: ['Ramos com espinhos afiados! Use luvas ao colher.'],
    },
    'pimenta biquinho': {
        name: 'Pimenta Biquinho',
        scientificName: 'Capsicum chinense',
        method: 'seedling',
        methodLabel: 'Muda com torrão',
        difficulty: 'Média',
        wateringLevel: 'Alta',
        luminosity: 'Intensa',
        temperature: 'Alta',
        size: 'Médio',
        type: 'Comestível',
        keyGuideline:
            'Sol pleno (4 a 6 horas) e solo levemente úmido. Frutos doces sem ardência.',
    },
    'babosa': {
        name: 'Babosa (Aloe vera)',
        scientificName: 'Aloe vera',
        method: 'cutting',
        methodLabel: 'Divisão de broto lateral',
        difficulty: 'Fácil',
        wateringLevel: 'Baixa',
        luminosity: 'Intensa',
        temperature: 'Alta',
        size: 'Médio',
        type: 'Ornamental',
        keyGuideline:
            'Separe o broto lateral da base da planta mãe. Regar só com solo completamente seco.',
    },
    'morango': {
        name: 'Morango',
        scientificName: 'Fragaria vesca',
        method: 'seedling',
        methodLabel: 'Muda em jardineira',
        difficulty: 'Média',
        wateringLevel: 'Média',
        luminosity: 'Intensa',
        temperature: 'Média',
        size: 'Pequeno',
        type: 'Comestível',
        keyGuideline:
            'Sol direto 6 horas por dia e irrigação moderada na base da planta.',
        alerts: [
            'Ao plantar a muda, a coroa (junção raiz-folhas) deve ficar ESTRITAMENTE ACIMA da terra para não apodrecer!',
        ],
    },
    'erva doce': {
        name: 'Erva Doce',
        scientificName: 'Pimpinella anisum L.',
        method: 'seed',
        methodLabel: 'Semeadura',
        difficulty: 'Média',
        wateringLevel: 'Média',
        luminosity: 'Intensa',
        temperature: 'Média',
        size: 'Médio',
        type: 'Aromática',
        keyGuideline:
            'Semear a 1-2 cm de profundidade em vaso fundo. Poda de folhas secas incentiva brotos.',
    },
    'capim cidreira': {
        name: 'Capim Cidreira ou Limão',
        scientificName: 'Cymbopogon citratus',
        method: 'cutting',
        methodLabel: 'Divisão de touceira',
        difficulty: 'Fácil',
        wateringLevel: 'Baixa',
        luminosity: 'Intensa',
        temperature: 'Alta',
        size: 'Grande',
        type: 'Aromática',
        keyGuideline:
            'Vaso grande com boa drenagem sob sol direto constante.',
        alerts: ['Folhas longas com bordas cortantes! Cuidado no manuseio.'],
    },
    'beterraba': {
        name: 'Beterraba Maravilha',
        scientificName: 'Beta vulgaris esculenta',
        method: 'seed',
        methodLabel: 'Semeadura em vaso fundo',
        difficulty: 'Fácil',
        wateringLevel: 'Média',
        luminosity: 'Intensa',
        temperature: 'Média',
        size: 'Pequeno',
        type: 'Comestível',
        keyGuideline:
            'Semear de 2 a 3 sementes a 1-2 cm de profundidade em vaso fundo (25-30cm) sem pedras.',
    },
    'rucula': {
        name: 'Rúcula',
        scientificName: 'Eruca sativa',
        method: 'seed',
        methodLabel: 'Semeadura rasa',
        difficulty: 'Fácil',
        wateringLevel: 'Média',
        luminosity: 'Intensa',
        temperature: 'Média',
        size: 'Pequeno',
        type: 'Comestível',
        keyGuideline:
            'Semear a 0,5 cm de profundidade. Regar manhã e tarde com jato tipo chuveirinho.',
    },
    'almeirao': {
        name: 'Almeirão Amarelo',
        scientificName: 'Cichorium intybus intybus',
        method: 'seedling',
        methodLabel: 'Muda ou semente',
        difficulty: 'Fácil',
        wateringLevel: 'Alta',
        luminosity: 'Intensa',
        temperature: 'Média',
        size: 'Médio',
        type: 'Comestível',
        keyGuideline:
            'Solo bem drenado e regas frequentes para evitar amargor excessivo nas folhas.',
    },
};

export function getSpeciesCultivationInfo(nameOrSpecies?: string): SpeciesCultivationInfo | null {
    if (!nameOrSpecies) return null;

    const normalized = nameOrSpecies
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

    for (const [key, info] of Object.entries(SPECIES_CULTIVATION_MAP)) {
        const normalizedKey = key
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');

        if (normalized.includes(normalizedKey) || normalizedKey.includes(normalized)) {
            return info;
        }
    }

    return null;
}

export function getCriticalAlertsForSpecies(nameOrSpecies?: string): CriticalAlertItem[] {
    if (!nameOrSpecies) return [];

    const normalized = nameOrSpecies
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

    return CRITICAL_ALERTS.filter(alert => {
        const normPlant = alert.plantName
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
        const normSci = alert.scientificName
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');

        return (
            normPlant.includes(normalized) ||
            normalized.includes(normPlant) ||
            normSci.includes(normalized)
        );
    });
}

export function getSpeciesSpecificMaterials(
    nameOrSpecies: string,
    baseMaterials: MaterialItem[],
): MaterialItem[] {
    const normalized = nameOrSpecies
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

    if (normalized.includes('orquidea')) {
        return [
            {
                id: 'sp_orq_1',
                name: 'Vaso Plástico Transparente',
                description:
                    'OBRIGATÓRIO para permitir a entrada de luz e fotossíntese nas raízes.',
                required: true,
            },
            {
                id: 'sp_orq_2',
                name: 'Substrato Específico para Orquídeas',
                description:
                    'Casca de pinus, carvão e fibra de coco (NUNCA usar terra comum).',
                required: true,
            },
            {
                id: 'sp_orq_3',
                name: 'Muda de Orquídea com Raízes Vivas',
                description: 'Raízes saudáveis prateadas ou verdes.',
                required: true,
            },
            {
                id: 'sp_orq_4',
                name: 'Adubo Específico para Orquídeas',
                description: 'Para aplicação a cada 15 dias após irrigação.',
                required: false,
            },
        ];
    }

    if (normalized.includes('coroa de cristo')) {
        return [
            {
                id: 'sp_cor_1',
                name: 'Muda com Torrão Intacto',
                description: 'Muda vigorosa com botões.',
                required: true,
            },
            {
                id: 'sp_cor_2',
                name: 'Luvas de Borracha ou Jardinagem',
                description:
                    'OBRIGATÓRIAS no plantio e manuseio devido ao látex irritante.',
                required: true,
            },
            {
                id: 'sp_cor_3',
                name: 'Vaso com Furos e Drenagem',
                description: 'Camada de brita ou pedras para rápida drenagem.',
                required: true,
            },
            {
                id: 'sp_cor_4',
                name: 'Substrato Leve com Areia Grossa',
                description: 'pH entre 6.0 e 7.0 de secagem rápida.',
                required: true,
            },
        ];
    }

    if (normalized.includes('morango')) {
        return [
            {
                id: 'sp_mor_1',
                name: 'Muda Saudável de Morangueiro',
                description: 'Com raízes claras e coroa íntegra.',
                required: true,
            },
            {
                id: 'sp_mor_2',
                name: 'Vaso Amplo ou Jardineira Rasa',
                description:
                    'Permite que os frutos fiquem suspensos e não toquem a terra molhada.',
                required: true,
            },
            {
                id: 'sp_mor_3',
                name: 'Substrato Rico em Matéria Orgânica',
                description:
                    'pH ligeiramente ácido (5.5 a 6.5) e boa aeração.',
                required: true,
            },
            {
                id: 'sp_mor_4',
                name: 'Regador com Bico Fino',
                description:
                    'Para irrigação na base sem molhar a coroa nem as folhas.',
                required: true,
            },
        ];
    }

    if (normalized.includes('hortela')) {
        return [
            {
                id: 'sp_hor_1',
                name: 'Ramo de Estaca ou Broto com Raízes',
                description:
                    'Estaca de 10-15 cm ou broto lateral com radicelas.',
                required: true,
            },
            {
                id: 'sp_hor_2',
                name: 'Vaso Individual Exclusivo',
                description:
                    'CRÍTICO: Nunca plantar junto a outras espécies para não sufocá-las.',
                required: true,
            },
            {
                id: 'sp_hor_3',
                name: 'Terra Vegetal Rica em Composto',
                description: 'Substrato úmido e fértil.',
                required: true,
            },
            {
                id: 'sp_hor_4',
                name: 'Regador para Irrigação Abundante',
                description:
                    'Para manter o solo sempre fresco e hidratado.',
                required: true,
            },
        ];
    }

    if (normalized.includes('coentro') || normalized.includes('rabanete')) {
        return [
            {
                id: 'sp_sem_1',
                name: 'Sementes Selecionadas',
                description: '2 a 3 sementes por cova.',
                required: true,
            },
            {
                id: 'sp_sem_2',
                name: 'Vaso DEFINITIVO de Média Profundidade',
                description:
                    'OBRIGATÓRIO: Semeadura direta! Raiz pivotante sensível a transplante.',
                required: true,
            },
            {
                id: 'sp_sem_3',
                name: 'Substrato Fértil e Solto',
                description:
                    'Terra vegetal fofa e bem drenada para a raiz crescer desimpedida.',
                required: true,
            },
            {
                id: 'sp_sem_4',
                name: 'Borrifador para Rega Suave',
                description:
                    'Mantém a umidade sem deslocar as sementes.',
                required: true,
            },
        ];
    }

    if (normalized.includes('tomate')) {
        return [
            {
                id: 'sp_tom_1',
                name: 'Muda de Tomatinho Cereja',
                description:
                    'Muda vigorosa com 4 a 6 folhas verdadeiras.',
                required: true,
            },
            {
                id: 'sp_tom_2',
                name: 'Vaso Grande e Fundo (10 a 20 Litros)',
                description: 'Com camada generosa de drenagem no fundo.',
                required: true,
            },
            {
                id: 'sp_tom_3',
                name: 'Tutor ou Estaca de Bambu / Suporte',
                description:
                    'Essencial para amarrar e conduzir o crescimento dos ramos.',
                required: true,
            },
            {
                id: 'sp_tom_4',
                name: 'Terra Vegetal Adubada com Húmus',
                description:
                    'Rica em nutrientes para apoiar a frutificação.',
                required: true,
            },
        ];
    }

    if (
        normalized.includes('cacto') ||
        normalized.includes('ora-pro-nobis') ||
        normalized.includes('capim')
    ) {
        return [
            ...baseMaterials,
            {
                id: 'sp_haz_1',
                name: 'Luvas de Proteção Reforçadas',
                description:
                    'Indispensável para proteção contra espinhos e bordas cortantes.',
                required: true,
            },
        ];
    }

    return baseMaterials;
}
