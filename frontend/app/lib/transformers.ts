// Shared transformation functions for Django API snake_case to camelCase

export function transformCmsItem(item: any) {
    if (!item) return null;
    return {
        ...item,
        imageUrl: item.image_url,
        videoUrl: item.video_url,
        thumbnailUrl: item.thumbnail_url,
        metaTitle: item.meta_title,
        metaDesc: item.meta_desc,
        createdAt: item.created_at,
        updatedAt: item.updated_at
    };
}

export function snakeToCamel(str: string): string {
    return str.replace(/([-_][a-z])/g, (group) =>
        group.toUpperCase().replace('-', '').replace('_', '')
    );
}

export function camelToSnake(str: string): string {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

export function transformKeys(obj: any, transformer: (key: string) => string): any {
    if (Array.isArray(obj)) {
        return obj.map(item => transformKeys(item, transformer));
    }

    if (obj !== null && typeof obj === 'object') {
        return Object.keys(obj).reduce((acc, key) => {
            const newKey = transformer(key);
            acc[newKey] = transformKeys(obj[key], transformer);
            return acc;
        }, {} as any);
    }

    return obj;
}
