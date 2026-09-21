import { Post } from '../shared/types/social';

export type RootStackParamList = {
    Onboarding: undefined;
    Login: undefined;
    Register: undefined;
    RegisterStep2: { email: string; password: string; };
    ForgotPassword: undefined;
    ValidateCode: undefined;
    ResetPassword: undefined;
    MainTabs: undefined;
    Library: undefined;
    SpeciesDetails: { speciesId: string; };
    AddPlant: { speciesId?: string; speciesName?: string; } | undefined;
    UserProfile: { userId: string; };
};

export type ProfileStackParamList = {
    ProfileMain: undefined;
    Configuracoes: undefined;
    Achievements: undefined;
    UserProfile: { userId: string; };
};

export type GardenStackParamList = {
    GardenMain: undefined;
    PlantDetails: { plantId: string; };
    EditPlant: { plantId: string; };
    Library: undefined;
    SpeciesDetails: { speciesId: string; };
    AddPlant: { speciesId?: string; speciesName?: string; } | undefined;
    UserProfile: { userId: string; };
};

export type SocialStackParamList = {
    SocialMain: undefined;
    PostIndividual: { postId: string; post?: Post; isLiked?: boolean; };
    CreatePost: undefined;
    UserProfile: { userId: string; };
};
