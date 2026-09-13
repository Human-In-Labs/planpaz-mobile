import ArrowLineUpRight from '../../../assets/icons/arrow-line-up-right.svg';
import ArrowLineUpRightFill from '../../../assets/icons/arrow-line-up-right-fill.svg';

import ArrowUpRight from '../../../assets/icons/arrow-up-right.svg';
import ArrowUpRightFill from '../../../assets/icons/arrow-up-right-fill.svg';

import BellSimple from '../../../assets/icons/bell-simple.svg';
import BellSimpleFill from '../../../assets/icons/bell-simple-fill.svg';

import CaretDown from '../../../assets/icons/caret-down.svg';
import CaretDownFill from '../../../assets/icons/caret-down-fill.svg';

import CaretLeft from '../../../assets/icons/caret-left.svg';
import CaretLeftFill from '../../../assets/icons/caret-left-fill.svg';

import CaretRight from '../../../assets/icons/caret-right.svg';
import CaretRightFill from '../../../assets/icons/caret-right-fill.svg';

import CaretUp from '../../../assets/icons/caret-up.svg';
import CaretUpFill from '../../../assets/icons/caret-up-fill.svg';

import DropSimple from '../../../assets/icons/drop-simple.svg';
import DropSimpleFill from '../../../assets/icons/drop-simple-fill.svg';

import Funnel from '../../../assets/icons/funnel.svg';
import FunnelSimple from '../../../assets/icons/funnel-simple.svg';

import House from '../../../assets/icons/house.svg';
import HouseFill from '../../../assets/icons/house-fill.svg';

import Leaf from '../../../assets/icons/leaf.svg';
import LeafFill from '../../../assets/icons/leaf-fill.svg';

import MagnifyingGlass from '../../../assets/icons/magnifying-glass.svg';
import MagnifyingGlassFill from '../../../assets/icons/magnifying-glass-fill.svg';

import MapPin from '../../../assets/icons/map-pin.svg';
import MapPinFill from '../../../assets/icons/map-pin-fill.svg';

import Plant from '../../../assets/icons/plant.svg';
import PlantFill from '../../../assets/icons/plant-fill.svg';

import PottedPlant from '../../../assets/icons/potted-plant.svg';
import PottedPlantFill from '../../../assets/icons/potted-plant-fill.svg';

import SunDim from '../../../assets/icons/sun-dim.svg';
import SunDimFill from '../../../assets/icons/sun-dim-fill.svg';

import User from '../../../assets/icons/user.svg';
import UserFill from '../../../assets/icons/user-fill.svg';

import Users from '../../../assets/icons/users.svg';
import UsersFill from '../../../assets/icons/users-fill.svg';

import UsersThree from '../../../assets/icons/users-three.svg';
import UsersThreeFill from '../../../assets/icons/users-three-fill.svg';

import Wind from '../../../assets/icons/wind.svg';
import WindFill from '../../../assets/icons/wind-fill.svg';

import NotePencil from '../../../assets/icons/note-pencil.svg';
import NotePencilFill from '../../../assets/icons/note-pencil-fill.svg';

import X from '../../../assets/icons/x.svg';

import Plus from '../../../assets/icons/plus.svg';

import Eye from '../../../assets/icons/eye.svg';
import EyeSlash from '../../../assets/icons/eye-slash.svg';

import { SvgProps } from 'react-native-svg';

type SvgIcon = React.FC<SvgProps>;

export const icons = {
    arrowLineUpRight: ArrowLineUpRight,
    arrowLineUpRightFill: ArrowLineUpRightFill,

    arrowUpRight: ArrowUpRight,
    arrowUpRightFill: ArrowUpRightFill,

    bellSimple: BellSimple,
    bellSimpleFill: BellSimpleFill,

    caretDown: CaretDown,
    caretDownFill: CaretDownFill,

    caretLeft: CaretLeft,
    caretLeftFill: CaretLeftFill,

    caretRight: CaretRight,
    caretRightFill: CaretRightFill,

    caretUp: CaretUp,
    caretUpFill: CaretUpFill,

    dropSimple: DropSimple,
    dropSimpleFill: DropSimpleFill,

    funnel: Funnel,
    funnelSimple: FunnelSimple,

    house: House,
    houseFill: HouseFill,

    leaf: Leaf,
    leafFill: LeafFill,

    magnifyingGlass: MagnifyingGlass,
    magnifyingGlassFill: MagnifyingGlassFill,

    mapPin: MapPin,
    mapPinFill: MapPinFill,

    plant: Plant,
    plantFill: PlantFill,

    pottedPlant: PottedPlant,
    pottedPlantFill: PottedPlantFill,

    sunDim: SunDim,
    sunDimFill: SunDimFill,

    user: User,
    userFill: UserFill,

    users: Users,
    usersFill: UsersFill,

    usersThree: UsersThree,
    usersThreeFill: UsersThreeFill,

    wind: Wind,
    windFill: WindFill,

    notePencil: NotePencil,
    notePencilFill: NotePencilFill,

    x: X,

    plus: Plus,

    eye: Eye,
    eyeSlash: EyeSlash,
} satisfies Record<string, SvgIcon>;

export type IconName = keyof typeof icons;