export const addPathToImage = (imageName: string, folderName: string): string => {
    const supabaseUrl = process.env.SUPABASE_URL;
    const imageStorage = process.env.IMAGE_STORAGE;
    const pathToImage = `${supabaseUrl}/storage/v1/object/public/${imageStorage}/${folderName}/${imageName}`
    return pathToImage
}