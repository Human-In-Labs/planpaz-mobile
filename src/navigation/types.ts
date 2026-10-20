import { Post } from '../shared/types/social';
import { StageSuggestion } from '../shared/api/garden';

export type RootStackParamList = {
    Onboarding: undefined;
    Login: undefined;
    Register: undefined;
    RegisterStep2: { email: string; password: string; };
    ForgotPassword: undefined;
    ValidateCode: { email?: string; } | undefined;
    ResetPassword: { email?: string; code?: string; } | undefined;
    MainTabs: undefined;
    Library: undefined;
    SpeciesDetails: { speciesId: string; };
    AddPlant: { speciesId?: string; speciesName?: string; } | undefined;
    UserProfile: { userId: string; };
    Reminders: undefined;
    PlantingGuide: { method?: 'seed' | 'cutting' | 'seedling'; speciesName?: string; speciesId?: string; } | undefined;
};

export type ProfileStackParamList = {
    ProfileMain: undefined;
    Configuracoes: undefined;
    Achievements: {
        userId?: string;
        username?: string;
    } | undefined;
    UserProfile: { userId: string; };
};
export type GardenStackParamList = {
    GardenMain: undefined;
    PlantDetails: { plantId: string; };
    EditPlant: { plantId: string; };
    StageSuggestion: { plantId: string; suggestion: StageSuggestion; };
    Library: undefined;
    SpeciesDetails: { speciesId: string; };
    AddPlant: { speciesId?: string; speciesName?: string; } | undefined;
    UserProfile: { userId: string; };
    PlantingGuide: { method?: 'seed' | 'cutting' | 'seedling'; speciesName?: string; speciesId?: string; } | undefined;
};

export type SocialStackParamList = {
    SocialMain: undefined;
    PostIndividual: {
        postId: string;
        post?: Post;
        isLiked?: boolean;
    };
    CreatePost: undefined;
    UserProfile: {
        userId: string;
    };
    Achievements: {
        userId?: string;
        username?: string;
    } | undefined;
};