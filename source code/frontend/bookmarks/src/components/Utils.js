
export const constructImageSource = (image) => { 
    return `data:${image.type};base64,${image.data}`;
}
