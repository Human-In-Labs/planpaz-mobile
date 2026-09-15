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
import { mockPosts } from '../../../shared/mock/socialMock';
import HashtagInput from './HashtagInput';
import ChangePhotoOverlay from '../../profile/overlays/ChangePhoto';
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
    const [selectedImage, setSelectedImage] = useState<ImageSourcePropType | null>(null);
    const [isImagePickerVisible, setIsImagePickerVisible] = useState(false);

    const handlePublish = () => {
        if (!title.trim() && !content.trim()) {
            Alert.alert('Campos obrigatórios', 'Por favor, preencha o título ou o texto da publicação.');
            return;
        }

        // Criar o novo post e adicionar no início da lista de publicações da comunidade
        const newPost = {
            id: String(Date.now()),
            author: {
                id: 'u-current',
                name: 'Nathan',
                username: '@nathan12',
                avatar: DEFAULT_USER_AVATAR,
            },
            title: title.trim() || undefined,
            description: content.trim() || undefined,
            content: title.trim() || content.trim(),
            image: selectedImage || undefined,
            likesCount: '0',
            commentsCount: '0',
            sharesCount: '0',
            tags: tags.map((tag, idx) => ({
                id: `tag-${Date.now()}-${idx}`,
                label: tag,
                icon: AppIcons.HASH,
            })),
            createdAt: 'Agora',
        };

        mockPosts.unshift(newPost);
        Alert.alert(
            'Publicado com sucesso!',
            'Sua publicação já está disponível para toda a comunidade.',
            [
                {
                    text: 'OK',
                    onPress: () => navigation.goBack(),
                },
            ]
        );
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
                            style={styles.uploadBox}
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
                            style={styles.submitButton}
                            activeOpacity={0.8}
                            onPress={handlePublish}
                        >
                            <Text style={styles.submitButtonText}>Publicar na Comunidade</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>

            {/* Overlay de foto reutilizado de profile/overlays/ChangePhoto */}
            <ChangePhotoOverlay
                visible={isImagePickerVisible}
                onClose={() => setIsImagePickerVisible(false)}
                onTakePhoto={() => {
                    setSelectedImage(SAMPLE_IMAGE);
                }}
                onSelectFromGallery={() => {
                    setSelectedImage(SAMPLE_IMAGE);
                }}
            />
        </View>
    );
}
