export interface PlantCareGuideData {
    solo: string;
    clima: string;
    iluminacao: string;
    rega: string;
    poda?: string;
    dicas?: string;
}

const PLANT_CARE_DATABASE: Record<string, PlantCareGuideData> = {
    'jiboia': {
        solo: 'Leve, fértil, bem drenado e rico em matéria orgânica.',
        clima: 'Extremamente adaptável ao ambiente, evitando frio intenso e geadas. Temperatura ideal entre 18°C e 26°C.',
        iluminacao: 'Iluminação indireta. Evite sol direto por mais de 1 hora.',
        rega: 'Tolera curtos períodos de estiagem. Verifique se o substrato está seco antes de regar. Reforce no verão e diminua no inverno.',
        poda: 'Realize poda de limpeza na primavera, retirando folhas secas e galhos mal formados.',
        dicas: 'Excelente purificadora de ar para ambientes internos. Gosta de umidade nas folhas.',
    },
    'manjericao': {
        solo: 'Prefere solos bem drenados e ricos em matéria orgânica. Mistura de terra vegetal com areia e húmus de minhoca.',
        clima: 'Temperatura ideal de 20°C a 30°C. Mínimo tolerável de 15°C. Não tolera geada.',
        iluminacao: 'Necessita de 4 a 6 horas de sol direto por dia (varandas ensolaradas ou janelas).',
        rega: 'Irrigação regular, mantendo o solo sempre levemente úmido, sem encharcar.',
        poda: 'Retire as flores assim que surgirem para estimular o crescimento contínuo das folhas aromáticas.',
        dicas: 'Ideal para temperos culinários e hortas domésticas em vasos.',
    },
    'oregano': {
        solo: 'Prefere solos bem drenados e ricos em matéria orgânica (pH entre 6.0 e 8.0).',
        clima: 'Adaptado a climas amenos a quentes (15°C a 30°C). Bastante resistente à seca.',
        iluminacao: 'Necessita de sol direto por pelo menos 6 horas diárias.',
        rega: 'Rega baixa, mantendo o solo levemente úmido, mas nunca encharcado.',
        poda: 'Pode os ramos floridos para manter a planta densa e produtiva.',
        dicas: 'Desenvolve aroma mais intenso quando exposto à luz solar direta constante.',
    },
    'orquidea': {
        solo: 'Substrato específico para orquídeas com boa aeração e drenagem rápida.',
        clima: 'Temperatura média ideal entre 18°C e 25°C com boa ventilação.',
        iluminacao: 'Luminosidade indireta constante. Evite sol direto nas folhas para não queimar.',
        rega: 'Regue somente quando o substrato estiver completamente seco ao toque.',
        poda: 'Adubação a cada 15 dias após a irrigação para manter floração contínua.',
        dicas: 'Gosta de vasos com excelente drenagem e proteção contra correntes de ar frio.',
    },
    'mini coroa de cristo': {
        solo: 'Solos bem drenados e ricos em matéria orgânica (pH entre 6.0 e 7.0). Misturar areia ao solo.',
        clima: 'Resistente ao calor e seca. Ideal entre 20°C e 32°C. Não tolera geadas.',
        iluminacao: 'Necessita de sol pleno para florir abundantemente.',
        rega: 'Baixa exigência hídrica. Permita que o solo seque entre as regas.',
        dicas: 'Suculenta compacta e resistente. Cuidado: o látex pode causar irritação.',
    },
    'cacto coroa de frade': {
        solo: 'Solos arenosos, porosos e muito bem drenados (areia grossa e pequenas pedras).',
        clima: 'Climas quentes e secos. Ideal entre 22°C e 35°C. Proteja de geadas.',
        iluminacao: 'Luz solar direta constante (6 a 8 horas por dia).',
        rega: 'Espaçada entre 5 e 7 dias. Deixe o solo secar completamente.',
        dicas: 'Crescimento lento e formato globular exótico.',
    },
    'alface': {
        solo: 'Fértil, leve, rico em matéria orgânica e bem drenado (pH 6.0 a 7.0).',
        clima: 'Climas frescos e úmidos. Temperatura ideal entre 10°C e 24°C.',
        iluminacao: 'De 4 a 6 horas diárias de sol direto, tolerando meia-sombra.',
        rega: 'Frequente, mantendo o solo constantemente úmido sem encharcamento.',
        dicas: 'Excelente opção para hortas caseiras e consumo fresco.',
    },
    'hortela': {
        solo: 'Enriquecido com matéria orgânica e com boa drenagem.',
        clima: 'Clima ameno (15°C a 25°C). Tolera até 30°C.',
        iluminacao: 'Sol pleno ou meia-sombra.',
        rega: 'Abundante após o plantio e regular para manter o solo úmido.',
        poda: 'Corte as pontas das hastes para incentivar ramos laterais.',
        dicas: 'Cultive em vaso individual, pois suas raízes se espalham rapidamente.',
    },
    'cebolinha': {
        solo: 'Rico em matéria orgânica, leve e com excelente drenagem.',
        clima: 'Temperatura ideal entre 15°C e 25°C.',
        iluminacao: 'Bastante luz solar (4 a 6 horas diretas por dia).',
        rega: 'Regas regulares mantendo o solo úmido sem encharcar.',
        poda: 'Colheita contínua cortando as folhas externas rente à base.',
    },
    'tomilho': {
        solo: 'Fértil, bem drenado e enriquecido com composto orgânico.',
        clima: 'Prefere clima quente e úmido (15°C a 30°C). Não tolera geadas fortes.',
        iluminacao: 'Sol pleno ou meia-sombra.',
        rega: 'Regar quando a superfície do solo estiver seca. Evite o encharcamento.',
        poda: 'Pode os ramos que florescerem para fortalecer a folhagem.',
    },
    'couve': {
        solo: 'Rico em matéria orgânica e bem drenado.',
        clima: 'Climas temperados a frios (15°C a 25°C). Tolera geadas leves.',
        iluminacao: 'Luz solar direta pelo menos 6 horas por dia.',
        rega: 'Mantenha o solo consistentemente úmido com irrigação regular.',
        poda: 'Retire as folhas inferiores mais velhas para incentivar novos brotos.',
    },
    'coentro': {
        solo: 'Fértil, leve e bem drenado, enriquecido com composto orgânico.',
        clima: 'Climas amenos (15°C a 25°C). Evite calor extremo para não espigar.',
        iluminacao: 'Sol pleno por 4 a 6 horas diárias.',
        rega: 'Umidade constante sem encharcamento (2 a 3 vezes por semana).',
    },
    'jade': {
        solo: 'Arenoso, fértil e muito bem drenado.',
        clima: 'Adapta-se bem a vários climas, mas não tolera frio intenso.',
        iluminacao: 'Sol pleno ou meia-sombra bastante iluminada.',
        rega: 'Suculenta resistente: regue apenas quando o solo estiver seco.',
        dicas: 'Folhas podem adquirir bordas avermelhadas sob sol pleno.',
    },
    'violeta': {
        solo: 'Leve, rico em matéria orgânica e misturado com perlita (pH 5.5 a 6.5).',
        clima: 'Clima quente e úmido de interiores (18°C a 24°C).',
        iluminacao: 'Luz indireta ou filtrada em abundância.',
        rega: 'Regue pela base evitando molhar as folhas carnosas.',
        dicas: 'Floresce o ano todo em ambientes internos bem iluminados.',
    },
    'colar de perolas': {
        solo: 'Poroso, altamente drenado, ideal para cactos e suculentas.',
        clima: 'Temperaturas amenas acima de 5°C.',
        iluminacao: 'Boa luminosidade indireta, evitando sol forte direto.',
        rega: 'Rega moderada e espaçada. Deixe o substrato secar entre as regas.',
        poda: 'Faça mudas cortando ramos desproporcionais.',
    },
    'samambaia': {
        solo: 'Rico em matéria orgânica, umidade e boa drenagem (turfa, perlita e areia).',
        clima: 'Subtropical/tropical úmido. Tolera borrifos de água nas folhas.',
        iluminacao: 'Luz filtrada ou indireta. Evite sol direto.',
        rega: 'Mantenha o solo uniformemente úmido sem encharcar.',
        poda: 'Remova frondes amareladas ou secas na base.',
    },
    'espada de sao jorge': {
        solo: 'Adaptável a solos pobres desde que tenham boa drenagem.',
        clima: 'Resistente tanto ao frio quanto ao calor (18°C a 30°C).',
        iluminacao: 'Meia-sombra ou sol pleno.',
        rega: 'Rega apenas quando o solo estiver completamente seco.',
        dicas: 'Extremamente rústica e purificadora de ar.',
    },
    'tomate cereja': {
        solo: 'Fértil, rico em matéria orgânica e bem drenado (pH 5.5 a 6.8).',
        clima: 'Climas quentes e amenos (20°C a 30°C).',
        iluminacao: 'Pelo menos 6 horas diárias de sol direto.',
        rega: 'Frequente, mantendo o solo úmido e regando pela base.',
        poda: 'Retire os brotos ladrões para direcionar força aos frutos.',
    },
    'rabanete': {
        solo: 'Solos soltos, bem drenados e ricos em matéria orgânica (pH 6.0 a 7.0).',
        clima: 'Clima ameno e fresco (10°C a 25°C).',
        iluminacao: 'Locais ensolarados com sol pleno.',
        rega: 'Mantenha o solo constantemente úmido durante todo o ciclo curto.',
    },
    'salsinha': {
        solo: 'Rico em matéria orgânica, bem drenado e com umidade constante.',
        clima: 'Clima temperado ameno. Evite calor excessivo.',
        iluminacao: 'Sol pleno ou sombra parcial.',
        rega: 'Regular sempre que o solo estiver seco na superfície.',
        poda: 'Colha cortando as hastes externas a partir de 10 cm de altura.',
    },
    'melissa': {
        solo: 'Fértil, rico em matéria orgânica e com boa drenagem.',
        clima: 'Clima temperado (15°C a 25°C).',
        iluminacao: 'Sol direto ou meia-sombra.',
        rega: 'Mantenha o solo levemente úmido com moderação.',
        dicas: 'Folhas aromáticas com sabor suave de limão para chás calmantes.',
    },
    'ora-pro-nobis': {
        solo: 'Adaptável a diversos solos com preferência por boa drenagem.',
        clima: 'Clima tropical e alta adaptação ao calor.',
        iluminacao: 'Intensa / Sol pleno.',
        rega: 'Rega média com umidade moderada.',
        dicas: 'Hortalça não convencional ("carne verde") rica em proteínas.',
    },
    'pimenta biquinho': {
        solo: 'Solto, fértil, permeável e rico em matéria orgânica.',
        clima: 'Clima quente e úmido (20°C a 30°C).',
        iluminacao: 'Preferencialmente sol pleno (4 a 6 horas diretas).',
        rega: 'Irrigação frequente mantendo o solo levemente úmido.',
        dicas: 'Frutos doces e saborosos sem picância forte.',
    },
    'babosa': {
        solo: 'Leve, arenoso e muito bem drenado.',
        clima: 'Climas quentes, secos e ensolarados (20°C a 30°C).',
        iluminacao: 'Sol pleno ou meia-sombra com alta luminosidade.',
        rega: 'Moderada e espaçada. Regue apenas quando o solo estiver seco.',
        dicas: 'Gel interno com ricas propriedades medicinais e cosméticas.',
    },
    'morango': {
        solo: 'Bem drenado, rico em composto orgânico (pH 5.5 a 6.5).',
        clima: 'Temperado com verões frescos e invernos suaves.',
        iluminacao: 'Sol direto pelo menos 6 horas por dia.',
        rega: 'Moderada evitando encharcamento do solo.',
        dicas: 'Fruto saboroso e rico em antioxidantes.',
    },
    'erva doce': {
        solo: 'Leve, bem drenado e rico em matéria orgânica.',
        clima: 'Climas temperados e quentes.',
        iluminacao: 'Muita luz solar direta (pelo menos 6 horas/dia).',
        rega: 'Regas regulares para manter o solo levemente úmido.',
        poda: 'Pode regularmente flores e folhas secas para incentivar novos ramos.',
    },
    'capim cidreira': {
        solo: 'Bem drenado e rico em matéria orgânica (pH 5.5 a 7.0).',
        clima: 'Clima tropical quente e úmido (20°C a 30°C).',
        iluminacao: 'Luz solar direta constante.',
        rega: 'Regular mantendo o solo levemente úmido.',
    },
    'beterraba': {
        solo: 'Solos soltos, bem drenados e ricos em matéria orgânica (pH 6.0 a 7.0).',
        clima: 'Clima ameno (15°C a 25°C).',
        iluminacao: 'Sol pleno.',
        rega: 'Regular mantendo o solo úmido sem encharcar.',
    },
    'rucula': {
        solo: 'Bem drenado, fértil e rico em matéria orgânica.',
        clima: 'Clima fresco nem quente nem frio.',
        iluminacao: 'Sol pleno.',
        rega: 'Regar de manhã e ao final da tarde.',
    },
    'almeirao': {
        solo: 'Bem drenado, rico em matéria orgânica (pH 6.0 a 7.5).',
        clima: 'Temperatura ideal entre 15°C e 25°C.',
        iluminacao: 'Sol pleno (4 a 6 horas diárias).',
        rega: 'Frequente mantendo o solo levemente úmido.',
    },
};

const DEFAULT_GUIDE: PlantCareGuideData = {
    solo: 'Prefere solos bem drenados, ricos em matéria orgânica e com boa retenção de umidade.',
    clima: 'Adapta-se bem ao cultivo doméstico em temperaturas amenas entre 18°C e 28°C.',
    iluminacao: 'Cultivar em local bem iluminado com luz solar direta ou indireta de 4 a 6 horas por dia.',
    rega: 'Regue quando a camada superficial do solo estiver seca, evitando o excesso de água.',
    poda: 'Realize podas de limpeza e remova folhas secas ou danificadas quando necessário.',
};

export function getSpeciesCareGuide(plantNameOrSpecies?: string): PlantCareGuideData {
    if (!plantNameOrSpecies) return DEFAULT_GUIDE;

    const normalized = plantNameOrSpecies
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

    for (const [key, guide] of Object.entries(PLANT_CARE_DATABASE)) {
        const normalizedKey = key
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');

        if (normalized.includes(normalizedKey) || normalizedKey.includes(normalized)) {
            return guide;
        }
    }

    return DEFAULT_GUIDE;
}
