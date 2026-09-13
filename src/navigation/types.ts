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
};

export type ProfileStackParamList = {
    ProfileMain: undefined;
    Configuracoes: undefined;
    Achievements: undefined;
};
