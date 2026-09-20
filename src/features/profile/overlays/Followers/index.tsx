import React, { useRef, useState } from 'react';
import {
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import AppIcon from '../../../../shared/components/AppIcon';
import Overlay from '../../../../shared/components/Overlay';
import { AppIcons } from '../../../../shared/constants/appIcons';
import { scale, verticalScale } from '../../../../shared/theme/scale';
import { FollowerUser, followersMock } from '../../../../shared/mock/followersMock';
import FollowerActionsPopup from './FollowerActionsPopup';
import { styles } from './styles';

interface FollowersOverlayProps {
    visible: boolean;
    onClose: () => void;
    title?: string;
    users?: FollowerUser[];
    onOptionsPress?: (user: FollowerUser) => void;
}

interface FollowerItemProps {
    item: FollowerUser;
    onToggleOptions: (item: FollowerUser, cardTopInModal: number, cardHeight: number) => void;
    containerNodeRef: React.RefObject<View | null>;
}

function FollowerRow({ item, onToggleOptions, containerNodeRef }: FollowerItemProps) {
    const cardRef = useRef<View>(null);

    function handlePress() {
        const containerNode = containerNodeRef.current;
        if (!containerNode || !cardRef.current) return;

        (cardRef.current as any).measureLayout(
            containerNode,
            (_left: number, top: number, _width: number, height: number) => {
                onToggleOptions(item, top, height);
            },
            () => {
                // Fallback: medição simultânea de ambos no window
                containerNode.measureInWindow((_cx, containerWindowY) => {
                    cardRef.current?.measureInWindow((_x, cardWindowY, _w, height) => {
                        const top = cardWindowY - containerWindowY;
                        onToggleOptions(item, top, height);
                    });
                });
            }
        );
    }

    return (
        <View ref={cardRef} style={styles.card} collapsable={false}>
            <Image
                source={item.avatar}
                style={styles.avatar}
            />

            <Text style={styles.username} numberOfLines={1}>
                {item.username}
            </Text>

            <TouchableOpacity
                style={styles.kebabButton}
                activeOpacity={0.6}
                onPress={handlePress}
            >
                <AppIcon
                    icon={AppIcons.DOTS_THREE_VERTICAL}
                    size={18}
                    color="#115634"
                />
            </TouchableOpacity>
        </View>
    );
}

export default function FollowersOverlay({
    visible,
    onClose,
    title = 'Meus seguidores',
    users = [],
    onOptionsPress,
}: FollowersOverlayProps) {
    const containerRef = useRef<View>(null);

    const [activeUser, setActiveUser] = useState<FollowerUser | null>(null);
    const [popupTop, setPopupTop] = useState<number>(145);

    function handleCloseSubpopup() {
        setActiveUser(null);
    }

    function handleToggleOptions(item: FollowerUser, cardTopInModal: number, cardHeight: number) {
        if (activeUser?.id === item.id) {
            setActiveUser(null);
            return;
        }

        const popupHeight = verticalScale(94);
        const modalHeight = verticalScale(613);
        const cardBottomInModal = cardTopInModal + cardHeight;

        // Se o popup couber abaixo do box (com espaçamento de 4pt), posiciona abaixo.
        // Caso ultrapasse a área do modal, posiciona 4pt acima do box correspondente.
        let calculatedTop: number;
        if (cardBottomInModal + 4 + popupHeight <= modalHeight - verticalScale(16)) {
            calculatedTop = cardBottomInModal + 4;
        } else {
            calculatedTop = Math.max(verticalScale(48), cardTopInModal - popupHeight - 4);
        }

        setPopupTop(calculatedTop);
        setActiveUser(item);
        onOptionsPress?.(item);
    }

    return (
        <Overlay
            visible={visible}
            onClose={() => {
                handleCloseSubpopup();
                onClose();
            }}
            containerStyle={styles.container}
        >
            <View
                ref={containerRef}
                style={styles.innerContent}
                collapsable={false}
            >
                {/* Header fixo do popup com esmaecimento suave */}
                <View style={styles.header}>
                    <Text style={styles.title}>
                        {title}
                    </Text>

                    {/* Fade / Máscara suave idêntica à Home */}
                    <View style={styles.fadeBottom} pointerEvents="none">
                        <Svg width="100%" height="100%">
                            <Defs>
                                <LinearGradient id="followersFade" x1="0" y1="0" x2="0" y2="1">
                                    <Stop offset="0" stopColor="#FAFFFA" stopOpacity="1" />
                                    <Stop offset="1" stopColor="#FAFFFA" stopOpacity="0" />
                                </LinearGradient>
                            </Defs>
                            <Rect x="0" y="0" width="100%" height="100%" fill="url(#followersFade)" />
                        </Svg>
                    </View>
                </View>

                {/* Lista rolável de seguidores que passa por baixo do header */}
                <FlatList
                    data={users}
                    keyExtractor={(item, index) => `${item.id}-${index}`}
                    showsVerticalScrollIndicator={false}
                    style={styles.list}
                    contentContainerStyle={styles.listContent}
                    onScrollBeginDrag={handleCloseSubpopup}
                    ListEmptyComponent={
                        <View style={{ paddingVertical: 40, alignItems: 'center' }}>
                            <Text style={{ color: '#666666', fontSize: 14 }}>
                                Nenhum usuário encontrado.
                            </Text>
                        </View>
                    }
                    renderItem={({ item }) => (
                        <FollowerRow
                            item={item}
                            onToggleOptions={handleToggleOptions}
                            containerNodeRef={containerRef}
                        />
                    )}
                />

                {/* Subpopup contextual renderizado no topo do modal */}
                {activeUser && (
                    <>
                        <TouchableWithoutFeedback onPress={handleCloseSubpopup}>
                            <View style={styles.subpopupBackdrop} />
                        </TouchableWithoutFeedback>

                        <FollowerActionsPopup
                            style={{
                                top: popupTop,
                                right: scale(21),
                            }}
                            onViewProfile={handleCloseSubpopup}
                            onRemove={handleCloseSubpopup}
                            onReport={handleCloseSubpopup}
                        />
                    </>
                )}
            </View>
        </Overlay>
    );
}
