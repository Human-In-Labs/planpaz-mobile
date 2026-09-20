import { LocationSearchData } from '../types/locationSearch';

const CITIES_LIST: LocationSearchData[] = [
    { id: '1', city: 'São Paulo', state: 'SP', country: 'BR', neighborhood: 'Centro' },
    { id: '2', city: 'Rio de Janeiro', state: 'RJ', country: 'BR', neighborhood: 'Copacabana' },
    { id: '3', city: 'Belo Horizonte', state: 'MG', country: 'BR', neighborhood: 'Savassi' },
    { id: '4', city: 'Curitiba', state: 'PR', country: 'BR', neighborhood: 'Batel' },
    { id: '5', city: 'Porto Alegre', state: 'RS', country: 'BR', neighborhood: 'Moinhos' },
    { id: '6', city: 'Salvador', state: 'BA', country: 'BR', neighborhood: 'Barra' },
    { id: '7', city: 'Recife', state: 'PE', country: 'BR', neighborhood: 'Boa Viagem' },
    { id: '8', city: 'Fortaleza', state: 'CE', country: 'BR', neighborhood: 'Meireles' },
    { id: '9', city: 'Brasília', state: 'DF', country: 'BR', neighborhood: 'Asa Sul' },
    { id: '10', city: 'Campinas', state: 'SP', country: 'BR', neighborhood: 'Cambuí' },
    { id: '11', city: 'Guarulhos', state: 'SP', country: 'BR', neighborhood: 'Centro' },
    { id: '12', city: 'Florianópolis', state: 'SC', country: 'BR', neighborhood: 'Centro' },
    { id: '13', city: 'Goiânia', state: 'GO', country: 'BR', neighborhood: 'Setor Bueno' },
    { id: '14', city: 'Manaus', state: 'AM', country: 'BR', neighborhood: 'Adrianópolis' },
    { id: '15', city: 'Belém', state: 'PA', country: 'BR', neighborhood: 'Umarizal' },
    { id: '16', city: 'Sorocaba', state: 'SP', country: 'BR', neighborhood: 'Centro' },
    { id: '17', city: 'Ribeirão Preto', state: 'SP', country: 'BR', neighborhood: 'Centro' },
    { id: '18', city: 'São José dos Campos', state: 'SP', country: 'BR', neighborhood: 'Centro' },
    { id: '19', city: 'Santos', state: 'SP', country: 'BR', neighborhood: 'Gonzaga' },
    { id: '20', city: 'Uberlândia', state: 'MG', country: 'BR', neighborhood: 'Center' },
    { id: '21', city: 'Niterói', state: 'RJ', country: 'BR', neighborhood: 'Icaraí' },
    { id: '22', city: 'Maringá', state: 'PR', country: 'BR', neighborhood: 'Zona 01' },
    { id: '23', city: 'Londrina', state: 'PR', country: 'BR', neighborhood: 'Gleba Palhano' },
];

export const locationService = {
    async getAll(): Promise<LocationSearchData[]> {
        return CITIES_LIST;
    },

    async search(query: string): Promise<LocationSearchData[]> {
        const raw = query.trim();
        if (!raw) {
            return CITIES_LIST;
        }

        const term = raw.toLowerCase();

        // 1. Tenta filtrar na lista pré-definida de cidades
        const filtered = CITIES_LIST.filter(loc =>
            loc.city.toLowerCase().includes(term) ||
            loc.state.toLowerCase().includes(term) ||
            loc.neighborhood.toLowerCase().includes(term)
        );

        if (filtered.length > 0) {
            return filtered;
        }

        // 2. Se o usuário digitou "Cidade, UF" ou "Cidade - UF"
        let parsedCity = raw;
        let parsedState = 'BR';
        if (raw.includes(',') || raw.includes('-')) {
            const parts = raw.split(/[,-]/);
            if (parts.length >= 2) {
                parsedCity = parts[0].trim();
                parsedState = parts[1].trim().toUpperCase().substring(0, 2);
            }
        }

        const formattedCity = parsedCity.charAt(0).toUpperCase() + parsedCity.slice(1);

        return [
            {
                id: `custom-${Date.now()}`,
                city: formattedCity,
                state: parsedState,
                country: 'BR',
                neighborhood: formattedCity,
            },
        ];
    },
};