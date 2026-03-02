import ElectricTower from '../icons/ElectricTower';
import ElectricGenerator from '../icons/ElectricGenerator';


/**
 * @description select the right svg component
 * @param {*} param0 the class to style the component
 * @returns the svg component
 */
const DeviceTypeIconSelector = ( deviceType ) => {

    let Component = null;

    switch (deviceType) {
        case 'UTILITY':
            Component = ElectricTower;
            break;
        case 'GENERATOR':
            Component = ElectricGenerator;
            break;
        case 'SOLAR':
            Component = ElectricGenerator;
            break;
        case 'IPP':
            Component = ElectricGenerator;
            break;
        default:
            Component = ElectricGenerator;
    }
    return Component;
}


export default DeviceTypeIconSelector;
