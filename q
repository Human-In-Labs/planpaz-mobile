warning: in the working copy of 'src/features/auth/errors/ErrorPopup/index.tsx', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'src/features/auth/forgot-password/index.tsx', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'src/features/auth/register/RegisterStep2/index.tsx', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'src/features/auth/register/index.tsx', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'src/navigation/AppNavigator.tsx', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'src/shared/constants/appIcons.ts', LF will be replaced by CRLF the next time Git touches it
[1mdiff --git a/src/features/auth/errors/ErrorPopup/index.tsx b/src/features/auth/errors/ErrorPopup/index.tsx[m
[1mindex 958366a..29e8dce 100644[m
[1m--- a/src/features/auth/errors/ErrorPopup/index.tsx[m
[1m+++ b/src/features/auth/errors/ErrorPopup/index.tsx[m
[36m@@ -3,6 +3,7 @@[m [mimport { View, Text } from 'react-native';[m
 import AppIcon from '../../../../shared/components/AppIcon';[m
 import { colors } from '../../../../shared/theme';[m
 import { styles } from './styles';[m
[32m+[m[32mimport { AppIcons } from '../../../../shared/constants/appIcons';[m
 [m
 export interface ErrorPopupProps {[m
   visible: boolean;[m
[36m@@ -17,7 +18,7 @@[m [mexport default function ErrorPopup({ visible, message }: ErrorPopupProps) {[m
   return ([m
     <View style={styles.container} pointerEvents="none">[m
       <View style={styles.iconWrapper}>[m
[31m-        <AppIcon icon={'warning' as any} size={20} color={colors.warning} />[m
[32m+[m[32m        <AppIcon icon={AppIcons.WARNING} size={20} color={colors.warning} />[m
       </View>[m
       <Text style={styles.message} numberOfLines={2}>[m
         {message}[m
[1mdiff --git a/src/features/auth/forgot-password/index.tsx b/src/features/auth/forgot-password/index.tsx[m
[1mindex 799bfaa..3cbf8fe 100644[m
[1m--- a/src/features/auth/forgot-password/index.tsx[m
[1m+++ b/src/features/auth/forgot-password/index.tsx[m
[36m@@ -55,7 +55,7 @@[m [mexport default function ForgotPasswordScreen() {[m
           <TextInput[m
             style={[styles.input, emailError && styles.inputError]}[m
             placeholder="Email"[m
[31m-            placeholderTextColor={colors.black}[m
[32m+[m[32m            placeholderTextColor={emailError && !email ? colors.warning : colors.black}[m
             value={email}[m
             onChangeText={(text) => {[m
               setEmail(text);[m
[1mdiff --git a/src/features/auth/login/index.tsx b/src/features/auth/login/index.tsx[m
[1mindex fc20c01..242efac 100644[m
[1m--- a/src/features/auth/login/index.tsx[m
[1m+++ b/src/features/auth/login/index.tsx[m
[36m@@ -105,7 +105,7 @@[m [mexport default function LoginScreen() {[m
           <TextInput[m
             style={[styles.inputEmail, emailError && styles.inputError]}[m
             placeholder="Email"[m
[31m-            placeholderTextColor={colors.black}[m
[32m+[m[32m            placeholderTextColor={emailError && !email ? colors.warning : colors.black}[m
             value={email}[m
             onChangeText={(text) => {[m
               setEmail(text);[m
[1mdiff --git a/src/features/auth/register/RegisterStep2/index.tsx b/src/features/auth/register/RegisterStep2/index.tsx[m
[1mindex 557468c..66a4459 100644[m
[1m--- a/src/features/auth/register/RegisterStep2/index.tsx[m
[1m+++ b/src/features/auth/register/RegisterStep2/index.tsx[m
[36m@@ -97,7 +97,7 @@[m [mexport default function RegisterStep2Screen() {[m
           <TextInput[m
             style={[styles.input, firstNameError && styles.inputError]}[m
             placeholder="Primeiro nome"[m
[31m-            placeholderTextColor={colors.black}[m
[32m+[m[32m            placeholderTextColor={firstNameError && !firstName ? colors.warning : colors.black}[m
             value={firstName}[m
             onChangeText={(text) => {[m
               setFirstName(text);[m
[36m@@ -111,7 +111,7 @@[m [mexport default function RegisterStep2Screen() {[m
           <TextInput[m
             style={[styles.input, usernameError && styles.inputError]}[m
             placeholder="Nome de usuário"[m
[31m-            placeholderTextColor={colors.black}[m
[32m+[m[32m            placeholderTextColor={usernameError && !username ? colors.warning : colors.black}[m
             value={username}[m
             onChangeText={(text) => {[m
               setUsername(text);[m
[1mdiff --git a/src/features/auth/register/index.tsx b/src/features/auth/register/index.tsx[m
[1mindex f8a850b..864079d 100644[m
[1m--- a/src/features/auth/register/index.tsx[m
[1m+++ b/src/features/auth/register/index.tsx[m
[36m@@ -91,7 +91,7 @@[m [mexport default function RegisterScreen() {[m
           <TextInput[m
             style={[styles.inputEmail, emailError && styles.inputError]}[m
             placeholder="Email"[m
[31m-            placeholderTextColor={colors.black}[m
[32m+[m[32m            placeholderTextColor={emailError && !email ? colors.warning : colors.black}[m
             value={email}[m
             onChangeText={(text) => {[m
               setEmail(text);[m
[36m@@ -174,8 +174,8 @@[m [mexport default function RegisterScreen() {[m
                   hasMinLength[m
                     ? styles.criteriaCircleActive[m
                     : passwordSubmittedError[m
[31m-                    ? styles.criteriaCircleError[m
[31m-                    : null,[m
[32m+[m[32m                      ? styles.criteriaCircleError[m
[32m+[m[32m                      : null,[m
                 ]}[m
               />[m
               <Text[m
[36m@@ -195,8 +195,8 @@[m [mexport default function RegisterScreen() {[m
                   hasNumber[m
                     ? styles.criteriaCircleActive[m
                     : passwordSubmittedError[m
[31m-                    ? styles.criteriaCircleError[m
[31m-                    : null,[m
[32m+[m[32m                      ? styles.criteriaCircleError[m
[32m+[m[32m                      : null,[m
                 ]}[m
               />[m
               <Text[m
[1mdiff --git a/src/navigation/AppNavigator.tsx b/src/navigation/AppNavigator.tsx[m
[1mindex 973d655..b97b0c4 100644[m
[1m--- a/src/navigation/AppNavigator.tsx[m
[1m+++ b/src/navigation/AppNavigator.tsx[m
[36m@@ -18,7 +18,7 @@[m [mexport default function AppNavigator() {[m
     return ([m
         <NavigationContainer>[m
             <Stack.Navigator[m
[31m-                initialRouteName="MainTabs"[m
[32m+[m[32m                initialRouteName="Onboarding"[m
                 screenOptions={{[m
                     headerShown: false,[m
                 }}[m
[1mdiff --git a/src/shared/components/AppIcon/icons.ts b/src/shared/components/AppIcon/icons.ts[m
[1mindex 54dd0e2..a6c3f1f 100644[m
[1m--- a/src/shared/components/AppIcon/icons.ts[m
[1m+++ b/src/shared/components/AppIcon/icons.ts[m
[36m@@ -82,6 +82,7 @@[m [mimport Ruler from '../../../assets/icons/ruler.svg';[m
 import PencilSimple from '../../../assets/icons/pencil-simple.svg';[m
 import ThermometerSimple from '../../../assets/icons/thermometer-simple.svg';[m
 import HouseSimple from '../../../assets/icons/house-simple.svg';[m
[32m+[m[32mimport Warning from '../../../assets/icons/warning.svg';[m
 [m
 import { SvgProps } from 'react-native-svg';[m
 [m
[36m@@ -172,6 +173,7 @@[m [mexport const icons = {[m
     pencilSimple: PencilSimple,[m
     thermometerSimple: ThermometerSimple,[m
     houseSimple: HouseSimple,[m
[32m+[m[32m    warning: Warning,[m
 } satisfies Record<string, SvgIcon>;[m
 [m
 export type IconName = keyof typeof icons;[m
\ No newline at end of file[m
[1mdiff --git a/src/shared/constants/appIcons.ts b/src/shared/constants/appIcons.ts[m
[1mindex 52aba2b..c42e112 100644[m
[1m--- a/src/shared/constants/appIcons.ts[m
[1m+++ b/src/shared/constants/appIcons.ts[m
[36m@@ -65,6 +65,7 @@[m [mexport const AppIcons = {[m
     RULER: 'ruler',[m
     THERMOMETER_SIMPLE: 'thermometerSimple',[m
     HOUSE_SIMPLE: 'houseSimple',[m
[32m+[m[32m    WARNING: 'warning',[m
 } as const;[m
 [m
 export type IconName = typeof AppIcons[keyof typeof AppIcons];[m
