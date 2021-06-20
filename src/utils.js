import randomColor from "randomcolor";

export const getColorByPriority = (value, priorities) => {
    return priorities.find(priority => priority.value === value).color;
}

export const generateRandomColor = (options = {}) => {
    return randomColor({luminosity: 'dark',...options});
}