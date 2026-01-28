import { v2 as cloudinary } from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';

// Configure Cloudinary at runtime (not during build)
const configureCloudinary = () => {
    if (!cloudinary.config().cloud_name) {
        cloudinary.config({
            cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
    }
};

export async function POST(request: NextRequest) {
    try {
        // Configure Cloudinary on first request
        configureCloudinary();

        // Check if credentials are configured
        if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
            console.error('Cloudinary credentials not configured');
            return NextResponse.json(
                { error: 'Image upload service not configured. Please add Cloudinary environment variables.' },
                { status: 500 }
            );
        }

        const { image, folder = 'dinterio' } = await request.json();

        if (!image) {
            return NextResponse.json({ error: 'No image provided' }, { status: 400 });
        }

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(image, {
            folder: folder,
            resource_type: 'image',
            transformation: [
                { width: 1200, crop: 'limit' },
                { quality: 'auto:good' },
                { fetch_format: 'auto' },
            ],
        });

        return NextResponse.json({
            success: true,
            url: result.secure_url,
            public_id: result.public_id,
        });
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        return NextResponse.json(
            { error: 'Failed to upload image. Please try again.' },
            { status: 500 }
        );
    }
}
