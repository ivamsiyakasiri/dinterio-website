// Cloudinary unsigned upload utility
// This uploads directly from browser - no server-side secrets needed

const CLOUDINARY_CLOUD_NAME = 'dkmodcfgh';
const CLOUDINARY_UPLOAD_PRESET = 'dinterio_unsigned'; // Create this in Cloudinary dashboard

export interface CloudinaryUploadResult {
    success: boolean;
    url?: string;
    error?: string;
}

export async function uploadToCloudinary(
    base64Image: string,
    folder: string = 'dinterio'
): Promise<CloudinaryUploadResult> {
    try {
        const formData = new FormData();
        formData.append('file', base64Image);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        formData.append('folder', folder);

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
                method: 'POST',
                body: formData,
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Cloudinary error:', errorData);
            return {
                success: false,
                error: errorData.error?.message || 'Upload failed'
            };
        }

        const data = await response.json();
        return {
            success: true,
            url: data.secure_url,
        };
    } catch (error) {
        console.error('Upload error:', error);
        return {
            success: false,
            error: 'Network error. Please try again.'
        };
    }
}
