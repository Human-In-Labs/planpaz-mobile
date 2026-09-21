import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    ImageSourcePropType,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import AppHeader from '../../../shared/components/AppHeader';
import AppIcon from '../../../shared/components/AppIcon';
import { AppIcons } from '../../../shared/constants/appIcons';
import { colors } from '../../../shared/theme';
import { SocialStackParamList } from '../../../navigation/types';
import { criarPost, uploadImagem } from '../../../shared/api';
import { getCurrentAuthorId } from '../../../shared/services/storage';
import HashtagInput from './HashtagInput';
import ChangePhotoOverlay from '../../profile/overlays/ChangePhoto';
import { pickImageFromGallery, takePhotoWithCamera } from '../../../shared/utils/imagePicker';
import { styles } from './styles';

type NavigationProp = NativeStackNavigationProp<SocialStackParamList, 'CreatePost'>;

const DIGITAL_CAMERA = require('../../../assets/images/digital-camera.png');
const DEFAULT_USER_AVATAR = require('../../../assets/images/user-avatar-sample.png');
const SAMPLE_IMAGE = require('../../../assets/images/plant-post-sample.png');

export default function CreatePostScreen() {
    const navigation = useNavigation<NavigationProp>();

    const [title, setTitle] = useState('');
    const [tags, setTags] = useState<string[]>(['Ornamental']);
    const [content, setContent] = useState('');
    const [selectedImage, setSelectedImage] = useState<{ uri: string; base64?: string } | null>(null);
    const [isImagePickerVisible, setIsImagePickerVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSelectGallery = async () => {
        setIsImagePickerVisible(false);
        const image = await pickImageFromGallery();
        if (image) {
            setSelectedImage({ uri: image.uri, base64: image.base64 });
        }
    };

    const handleSelectCamera = async () => {
        setIsImagePickerVisible(false);
        const image = await takePhotoWithCamera();
        if (image) {
            setSelectedImage({ uri: image.uri, base64: image.base64 });
        }
    };

    const handlePublish = async () => {
        if (!title.trim() && !content.trim()) {
            Alert.alert('Campos obrigatórios', 'Por favor, preencha o título ou o texto da publicação.');
            return;
        }

        if (isSubmitting) return;

        try {
            setIsSubmitting(true);
            const authorId = await getCurrentAuthorId();

            const formattedTags = tags.map(tag => (tag.startsWith('#') ? tag : `#${tag}`));
            let mediaUrl: string | null = null;
            if (selectedImage?.uri) {
                try {
                    mediaUrl = await uploadImagem(selectedImage.uri);
                } catch (uploadErr) {
                    console.log('[CREATE POST] Erro ao fazer upload da mídia para o Cloudinary:', uploadErr);
                }
            }

            const res = await criarPost({
                authorId,
                title: title.trim() || undefined,
                content: content.trim() || title.trim(),
                media: mediaUrl,
                tags: formattedTags,
            });

            const msg = (res as any)?.message || 'Publicação realizada com sucesso!';

            Alert.alert(
                'Sucesso',
                msg,
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.goBack(),
                    },
                ]
            );
        } catch (error: any) {
            console.log('[CREATE POST] Erro ao criar post na API:', error);
            const status = error?.response?.status;
            const errorMsg = error?.response?.data?.message || 'Não foi possível registrar sua publicação. Tente novamente.';
            const alertTitle = status === 400 ? 'Conteúdo Não Permitido' : 'Aviso';
            Alert.alert(alertTitle, errorMsg);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <View style={styles.container}>
            <SafeAreaView edges={['top']} style={styles.safeArea}>
                <KeyboardAvoidingView
                    style={styles.keyboardAvoidingView}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 8 : 0}
                >
                    {/* Cabeçalho superior */}
                    <AppHeader
                        title="Adicionar Post"
                        backButton
                        onBackPress={() => navigation.goBack()}
                    />

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={styles.scroll}
                        contentContainerStyle={styles.scrollContent}
                        keyboardShouldPersistTaps="handled"
                    >
                        {/* Container de Adicionar Foto com estilo exatamente igual a AddPlant */}
                        <TouchableOpacity
                            style={[styles.uploadBox, selectedImage ? styles.uploadBoxWithImage : null]}
                            activeOpacity={0.8}
                            onPress={() => setIsImagePickerVisible(true)}
                        >
                            {selectedImage ? (
                                <>
                                    <Image
                                        source={selectedImage}
                                        style={styles.uploadedImage}
                                        resizeMode="cover"
                                    />
                                    <TouchableOpacity
                                        style={styles.removeImageButton}
                                        activeOpacity={0.8}
                                        onPress={(e) => {
                                            e.stopPropagation();
                                            setSelectedImage(null);
                                        }}
                                    >
                                        <AppIcon
                                            icon={AppIcons.X}
                                            size={14}
                                            color={colors.white}
                                        />
                                    </TouchableOpacity>
                                </>
                            ) : (
                                <>
                                    <Image
                                        source={DIGITAL_CAMERA}
                                        style={styles.cameraIllustration}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.addPhotoLink}>Adicionar foto</Text>
                                    <Text style={styles.uploadSubtitle}>
                                        Mostre sua planta para deixar mais especial
                                    </Text>
                                </>
                            )}
                        </TouchableOpacity>

                        {/* Campo Título com estilo AddPlant */}
                        <View style={styles.fieldGroup}>
                            <Text style={styles.label}>Título</Text>
                            <TextInput
                                style={styles.input}
                                value={title}
                                onChangeText={setTitle}
                                placeholder="Quero falar sobre..."
                                placeholderTextColor="#8E8E93"
                            />
                        </View>

                        {/* Campo Dinâmico de Tags com estilo AddPlant */}
                        <HashtagInput
                            tags={tags}
                            onChangeTags={setTags}
                            maxTags={3}
                        />

                        {/* Campo de Texto / Descrição com estilo AddPlant */}
                        <View style={styles.fieldGroup}>
                            <Text style={styles.label}>Texto</Text>
                            <View style={styles.textAreaContainer}>
                                <TextInput
                                    style={styles.textArea}
                                    value={content}
                                    onChangeText={setContent}
                                    placeholder="Escreva sobre sua planta..."
                                    placeholderTextColor="#8E8E93"
                                    multiline
                                    maxLength={500}
                                />
                                <Text style={styles.charCounter}>{content.length}/500</Text>
                            </View>
                        </View>
                    </ScrollView>

                    {/* Botão Publicar fixo no final da página, logo acima da tab bar */}
                    <View style={styles.footer}>
                        <TouchableOpacity
                            style={[styles.submitButton, isSubmitting && { opacity: 0.6 }]}
                            activeOpacity={0.8}
                            onPress={handlePublish}
                            disabled={isSubmitting}
                        >
                            <Text style={styles.submitButtonText}>
                                {isSubmitting ? 'Publicando...' : 'Publicar na Comunidade'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>

            {/* Overlay de foto reutilizado de profile/overlays/ChangePhoto */}
            <ChangePhotoOverlay
                visible={isImagePickerVisible}
                onClose={() => setIsImagePickerVisible(false)}
                onTakePhoto={handleSelectCamera}
                onSelectFromGallery={handleSelectGallery}
            />
        </View>
    );
}
