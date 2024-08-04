export const addPathToImage = (imageName: string, folderName: string): string => {
    const pathToImage = `${process.env.IMAGE_STORAGE_PATH}/${folderName}/${imageName}`
    return pathToImage
}